import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';
import { getFeeStructures, createFeeStructure, getFeeCategories } from '../services/financeService';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { type FeeCategory } from '../types/finance.types';

const itemSchema = z.object({
    categoryId: z.string().min(1, 'Category is required'), // Form uses string for select
    amount: z.number().min(0, 'Amount must be positive')
});

const structureSchema = z.object({
    name: z.string().min(3, 'Name is required'),
    academicYear: z.string().min(4, 'Academic Year is required'),
    frequency: z.enum(['MONTHLY', 'QUARTERLY', 'ANNUALLY', 'ONE_TIME']),
    lateFeeAmount: z.number().optional(),
    gracePeriodDays: z.number().optional(),
    items: z.array(itemSchema).min(1, 'At least one fee item is required')
});

type StructureFormData = z.infer<typeof structureSchema>;

export const FeeStructureList: React.FC = () => {
    const { id: schoolId } = useParams<{ id: string }>();
    const queryClient = useQueryClient();

    const { data: structures, isLoading: isStructuresLoading } = useQuery({
        queryKey: ['feeStructures', schoolId],
        queryFn: () => getFeeStructures(schoolId!)
    });

    const { data: categories, isLoading: isCategoriesLoading } = useQuery({
        queryKey: ['feeCategories', schoolId],
        queryFn: () => getFeeCategories(schoolId!)
    });

    const createMutation = useMutation({
        mutationFn: (data: StructureFormData) => {
            // Transform form data to match API expectation (string IDs to numbers)
            const apiData = {
                ...data,
                items: data.items.map(item => ({
                    categoryId: parseInt(item.categoryId),
                    amount: item.amount
                }))
            };
            return createFeeStructure(schoolId!, apiData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feeStructures', schoolId] });
            reset({
                items: [{ categoryId: '', amount: 0 }],
                frequency: 'MONTHLY'
            });
        }
    });

    const { register, control, handleSubmit, reset, formState: { errors } } = useForm<StructureFormData>({
        resolver: zodResolver(structureSchema),
        defaultValues: {
            items: [{ categoryId: '', amount: 0 }],
            frequency: 'MONTHLY'
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    });

    if (isStructuresLoading || isCategoriesLoading) return <Loader2 className="w-6 h-6 animate-spin mx-auto" />;

    return (
        <div className="space-y-8">
            <form onSubmit={handleSubmit((data) => createMutation.mutate(data))} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Create Fee Structure</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input
                        label="Structure Name"
                        placeholder="e.g. Class 1 - 2024-25"
                        {...register('name')}
                        error={errors.name?.message}
                    />
                    <Input
                        label="Academic Year"
                        placeholder="2024-2025"
                        {...register('academicYear')}
                        error={errors.academicYear?.message}
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                        <select
                            {...register('frequency')}
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="MONTHLY">Monthly</option>
                            <option value="QUARTERLY">Quarterly</option>
                            <option value="ANNUALLY">Annually</option>
                            <option value="ONE_TIME">One Time</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-3 mb-4">
                    <label className="block text-sm font-medium text-gray-700">Fee Items</label>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-4 items-start">
                            <div className="flex-1">
                                <select
                                    {...register(`items.${index}.categoryId` as const)}
                                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Category</option>
                                    {categories?.map((cat: FeeCategory) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                {errors.items?.[index]?.categoryId && (
                                    <p className="text-xs text-red-500 mt-1">{errors.items[index]?.categoryId?.message}</p>
                                )}
                            </div>
                            <div className="w-32">
                                <Input
                                    type="number"
                                    placeholder="Amount"
                                    {...register(`items.${index}.amount` as const, { valueAsNumber: true })}
                                    error={errors.items?.[index]?.amount?.message}
                                />
                            </div>
                            <Button type="button" variant="ghost" className="text-red-500 p-2" onClick={() => remove(index)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => append({ categoryId: '', amount: 0 })}>
                        <Plus className="w-4 h-4 mr-2" /> Add Item
                    </Button>
                </div>

                <Button type="submit" isLoading={createMutation.isPending}>
                    Create Structure
                </Button>
            </form>

            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Existing Structures</h3>
                <div className="grid gap-4">
                    {structures?.map((structure) => (
                        <div key={structure.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="text-base font-semibold text-gray-900">{structure.name}</h4>
                                    <p className="text-sm text-gray-500">{structure.academicYear} • {structure.frequency}</p>
                                </div>
                                <span className="text-lg font-bold text-gray-900">
                                    ₹{(structure.items || []).reduce((sum, item) => sum + (item.amount || 0), 0).toLocaleString()}
                                </span>
                            </div>
                            <div className="border-t border-gray-100 pt-2 mt-2">
                                <ul className="text-sm text-gray-600 space-y-1">
                                    {(structure.items || []).map((item, idx) => (
                                        <li key={idx} className="flex justify-between">
                                            <span>{item.categoryName || 'Category ' + item.categoryId}</span>
                                            <span>₹{(item.amount || 0).toLocaleString()}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                    {structures?.length === 0 && <p className="text-gray-500 text-sm">No fee structures found.</p>}
                </div>
            </div>
        </div>
    );
};

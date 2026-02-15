import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';
import { getFeeCategories, createFeeCategory } from '../services/financeService';
import { Plus, Loader2, Trash2 } from 'lucide-react';
import type { FeeCategory } from '../types/finance.types';

const categorySchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    description: z.string().optional(),
    isMandatory: z.boolean()
});

type CategoryFormData = z.infer<typeof categorySchema>;

export const FeeCategoryList: React.FC = () => {
    const { id: schoolId } = useParams<{ id: string }>();
    const queryClient = useQueryClient();

    const { data: categories, isLoading } = useQuery({
        queryKey: ['feeCategories', schoolId],
        queryFn: () => getFeeCategories(schoolId!)
    });

    const createMutation = useMutation({
        mutationFn: (data: CategoryFormData) => createFeeCategory(schoolId!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feeCategories', schoolId] });
            reset();
        }
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            isMandatory: true
        }
    });

    if (isLoading) return <Loader2 className="w-6 h-6 animate-spin mx-auto" />;

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit((data) => createMutation.mutate(data))} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Add New Category</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        placeholder="Category Name (e.g. Tuition Fee)"
                        {...register('name')}
                        error={errors.name?.message}
                    />
                    <Input
                        placeholder="Description (Optional)"
                        {...register('description')}
                        error={errors.description?.message}
                    />
                    <div className="flex items-center gap-2">
                        <label className="flex items-center space-x-2 text-sm text-gray-700">
                            <input type="checkbox" {...register('isMandatory')} className="rounded border-gray-300" />
                            <span>Mandatory</span>
                        </label>
                        <Button type="submit" isLoading={createMutation.isPending} size="sm">
                            <Plus className="w-4 h-4 mr-2" /> Add
                        </Button>
                    </div>
                </div>
            </form>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {categories?.map((category: FeeCategory) => (
                            <tr key={category.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.description || '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${category.isMandatory ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {category.isMandatory ? 'Mandatory' : 'Optional'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-red-600 hover:text-red-900">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {categories?.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                                    No fee categories found. Add one above.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

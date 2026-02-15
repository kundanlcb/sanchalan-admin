import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../../../components/common/Button';
import { Input } from '../../../../components/common/Input';
import { getAcademicYears, createAcademicYear } from '../../services/academicService';
import { Loader2, Plus } from 'lucide-react';

const yearSchema = z.object({
    name: z.string().min(4, 'Name must be at least 4 characters'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    active: z.boolean()
});

type YearFormData = z.infer<typeof yearSchema>;

export const AcademicYearList: React.FC<{ schoolId: string }> = ({ schoolId }) => {
    const queryClient = useQueryClient();
    const [isCreating, setIsCreating] = useState(false);

    const { data: years, isLoading } = useQuery({
        queryKey: ['academic-years', schoolId],
        queryFn: () => getAcademicYears(schoolId)
    });

    const createMutation = useMutation({
        mutationFn: (data: YearFormData) => createAcademicYear(schoolId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['academic-years', schoolId] });
            setIsCreating(false);
            reset();
        }
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm<YearFormData>({
        resolver: zodResolver(yearSchema),
        defaultValues: {
            active: false,
            name: '',
            startDate: '',
            endDate: ''
        }
    });

    if (isLoading) return <Loader2 className="w-6 h-6 animate-spin mx-auto" />;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Academic Years</h3>
                <Button size="sm" onClick={() => setIsCreating(!isCreating)} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Year
                </Button>
            </div>

            {isCreating && (
                <form onSubmit={handleSubmit((data) => createMutation.mutate(data))} className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <Input label="Name (e.g. 2024-25)" {...register('name')} error={errors.name?.message} />
                        <Input type="date" label="Start Date" {...register('startDate')} error={errors.startDate?.message} />
                        <Input type="date" label="End Date" {...register('endDate')} error={errors.endDate?.message} />
                        <div className="flex items-center pt-8">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" {...register('active')} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span className="text-sm text-gray-700">Set as Active</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
                        <Button type="submit" isLoading={createMutation.isPending}>Save</Button>
                    </div>
                </form>
            )}

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {years?.map((year) => (
                            <tr key={year.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{year.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{year.startDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{year.endDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {year.active ? (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    ) : (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                            Inactive
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {years?.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                                    No academic years found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../../../components/common/Button';
import { Input } from '../../../../components/common/Input';
import { getSubjects, createSubject } from '../../services/academicService';
import { Loader2, Plus } from 'lucide-react';

const subjectSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    code: z.string().min(2, 'Code is required')
});

type SubjectFormData = z.infer<typeof subjectSchema>;

export const SubjectList: React.FC<{ schoolId: string }> = ({ schoolId }) => {
    const queryClient = useQueryClient();
    const [isCreating, setIsCreating] = useState(false);

    const { data: subjects, isLoading } = useQuery({
        queryKey: ['subjects', schoolId],
        queryFn: () => getSubjects(schoolId)
    });

    const createMutation = useMutation({
        mutationFn: (data: SubjectFormData) => createSubject(schoolId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subjects', schoolId] });
            setIsCreating(false);
            reset();
        }
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm<SubjectFormData>({
        resolver: zodResolver(subjectSchema)
    });

    if (isLoading) return <Loader2 className="w-6 h-6 animate-spin mx-auto" />;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Subjects</h3>
                <Button size="sm" onClick={() => setIsCreating(!isCreating)} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Subject
                </Button>
            </div>

            {isCreating && (
                <form onSubmit={handleSubmit((data) => createMutation.mutate(data))} className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <Input label="Subject Name" placeholder="e.g. Mathematics" {...register('name')} error={errors.name?.message} />
                        <Input label="Subject Code" placeholder="e.g. MATH01" {...register('code')} error={errors.code?.message} />
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {subjects?.map((subject) => (
                            <tr key={subject.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 uppercase">{subject.code}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subject.name}</td>
                            </tr>
                        ))}
                        {subjects?.length === 0 && (
                            <tr>
                                <td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500">
                                    No subjects found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

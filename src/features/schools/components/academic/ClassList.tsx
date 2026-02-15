import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../../../components/common/Button';
import { Input } from '../../../../components/common/Input';
import { getClasses, createClass, getSections, createSection } from '../../services/academicService';
import { Loader2, Plus, ChevronDown, ChevronRight } from 'lucide-react';

const classSchema = z.object({
    name: z.string().min(1, 'Name is required')
});

const sectionSchema = z.object({
    name: z.string().min(1, 'Name is required')
});

type ClassFormData = z.infer<typeof classSchema>;
type SectionFormData = z.infer<typeof sectionSchema>;

const ClassRow: React.FC<{ schoolId: string, schoolClass: any }> = ({ schoolId, schoolClass }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAddingSection, setIsAddingSection] = useState(false);
    const queryClient = useQueryClient();

    const { data: sections, isLoading } = useQuery({
        queryKey: ['sections', schoolClass.id],
        queryFn: () => getSections(schoolId, schoolClass.id),
        enabled: isExpanded
    });

    const createSectionMutation = useMutation({
        mutationFn: (data: SectionFormData) => createSection(schoolId, schoolClass.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sections', schoolClass.id] });
            setIsAddingSection(false);
            sectionReset();
        }
    });

    const { register: sectionRegister, handleSubmit: sectionHandleSubmit, reset: sectionReset, formState: { errors: sectionErrors } } = useForm<SectionFormData>({
        resolver: zodResolver(sectionSchema)
    });

    return (
        <>
            <tr className="bg-white hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center text-sm font-medium text-gray-900 hover:text-blue-600 focus:outline-none"
                    >
                        {isExpanded ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />}
                        {schoolClass.name}
                    </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {/* Placeholder for number of sections if available in parent object, else logic needed */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                        size="sm" variant="ghost"
                        onClick={() => { setIsExpanded(true); setIsAddingSection(true); }}
                        className="text-blue-600 hover:text-blue-900"
                    >
                        Add Section
                    </Button>
                </td>
            </tr>
            {isExpanded && (
                <tr className="bg-gray-50">
                    <td colSpan={3} className="px-6 py-4">
                        <div className="ml-6 space-y-3">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sections</h4>

                            {isLoading ? (
                                <div className="text-sm text-gray-500">Loading sections...</div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {sections?.map(section => (
                                        <span key={section.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                            {section.name}
                                        </span>
                                    ))}
                                    {sections?.length === 0 && !isAddingSection && (
                                        <span className="text-sm text-gray-400 italic">No sections created yet.</span>
                                    )}
                                </div>
                            )}

                            {isAddingSection && (
                                <form onSubmit={sectionHandleSubmit((data) => createSectionMutation.mutate(data))} className="mt-2 flex items-start gap-2 max-w-sm">
                                    <Input
                                        placeholder="Section Name (e.g. A)"
                                        {...sectionRegister('name')}
                                        error={sectionErrors.name?.message}
                                        className="h-8 text-sm"
                                    />
                                    <Button type="submit" size="sm" isLoading={createSectionMutation.isPending}>Save</Button>
                                    <Button type="button" size="sm" variant="ghost" onClick={() => setIsAddingSection(false)}>Cancel</Button>
                                </form>
                            )}
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

export const ClassList: React.FC<{ schoolId: string }> = ({ schoolId }) => {
    const queryClient = useQueryClient();
    const [isCreating, setIsCreating] = useState(false);

    const { data: classes, isLoading } = useQuery({
        queryKey: ['classes', schoolId],
        queryFn: () => getClasses(schoolId)
    });

    const createMutation = useMutation({
        mutationFn: (data: ClassFormData) => createClass(schoolId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['classes', schoolId] });
            setIsCreating(false);
            reset();
        }
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ClassFormData>({
        resolver: zodResolver(classSchema)
    });

    if (isLoading) return <Loader2 className="w-6 h-6 animate-spin mx-auto" />;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Classes & Sections</h3>
                <Button size="sm" onClick={() => setIsCreating(!isCreating)} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Class
                </Button>
            </div>

            {isCreating && (
                <form onSubmit={handleSubmit((data) => createMutation.mutate(data))} className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4 flex items-start gap-4">
                    <Input
                        placeholder="Class Name (e.g. Class 1)"
                        {...register('name')}
                        error={errors.name?.message}
                        containerClassName="flex-1"
                    />
                    <div className="flex gap-2 mt-0.5">
                        <Button type="submit" isLoading={createMutation.isPending}>Save</Button>
                        <Button type="button" variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
                    </div>
                </form>
            )}

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sections</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {classes?.map((cls) => (
                            <ClassRow key={cls.id} schoolId={schoolId} schoolClass={cls} />
                        ))}
                        {classes?.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                                    No classes found. Add one to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

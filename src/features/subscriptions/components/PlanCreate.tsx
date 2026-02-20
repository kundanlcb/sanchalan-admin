import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPlan } from '../services/subscriptionService';
import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';
import { Card } from '../../../components/common/Card';
import { X } from 'lucide-react';

const planSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    price: z.number().min(0, 'Price must be 0 or greater'),
    durationMonths: z.number().min(1, 'Duration must be at least 1 month'),
    maxStudents: z.number().optional().nullable(),
    features: z.array(z.string()).optional(),
});

const AVAILABLE_FEATURES = [
    'Student Management',
    'Teacher Management',
    'Attendance Tracking',
    'Timetable Generation',
    'Exam Management',
    'Finance & Payroll',
    'Library Management',
    'Transport Management',
    'Hostel Management',
    'Communication (SMS/Email)',
    'Mobile App Access',
    'Analytics Dashboard',
    'Priority Support'
];

type PlanFormValues = z.infer<typeof planSchema>;

interface PlanCreateProps {
    onSuccess?: () => void;
    onClose?: () => void;
}

export const PlanCreate: React.FC<PlanCreateProps> = ({ onSuccess, onClose }) => {
    const queryClient = useQueryClient();

    const { register, control, handleSubmit, formState: { errors } } = useForm<PlanFormValues>({
        resolver: zodResolver(planSchema),
        defaultValues: {
            durationMonths: 12,
            price: 0,
            features: [],
        }
    });

    const mutation = useMutation({
        mutationFn: createPlan,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscription-plans'] });
            onSuccess?.();
        },
    });

    const onSubmit = (data: PlanFormValues) => {
        const payload = {
            ...data,
            features: data.features && data.features.length > 0 ? data.features.join(',') : undefined,
        };
        mutation.mutate(payload as any);
    };

    return (
        <Card className="max-w-2xl mx-auto border-none shadow-none">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Create New Plan</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                <div className="space-y-4">
                    <Input
                        label="Plan Name"
                        placeholder="e.g. Standard Annual"
                        {...register('name')}
                        error={errors.name?.message}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Price (₹)"
                            type="number"
                            {...register('price', { valueAsNumber: true })}
                            error={errors.price?.message}
                        />
                        <Input
                            label="Duration (Months)"
                            type="number"
                            {...register('durationMonths', { valueAsNumber: true })}
                            error={errors.durationMonths?.message}
                        />
                    </div>

                    <Input
                        label="Max Students (leave empty for unlimited)"
                        type="number"
                        {...register('maxStudents', { valueAsNumber: true })}
                        error={errors.maxStudents?.message}
                    />

                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700">Features included in plan</label>
                        <Controller
                            name="features"
                            control={control}
                            render={({ field }) => (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto p-4 border border-gray-200 rounded-lg bg-gray-50">
                                    {AVAILABLE_FEATURES.map((feature) => (
                                        <label key={feature} className="flex items-center space-x-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                                checked={(field.value || []).includes(feature)}
                                                onChange={(e) => {
                                                    const current = field.value || [];
                                                    if (e.target.checked) {
                                                        field.onChange([...current, feature]);
                                                    } else {
                                                        field.onChange(current.filter((f: string) => f !== feature));
                                                    }
                                                }}
                                            />
                                            <span className="text-sm text-gray-700 group-hover:text-gray-900">{feature}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={mutation.isPending}>
                        Create Plan
                    </Button>
                </div>
            </form>
        </Card>
    );
};

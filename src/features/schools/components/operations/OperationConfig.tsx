import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOperationConfig, updateOperationConfig } from '../../services/operationService';
import { Settings } from 'lucide-react';
import { Switch } from '../../../../components/common/Switch';
import type { SchoolOperationConfig } from '../../../../api/models/school-operation-config';

interface OperationConfigProps {
    schoolId: string;
}

export const OperationConfig: React.FC<OperationConfigProps> = ({ schoolId }) => {
    const queryClient = useQueryClient();

    const { data: config, isLoading } = useQuery({
        queryKey: ['operation-config', schoolId],
        queryFn: () => getOperationConfig(schoolId),
    });

    const mutation = useMutation({
        mutationFn: (newConfig: SchoolOperationConfig) => updateOperationConfig(schoolId, newConfig),
        // Optimistic Update Implementation
        onMutate: async (newConfig) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['operation-config', schoolId] });

            // Snapshot the previous value
            const previousConfig = queryClient.getQueryData(['operation-config', schoolId]);

            // Optimistically update to the new value
            queryClient.setQueryData(['operation-config', schoolId], newConfig);

            // Return a context object with the snapshotted value
            return { previousConfig };
        },
        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (_err, _newConfig, context) => {
            if (context?.previousConfig) {
                queryClient.setQueryData(['operation-config', schoolId], context.previousConfig);
            }
        },
        // Always refetch after error or success to guarantee we are in sync with the server
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['operation-config', schoolId] });
        },
    });

    if (isLoading) {
        return <div className="animate-pulse h-48 bg-gray-50 rounded-lg"></div>;
    }

    const toggles = [
        { key: 'attendanceEnabled', label: 'Attendance System', description: 'Enable daily attendance tracking for students and staff' },
        { key: 'noticesEnabled', label: 'Notice Board', description: 'Allow broadcasting announcements and digital notices' },
        { key: 'routineEnabled', label: 'Class Routine', description: 'Manage and display class schedules and teacher assignments' },
        { key: 'saturdayIsWorking', label: 'Saturday as Working Day', description: 'Configure if Saturdays are considered regular working days' },
    ];

    const handleToggle = (key: string, currentVal: boolean) => {
        if (!config) return;
        const newConfig = { ...config, [key]: !currentVal };
        mutation.mutate(newConfig);
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-500" />
                Feature Toggles
            </h3>

            <div className="space-y-6">
                {toggles.map((toggle) => {
                    const isEnabled = !!config?.[toggle.key as keyof SchoolOperationConfig];
                    return (
                        <Switch
                            key={toggle.key}
                            label={toggle.label}
                            description={toggle.description}
                            checked={isEnabled}
                            onChange={() => handleToggle(toggle.key, isEnabled)}
                        />
                    );
                })}
            </div>

            {mutation.isPending && (
                <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-blue-600 flex items-center gap-2">
                    <div className="animate-spin h-3 w-3 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                    Syncing with server...
                </div>
            )}
        </div>
    );
};

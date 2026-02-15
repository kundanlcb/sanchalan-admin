import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOperationConfig, updateOperationConfig } from '../../services/operationService';
import { Settings } from 'lucide-react';

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
        mutationFn: (newConfig: any) => updateOperationConfig(schoolId, newConfig),
        onSuccess: () => {
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
                    const isEnabled = config?.[toggle.key as keyof typeof config] as boolean;
                    return (
                        <div key={toggle.key} className="flex items-center justify-between">
                            <div className="flex-1 pr-4">
                                <h4 className="text-sm font-semibold text-gray-900">{toggle.label}</h4>
                                <p className="text-xs text-gray-500 mt-0.5">{toggle.description}</p>
                            </div>
                            <button
                                onClick={() => handleToggle(toggle.key, isEnabled)}
                                disabled={mutation.isPending}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                    ${isEnabled ? 'bg-blue-600' : 'bg-gray-200'}`}
                            >
                                <span
                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                                        ${isEnabled ? 'translate-x-5' : 'translate-x-0'}`}
                                />
                            </button>
                        </div>
                    );
                })}
            </div>

            {mutation.isPending && (
                <div className="mt-4 text-xs text-blue-600 flex items-center gap-2">
                    <div className="animate-spin h-3 w-3 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                    Saving changes...
                </div>
            )}
        </div>
    );
};

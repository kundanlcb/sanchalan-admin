import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSchoolFeatures, toggleSchoolFeature } from '../../../subscriptions/services/subscriptionService';
import { Settings } from 'lucide-react';
import { Switch } from '../../../../components/common/Switch';

interface OperationConfigProps {
    schoolId: string;
}

export const OperationConfig: React.FC<OperationConfigProps> = ({ schoolId }) => {
    const queryClient = useQueryClient();
    const [updatingFeatureId, setUpdatingFeatureId] = useState<string | null>(null);

    const { data: schoolFeatures, isLoading } = useQuery({
        queryKey: ['school-features', schoolId],
        queryFn: () => getSchoolFeatures(schoolId),
    });

    const mutation = useMutation({
        mutationFn: ({ featureId, enabled }: { featureId: string; enabled: boolean }) =>
            toggleSchoolFeature(schoolId, featureId, enabled),
        onMutate: ({ featureId }) => {
            setUpdatingFeatureId(featureId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['school-features', schoolId] });
            queryClient.invalidateQueries({ queryKey: ['school', schoolId] });
        },
        onSettled: () => {
            setUpdatingFeatureId(null);
        },
    });

    if (isLoading) {
        return <div className="animate-pulse h-48 bg-gray-50 rounded-lg"></div>;
    }

    if (!schoolFeatures || schoolFeatures.length === 0) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-gray-500" />
                    Feature Toggles
                </h3>
                <p className="text-sm text-gray-500">No features available for this school.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-500" />
                Feature Toggles
            </h3>

            <div className="space-y-4">
                {schoolFeatures.map((feature) => {
                    const isRowUpdating = mutation.isPending && updatingFeatureId === feature.featureId;
                    return (
                        <div key={feature.featureId} className="border border-gray-200 rounded-lg p-3 bg-gray-50/50">
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="text-sm font-semibold text-gray-900">{feature.name}</p>
                                        <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                                            {feature.code}
                                        </span>
                                        {feature.inActivePlan && (
                                            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                                                In Plan
                                            </span>
                                        )}
                                        <span
                                            className={`text-[10px] px-2 py-0.5 rounded ${feature.enabled
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-200 text-gray-700'
                                                }`}
                                        >
                                            {feature.enabled ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    {feature.description && (
                                        <p className="text-xs text-gray-500 mt-1">{feature.description}</p>
                                    )}
                                </div>

                                <div className="pt-1">
                                    <Switch
                                        checked={feature.enabled}
                                        disabled={isRowUpdating}
                                        onChange={(nextValue) =>
                                            mutation.mutate({
                                                featureId: feature.featureId,
                                                enabled: nextValue,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {mutation.isPending && (
                <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-blue-600 flex items-center gap-2">
                    <div className="animate-spin h-3 w-3 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                    Syncing feature status...
                </div>
            )}
        </div>
    );
};

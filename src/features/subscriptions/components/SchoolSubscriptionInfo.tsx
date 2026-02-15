import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getActiveSubscription, getPlans, assignPlanToSchool } from '../services/subscriptionService';
import { Button } from '../../../components/common/Button';
import { CreditCard, Calendar, AlertCircle } from 'lucide-react';

interface SchoolSubscriptionInfoProps {
    schoolId: string;
}

export const SchoolSubscriptionInfo: React.FC<SchoolSubscriptionInfoProps> = ({ schoolId }) => {
    const queryClient = useQueryClient();
    const [isAssigning, setIsAssigning] = useState(false);
    const [selectedPlanId, setSelectedPlanId] = useState<string>('');

    const { data: subscription, isLoading: isLoadingSub } = useQuery({
        queryKey: ['active-subscription', schoolId],
        queryFn: () => getActiveSubscription(schoolId),
    });

    const { data: plans } = useQuery({
        queryKey: ['subscription-plans'],
        queryFn: getPlans,
        enabled: isAssigning,
    });

    const assignMutation = useMutation({
        mutationFn: ({ planId }: { planId: string }) => assignPlanToSchool(schoolId, planId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['active-subscription', schoolId] });
            setIsAssigning(false);
        },
    });

    if (isLoadingSub) {
        return <div className="animate-pulse h-32 bg-gray-50 rounded-lg"></div>;
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-500" />
                    Subscription
                </h3>
                {!isAssigning && (
                    <Button variant="outline" size="sm" onClick={() => setIsAssigning(true)}>
                        Change Plan
                    </Button>
                )}
            </div>

            {isAssigning ? (
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Select Plan</label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedPlanId}
                            onChange={(e) => setSelectedPlanId(e.target.value)}
                        >
                            <option value="">Choose a plan...</option>
                            {plans?.map((plan) => (
                                <option key={plan.id} value={plan.id}>
                                    {plan.name} - ₹{plan.price} ({plan.durationMonths}mo)
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setIsAssigning(false)}>
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            disabled={!selectedPlanId}
                            isLoading={assignMutation.isPending}
                            onClick={() => assignMutation.mutate({ planId: selectedPlanId })}
                        >
                            Assign Plan
                        </Button>
                    </div>
                </div>
            ) : subscription ? (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-gray-900">{subscription.plan.name}</p>
                            <p className="text-xs text-gray-500">₹{subscription.plan.price} per period</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${subscription.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {subscription.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <div>
                                <p className="text-xs text-gray-400">Starts</p>
                                <p>{new Date(subscription.startDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                        {subscription.endDate && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-400">Expires</p>
                                    <p>{new Date(subscription.endDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <AlertCircle className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                    <p className="text-sm text-gray-500">No active subscription</p>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 text-blue-600 hover:text-blue-700"
                        onClick={() => setIsAssigning(true)}
                    >
                        Assign first plan
                    </Button>
                </div>
            )}
        </div>
    );
};

// Internal icon for consistency if lucide clock is missing in scope
const Clock = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);

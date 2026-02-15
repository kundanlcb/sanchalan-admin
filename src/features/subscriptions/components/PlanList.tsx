import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPlans } from '../services/subscriptionService';
import { Button } from '../../../components/common/Button';
import { Plus, CreditCard, Users, Clock } from 'lucide-react';

export const PlanList: React.FC = () => {
    const { data: plans, isLoading, isError } = useQuery({
        queryKey: ['subscription-plans'],
        queryFn: getPlans,
    });

    if (isLoading) {
        return <div className="text-center py-10">Loading plans...</div>;
    }

    if (isError) {
        return <div className="text-center py-10 text-red-500">Failed to load subscription plans</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Subscription Plans</h1>
                    <p className="text-gray-500">Define and manage plans available for schools</p>
                </div>
                <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Plan
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans?.map((plan) => (
                    <div key={plan.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6 border-b border-gray-100 bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                            <div className="mt-2 flex items-baseline gap-1">
                                <span className="text-2xl font-bold">₹{plan.price}</span>
                                <span className="text-gray-500 text-sm">/ {plan.durationMonths} months</span>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="flex items-center text-sm text-gray-600">
                                <Users className="w-4 h-4 mr-3 text-blue-500" />
                                <span>{plan.maxStudents ? `Up to ${plan.maxStudents} students` : 'Unlimited students'}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <Clock className="w-4 h-4 mr-3 text-blue-500" />
                                <span>Valid for {plan.durationMonths} months</span>
                            </div>

                            {plan.features && (
                                <div className="pt-2">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Features</p>
                                    <ul className="space-y-2">
                                        {plan.features.split(',').map((feature, idx) => (
                                            <li key={idx} className="flex items-start text-sm text-gray-600">
                                                <div className="mr-2 mt-1 w-1 h-1 rounded-full bg-blue-500" />
                                                {feature.trim()}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {plans?.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                        <CreditCard className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No plans defined</h3>
                        <p className="text-gray-500 mt-1">Start by creating your first subscription plan</p>
                        <Button variant="outline" className="mt-6">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Plan
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

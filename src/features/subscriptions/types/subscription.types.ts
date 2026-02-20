import type { SubscriptionPlan, SchoolSubscription } from '../../../api/models';

export type { SubscriptionPlan, SchoolSubscription };

export interface Feature {
    id: string;
    code: string;
    name: string;
    description?: string;
}

export interface CreatePlanRequest extends Omit<SubscriptionPlan, 'id' | 'createdAt' | 'updatedAt' | 'features'> {
    featureIds?: string[];
}

export interface AssignPlanRequest {
    schoolId: string;
    planId: string;
}

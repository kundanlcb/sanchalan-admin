import type { SubscriptionPlan, SchoolSubscription } from '../../../api/models';

export type { SubscriptionPlan, SchoolSubscription };

export interface CreatePlanRequest extends Omit<SubscriptionPlan, 'id' | 'createdAt' | 'updatedAt'> { }

export interface AssignPlanRequest {
    schoolId: string;
    planId: string;
}

import { subscriptionApi } from '../../../api/services';
import type { SubscriptionPlan, SchoolSubscription, CreatePlanRequest } from '../types/subscription.types';

export const getPlans = async (): Promise<SubscriptionPlan[]> => {
    try {
        const response = await subscriptionApi.getAllPlans();
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createPlan = async (data: CreatePlanRequest): Promise<SubscriptionPlan> => {
    try {
        const response = await subscriptionApi.createPlan({ subscriptionPlan: data });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const assignPlanToSchool = async (schoolId: string, planId: string): Promise<SchoolSubscription> => {
    try {
        const response = await subscriptionApi.assignPlan({ schoolId, planId });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getActiveSubscription = async (schoolId: string): Promise<SchoolSubscription> => {
    try {
        const response = await subscriptionApi.getActiveSubscription({ schoolId });
        return response.data;
    } catch (error) {
        throw error;
    }
};

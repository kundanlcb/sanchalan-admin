import { subscriptionApi } from '../../../api/services';
import apiClient from '../../../services/api/client';
import type { SubscriptionPlan, SchoolSubscription, CreatePlanRequest, Feature } from '../types/subscription.types';

export const getPlans = async (): Promise<SubscriptionPlan[]> => {
    try {
        const response = await subscriptionApi.getAllPlans();
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getFeatures = async (): Promise<Feature[]> => {
    try {
        // Backend API is mounted at /api/platform/v1/features
        const response = await apiClient.get('/api/platform/v1/features');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createPlan = async (data: CreatePlanRequest): Promise<SubscriptionPlan> => {
    try {
        const response = await apiClient.post('/api/platform/v1/subscriptions/plans', data);
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

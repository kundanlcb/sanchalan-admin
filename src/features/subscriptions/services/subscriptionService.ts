import { subscriptionApi } from '../../../api/services';
import apiClient from '../../../services/api/client';
import type { SubscriptionPlan, SchoolSubscription, CreatePlanRequest, Feature, SchoolFeatureState } from '../types/subscription.types';

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
        const response = await apiClient.get('/api/platform/v1/features');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createFeature = async (data: Partial<Feature>): Promise<Feature> => {
    try {
        const response = await apiClient.post('/api/platform/v1/features', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteFeature = async (id: string): Promise<void> => {
    try {
        await apiClient.delete(`/api/platform/v1/features/${id}`);
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

export const getSchoolFeatures = async (schoolId: string): Promise<SchoolFeatureState[]> => {
    try {
        const response = await apiClient.get(`/api/platform/v1/schools/${schoolId}/features`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const toggleSchoolFeature = async (
    schoolId: string,
    featureId: string,
    enabled: boolean
): Promise<SchoolFeatureState> => {
    try {
        const response = await apiClient.put(`/api/platform/v1/schools/${schoolId}/features/${featureId}`, { enabled });
        return response.data;
    } catch (error) {
        throw error;
    }
};

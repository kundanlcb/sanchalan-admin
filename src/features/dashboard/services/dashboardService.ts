import { schoolApi } from '../../../api/services';
import type { School } from '../../../api/models/school';

export interface DashboardMetrics {
    totalSchools: number;
    activeSubscriptions: number;
    pendingOnboarding: number;
    totalRevenue: number;
}

export interface ActivityItem {
    id: string;
    type: 'SCHOOL_CREATED' | 'IMPORT_COMPLETED' | 'PLAN_ASSIGNED';
    title: string;
    description: string;
    timestamp: string;
}

export const getDashboardMetrics = async (): Promise<DashboardMetrics> => {
    try {
        const schoolsResponse = await schoolApi.getAllSchools();
        const schools: School[] = schoolsResponse.data;

        const totalSchools = schools.length;
        const activeSubscriptions = schools.filter((s: School) => s.status === 'ACTIVE').length;
        const pendingOnboarding = schools.filter((s: School) => s.status === 'DRAFT').length;

        return {
            totalSchools,
            activeSubscriptions,
            pendingOnboarding,
            totalRevenue: activeSubscriptions * 5000, // Mock for now
        };
    } catch (error) {
        throw error;
    }
};

export const getRecentActivity = async (): Promise<ActivityItem[]> => {
    try {
        const schoolsResponse = await schoolApi.getAllSchools();
        const schools: School[] = schoolsResponse.data;

        // Sort by createdAt desc and take top 5
        const recentSchools = schools
            .sort((a: School, b: School) => {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA;
            })
            .slice(0, 5)
            .map((s: School) => ({
                id: s.id!,
                type: 'SCHOOL_CREATED' as const,
                title: 'New School Onboarded',
                description: `${s.name} was added to the platform`,
                timestamp: s.createdAt!,
            }));

        return recentSchools;
    } catch (error) {
        throw error;
    }
};

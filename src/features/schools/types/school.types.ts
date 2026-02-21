import type { School as GeneratedSchool, BootstrapAdminRequest as GeneratedBootstrapAdminRequest } from '../../../api/models';

export type SchoolStatus = 'DRAFT' | 'ACTIVE' | 'PAYMENT_DUE' | 'RESTRICTED' | 'SUSPENDED' | 'ARCHIVED';

// Re-export generated types
export type School = GeneratedSchool;
export type BootstrapAdminRequest = GeneratedBootstrapAdminRequest;

// Create request type matching the School interface since implicit DTO usage
export type CreateSchoolRequest = School;

export interface SchoolListResponse {
    content: School[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

export interface OnboardingStatus {
    profileComplete: boolean;
    academicYearCreated: boolean;
    adminUserInvited: boolean;
    subscriptionActive: boolean;
    allComplete: boolean;
}

export interface SchoolOnboardingRequest {
    schoolName: string;
    schoolCode: string;
    board: string;
    registrationNumber: string;
    timezone: string;
    contactInfo: {
        contactEmail: string;
        contactNumber: string;
        address: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    adminName: string;
    adminEmail: string;
    adminPassword?: string;
    adminMobile: string;
    academicYearName: string;
    startDate: string;
    endDate: string;
    planId: string;
}

export interface DraftSchoolRequest {
    schoolCode: string;
    name: string;
    board?: string;
    registrationNumber?: string;
    timezone?: string;
    contactInfo?: {
        contactEmail?: string;
        contactNumber?: string;
        address?: string;
        city?: string;
        state?: string;
        postalCode?: string;
        country?: string;
        contactPerson?: string;
    };
}

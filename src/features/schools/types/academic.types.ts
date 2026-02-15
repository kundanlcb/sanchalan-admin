export interface AcademicYear {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    active: boolean;
    schoolId: string;
}

export interface Section {
    id: number;
    name: string;
    schoolClassId?: number;
}

export interface SchoolClass {
    id: number;
    name: string; // e.g., "Class 1", "Grade 10"
    schoolId: string;
    sections?: Section[];
}

export interface Subject {
    id: number;
    name: string;
    code: string;
    schoolId: string;
}

export interface CreateAcademicYearRequest {
    name: string;
    startDate: string;
    endDate: string;
    active: boolean;
}

export interface CreateClassRequest {
    name: string;
}

export interface CreateSectionRequest {
    name: string;
}

export interface CreateSubjectRequest {
    name: string;
    code: string;
}

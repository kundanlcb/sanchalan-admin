export interface AcademicYear {
    id: string; // UUID
    name: string;
    startDate: string;
    endDate: string;
    active: boolean; // mapped from isCurrent
    schoolId: string;
}

export interface Section {
    id: string; // UUID
    name: string;
    schoolClassId?: number;
}

export interface SchoolClass {
    id: number; // Long
    className: string; // e.g., "Class 1", "Grade 10"
    grade: number;
    section: string;
    room?: string;
    classID?: string;
    schoolId: string;
    sections?: Section[];
}

export interface Subject {
    id: number; // Long
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
    className: string;
    grade: number;
    section: string;
    room?: string;
    classID?: string;
}

export interface CreateSectionRequest {
    name: string;
}

export interface CreateSubjectRequest {
    name: string;
    code: string;
}

export const ImportType = {
    STUDENT: 'STUDENT',
    TEACHER: 'TEACHER',
    PARENT: 'PARENT'
} as const;

export type ImportType = typeof ImportType[keyof typeof ImportType];

export interface ImportJob {
    id: string;
    schoolId: string;
    type: ImportType;
    status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
    fileUrl?: string;
    errorReportUrl?: string;
    createdAt?: string;
}

export interface ImportStatusResponse {
    jobId: string;
    status: string;
    processedCount?: number;
    errorCount?: number;
}

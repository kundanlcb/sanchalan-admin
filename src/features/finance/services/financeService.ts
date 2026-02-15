import { financeApi } from '../../../api/services';
import type {
    FeeCategory,
    CreateFeeCategoryRequest,
    FeeStructure,
    CreateFeeStructureRequest
} from '../types/finance.types';

export const getFeeCategories = async (schoolId: string): Promise<FeeCategory[]> => {
    const response = await financeApi.getCategories({ schoolId });
    return response.data as FeeCategory[];
};

export const createFeeCategory = async (schoolId: string, data: CreateFeeCategoryRequest): Promise<FeeCategory> => {
    const response = await financeApi.createCategory({ schoolId, feeCategoryDto: data });
    return response.data as FeeCategory;
};

export const getFeeStructures = async (schoolId: string): Promise<FeeStructure[]> => {
    const response = await financeApi.getStructures({ schoolId });
    return response.data as FeeStructure[];
};

export const createFeeStructure = async (schoolId: string, data: CreateFeeStructureRequest): Promise<FeeStructure> => {
    const response = await financeApi.createStructure({ schoolId, feeStructureDto: data });
    return response.data as FeeStructure;
};

export const generateInvoices = async (schoolId: string): Promise<void> => {
    await financeApi.generateInvoices({ schoolId });
};

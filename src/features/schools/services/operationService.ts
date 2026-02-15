import { schoolOperationApi } from '../../../api/services';
import type { SchoolOperationConfig } from '../../../api/models/school-operation-config';

export const getOperationConfig = async (schoolId: string): Promise<SchoolOperationConfig> => {
    try {
        const response = await schoolOperationApi.getOperationConfig({ schoolId });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateOperationConfig = async (schoolId: string, config: SchoolOperationConfig): Promise<SchoolOperationConfig> => {
    try {
        const response = await schoolOperationApi.updateOperationConfig({ schoolId, schoolOperationConfig: config });
        return response.data;
    } catch (error) {
        throw error;
    }
};

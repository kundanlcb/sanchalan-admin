import { supportApi } from '../../../api/services';
import type { ImpersonationResponse } from '../types/support.types';

export const unlockAccount = async (userId: string): Promise<void> => {
    await supportApi.unlockAccount({ userId });
};

export const impersonateUser = async (email: string): Promise<ImpersonationResponse> => {
    const response = await supportApi.impersonateUser({ email });
    return response.data as unknown as ImpersonationResponse;
};

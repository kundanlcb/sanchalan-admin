import { Configuration } from './configuration';
import { PlatformFinanceControllerApi } from './api/platform-finance-controller-api';
import { SupportControllerApi } from './api/support-controller-api';
import { SchoolControllerApi } from './api/school-controller-api';
import { SubscriptionControllerApi } from './api/subscription-controller-api';
import { SchoolOperationControllerApi } from './api/school-operation-controller-api';
import apiClient from '../services/api/client';

const config = new Configuration();

// Initialize APIs with the existing axios instance to reuse interceptors (auth token)
export const financeApi = new PlatformFinanceControllerApi(config, undefined, apiClient);
export const supportApi = new SupportControllerApi(config, undefined, apiClient);
export const schoolApi = new SchoolControllerApi(config, undefined, apiClient);
export const subscriptionApi = new SubscriptionControllerApi(config, undefined, apiClient);
export const schoolOperationApi = new SchoolOperationControllerApi(config, undefined, apiClient);

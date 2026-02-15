// API Configuration
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://lhgsvq3v-8082.inc1.devtunnels.ms/',
    TIMEOUT: 10000,
} as const;

export default API_CONFIG;

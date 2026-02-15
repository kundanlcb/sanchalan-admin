export interface PlatformUser {
    id: string;
    email: string;
    fullName: string;
    role: 'OWNER' | 'OPS' | 'FINANCE' | 'SUPPORT' | 'AUDITOR';
    isActive: boolean;
}

export interface AuthResponse {
    success: boolean;
    token: string;
    refreshToken: string;
    user: PlatformUser;
    expiresIn?: number;
}

export interface AuthContextType {
    user: PlatformUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

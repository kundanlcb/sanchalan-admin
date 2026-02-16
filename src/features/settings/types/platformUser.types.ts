export interface PlatformUser {
    id: string;
    name: string;
    email: string;
    roles: string[];
}

export interface CreatePlatformUserRequest {
    name: string;
    email: string;
    roles: string[];
    password?: string; // Optional if we implement invite flow later, but required for now
}

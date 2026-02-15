export interface ImpersonationResponse {
    accessToken: string;
    tokenType: string;
}

export interface UnlockAccountRequest {
    userId: string;
}

export interface ImpersonateUserRequest {
    email: string;
}

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';
import { unlockAccount, impersonateUser } from '../services/supportService';
import { Lock, UserCheck, ShieldAlert, Copy, Check } from 'lucide-react';
import type { ImpersonationResponse } from '../types/support.types';

export const SupportDashboard: React.FC = () => {
    const [userIdToUnlock, setUserIdToUnlock] = useState('');
    const [emailToImpersonate, setEmailToImpersonate] = useState('');
    const [impersonationToken, setImpersonationToken] = useState('');
    const [copied, setCopied] = useState(false);

    const unlockMutation = useMutation({
        mutationFn: (id: string) => unlockAccount(id),
        onSuccess: () => {
            alert('Account unlocked successfully');
            setUserIdToUnlock('');
        },
        onError: (error: Error) => {
            alert(`Failed to unlock account: ${error.message}`);
        }
    });

    const impersonateMutation = useMutation({
        mutationFn: (email: string) => impersonateUser(email),
        onSuccess: (data: ImpersonationResponse) => {
            setImpersonationToken(data.accessToken);
        },
        onError: (error: Error) => {
            alert(`Failed to impersonate user: ${error.message}`);
        }
    });

    const handleCopyToken = () => {
        navigator.clipboard.writeText(impersonationToken);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Support Operations</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Unlock Account Card */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <Lock className="w-6 h-6 text-orange-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Unlock Account</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Unlock a user account that has been locked due to too many failed login attempts.
                    </p>
                    <div className="space-y-4">
                        <Input
                            label="User ID (UUID)"
                            placeholder="e.g. 123e4567-e89b-..."
                            value={userIdToUnlock}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserIdToUnlock(e.target.value)}
                        />
                        <Button
                            onClick={() => unlockMutation.mutate(userIdToUnlock)}
                            disabled={!userIdToUnlock || unlockMutation.isPending}
                            isLoading={unlockMutation.isPending}
                            className="w-full"
                        >
                            Unlock Account
                        </Button>
                    </div>
                </div>

                {/* Impersonation Card */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <UserCheck className="w-6 h-6 text-purple-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">User Impersonation</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Generate a temporary access token to log in as a specific user for troubleshooting.
                    </p>

                    {!impersonationToken ? (
                        <div className="space-y-4">
                            <Input
                                label="User Email"
                                type="email"
                                placeholder="user@example.com"
                                value={emailToImpersonate}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailToImpersonate(e.target.value)}
                            />
                            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 flex gap-2">
                                <ShieldAlert className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                                <p className="text-xs text-yellow-800">
                                    All actions performed while impersonating a user will be logged in the audit trail.
                                </p>
                            </div>
                            <Button
                                onClick={() => impersonateMutation.mutate(emailToImpersonate)}
                                disabled={!emailToImpersonate || impersonateMutation.isPending}
                                isLoading={impersonateMutation.isPending}
                                className="w-full bg-purple-600 hover:bg-purple-700"
                            >
                                Generate Access Token
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                                <p className="text-sm text-green-800 font-medium mb-1">Token Generated!</p>
                                <p className="text-xs text-green-600 break-all">{impersonationToken}</p>
                            </div>
                            <Button variant="outline" className="w-full" onClick={handleCopyToken}>
                                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                {copied ? 'Copied!' : 'Copy Token'}
                            </Button>
                            <Button variant="ghost" className="w-full text-sm" onClick={() => setImpersonationToken('')}>
                                Reset
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

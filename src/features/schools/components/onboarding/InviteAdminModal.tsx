import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../../../components/common/Button';
import { Input } from '../../../../components/common/Input';
import { bootstrapAdmin } from '../../services/schoolService';
import type { BootstrapAdminRequest } from '../../types/school.types';
import { X } from 'lucide-react';

const adminSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    mobileNumber: z.string().optional()
});

interface InviteAdminModalProps {
    schoolId: string;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const InviteAdminModal: React.FC<InviteAdminModalProps> = ({ schoolId, isOpen, onClose, onSuccess }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const { register, handleSubmit, reset, formState: { errors } } = useForm<BootstrapAdminRequest>({
        resolver: zodResolver(adminSchema)
    });

    const onSubmit = async (data: BootstrapAdminRequest) => {
        setIsSubmitting(true);
        setError('');
        try {
            await bootstrapAdmin(schoolId, data);
            reset();
            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to invite admin');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Invite School Admin</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Input
                            label="Admin Name"
                            placeholder="Full Name"
                            {...register('name')}
                            error={errors.name?.message}
                        />
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="admin@school.com"
                            {...register('email')}
                            error={errors.email?.message}
                        />
                        <Input
                            label="Temporary Password"
                            type="password"
                            placeholder="******"
                            {...register('password')}
                            error={errors.password?.message}
                        />
                        <Input
                            label="Mobile Number (Optional)"
                            type="tel"
                            placeholder="+91..."
                            {...register('mobileNumber')}
                            error={errors.mobileNumber?.message}
                        />

                        <div className="pt-4 flex justify-end gap-3">
                            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                            <Button type="submit" isLoading={isSubmitting}>Send Invite</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

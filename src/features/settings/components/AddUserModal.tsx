import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPlatformUser } from '../services/platformUserService';
import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';
import { X } from 'lucide-react';

const userSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['SUPER_ADMIN', 'ADMIN', 'SUPPORT'])
});

type UserFormData = z.infer<typeof userSchema>;

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose }) => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            role: 'ADMIN'
        }
    });

    const mutation = useMutation({
        mutationFn: (data: UserFormData) => createPlatformUser({
            ...data,
            roles: [data.role]
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['platform-users'] });
            reset();
            onClose();
        }
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-900">Add Platform User</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="p-6 space-y-4">
                    <Input
                        label="Full Name"
                        placeholder="e.g. John Doe"
                        {...register('name')}
                        error={errors.name?.message}
                    />

                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        {...register('email')}
                        error={errors.email?.message}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        {...register('password')}
                        error={errors.password?.message}
                    />

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            {...register('role')}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10 px-3 border"
                        >
                            <option value="SUPER_ADMIN">Super Admin</option>
                            <option value="ADMIN">Admin</option>
                            <option value="SUPPORT">Support Staff</option>
                        </select>
                        {errors.role && (
                            <p className="text-sm text-red-600">{errors.role.message}</p>
                        )}
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Button type="button" variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" isLoading={mutation.isPending}>
                            {mutation.isPending ? 'Creating...' : 'Create User'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

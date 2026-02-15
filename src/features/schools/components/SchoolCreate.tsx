import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';
import { createSchool } from '../services/schoolService';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const schoolSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    schoolCode: z.string().min(3, 'Code must be at least 3 characters').regex(/^[A-Z0-9]+$/, 'Code must be uppercase alphanumeric'),
    board: z.string().min(2, 'Board is required'),
    contactInfo: z.object({
        email: z.string().email('Invalid email address'),
        phone: z.string().min(10, 'Phone must be at least 10 digits'),
        address: z.string().min(5, 'Address is required')
    })
});

type SchoolFormData = z.infer<typeof schoolSchema>;

export const SchoolCreate: React.FC = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm<SchoolFormData>({
        resolver: zodResolver(schoolSchema),
        defaultValues: {
            board: 'CBSE'
        }
    });

    const onSubmit = async (data: SchoolFormData) => {
        setIsSubmitting(true);
        setError('');
        try {
            await createSchool(data);
            navigate('/schools');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create school');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
                <Link to="/schools">
                    <Button variant="ghost" className="p-2 h-auto">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Add New School</h1>
                    <p className="text-gray-500">Register a new school in the platform</p>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Basic Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="School Name"
                                placeholder="e.g. St. Mary's High School"
                                {...register('name')}
                                error={errors.name?.message}
                            />
                            <Input
                                label="School Code"
                                placeholder="e.g. STMARY01"
                                {...register('schoolCode')}
                                error={errors.schoolCode?.message}
                            />
                            <Input
                                label="Board"
                                placeholder="e.g. CBSE, ICSE"
                                {...register('board')}
                                error={errors.board?.message}
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-4">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Email"
                                type="email"
                                placeholder="admin@school.com"
                                {...register('contactInfo.email')}
                                error={errors.contactInfo?.email?.message}
                            />
                            <Input
                                label="Phone"
                                type="tel"
                                placeholder="+91 98765 43210"
                                {...register('contactInfo.phone')}
                                error={errors.contactInfo?.phone?.message}
                            />
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <textarea
                                    className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] ${errors.contactInfo?.address ? 'border-red-500' : ''
                                        }`}
                                    placeholder="Full address"
                                    {...register('contactInfo.address')}
                                />
                                {errors.contactInfo?.address && (
                                    <p className="text-sm text-red-500 mt-1">{errors.contactInfo.address.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end gap-3 border-t">
                        <Link to="/schools">
                            <Button type="button" variant="outline">Cancel</Button>
                        </Link>
                        <Button type="submit" isLoading={isSubmitting}>
                            Create School
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

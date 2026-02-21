import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';
import { completeSchoolOnboarding, getSchoolById, updateSchool } from '../services/schoolService';
import type { DraftSchoolRequest } from '../types/school.types';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const schoolSchema = z.object({
    schoolCode: z.string().min(3, 'Code must be at least 3 characters').regex(/^[A-Z0-9]+$/, 'Code must be uppercase alphanumeric'),
    name: z.string().min(3, 'Name must be at least 3 characters'),
    board: z.string().optional(),
    registrationNumber: z.string().optional(),
    timezone: z.string().optional(),
    contactInfo: z.object({
        contactEmail: z.string().optional().refine((value) => !value || /\S+@\S+\.\S+/.test(value), 'Invalid email address'),
        contactNumber: z.string().optional(),
        address: z.string().optional()
    })
});

type SchoolFormData = z.infer<typeof schoolSchema>;

export const SchoolEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCompleting, setIsCompleting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [schoolStatus, setSchoolStatus] = useState<string | undefined>();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<SchoolFormData>({
        resolver: zodResolver(schoolSchema)
    });

    const toOptional = (value?: string): string | undefined => {
        if (value == null) {
            return undefined;
        }
        const trimmed = value.trim();
        return trimmed.length > 0 ? trimmed : undefined;
    };

    useEffect(() => {
        const fetchSchool = async () => {
            if (!id) return;
            try {
                const school = await getSchoolById(id);
                setSchoolStatus(school.status);
                reset({
                    schoolCode: school.schoolCode || '',
                    name: school.name,
                    board: school.board || '',
                    registrationNumber: school.registrationNumber || '',
                    timezone: school.timezone || 'Asia/Kolkata',
                    contactInfo: {
                        contactEmail: school.contactInfo?.contactEmail || '',
                        contactNumber: school.contactInfo?.contactNumber || '',
                        address: school.contactInfo?.address || ''
                    }
                });
            } catch (err) {
                setError('Failed to load school details');
            } finally {
                setIsLoading(false);
            }
        };
        fetchSchool();
    }, [id, reset]);

    const onSubmit = async (data: SchoolFormData) => {
        if (!id) return;
        setIsSubmitting(true);
        setError('');
        try {
            const contactInfo = {
                contactEmail: toOptional(data.contactInfo.contactEmail),
                contactNumber: toOptional(data.contactInfo.contactNumber),
                address: toOptional(data.contactInfo.address),
            };
            const hasContactInfo = Object.values(contactInfo).some(Boolean);

            const payload: Partial<DraftSchoolRequest> = {
                schoolCode: data.schoolCode.trim().toUpperCase(),
                name: data.name.trim(),
                board: toOptional(data.board),
                registrationNumber: toOptional(data.registrationNumber),
                timezone: toOptional(data.timezone),
                contactInfo: hasContactInfo ? contactInfo : undefined,
            };

            await updateSchool(id, payload);
            navigate(`/schools/${id}`);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update school');
        } finally {
            setIsSubmitting(false);
        }
    };

    const onCompleteOnboarding = async () => {
        if (!id) return;
        setIsCompleting(true);
        setError('');
        try {
            await completeSchoolOnboarding(id);
            navigate(`/schools/${id}`);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to complete onboarding');
        } finally {
            setIsCompleting(false);
        }
    };

    if (isLoading) {
        return <div className="text-center py-10">Loading school details...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
                <Link to={`/schools/${id}`}>
                    <Button variant="ghost" className="p-2 h-auto">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {schoolStatus === 'DRAFT' ? 'Edit Draft School' : 'Edit School'}
                    </h1>
                    <p className="text-gray-500">Update school profile and save progress</p>
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
                                label="School Code"
                                placeholder="e.g. SXHS001"
                                {...register('schoolCode')}
                                error={errors.schoolCode?.message}
                            />
                            <Input
                                label="School Name"
                                placeholder="e.g. St. Mary's High School"
                                {...register('name')}
                                error={errors.name?.message}
                            />
                            <Input
                                label="Board"
                                placeholder="e.g. CBSE, ICSE"
                                {...register('board')}
                                error={errors.board?.message}
                            />
                            <Input
                                label="Registration Number"
                                placeholder="Optional"
                                {...register('registrationNumber')}
                                error={errors.registrationNumber?.message}
                            />
                            <Input
                                label="Timezone"
                                placeholder="e.g. Asia/Kolkata"
                                {...register('timezone')}
                                error={errors.timezone?.message}
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
                                {...register('contactInfo.contactEmail')}
                                error={errors.contactInfo?.contactEmail?.message}
                            />
                            <Input
                                label="Phone"
                                type="tel"
                                placeholder="+91 98765 43210"
                                {...register('contactInfo.contactNumber')}
                                error={errors.contactInfo?.contactNumber?.message}
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

                    {schoolStatus === 'DRAFT' && (
                        <div className="rounded-md border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
                            This school is in draft. You can save partial updates and complete onboarding once admin, academic year, and subscription are configured.
                        </div>
                    )}

                    <div className="pt-6 flex justify-end gap-3 border-t">
                        <Link to={`/schools/${id}`}>
                            <Button type="button" variant="outline">Cancel</Button>
                        </Link>
                        {schoolStatus === 'DRAFT' && (
                            <Button
                                type="button"
                                isLoading={isCompleting}
                                disabled={isSubmitting}
                                onClick={onCompleteOnboarding}
                            >
                                Complete Onboarding
                            </Button>
                        )}
                        <Button type="submit" isLoading={isSubmitting}>
                            {schoolStatus === 'DRAFT' ? 'Save Draft Changes' : 'Update School'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

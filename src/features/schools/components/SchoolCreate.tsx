import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';
import { createDraftSchool, onboardSchool } from '../services/schoolService';
import { getPlans } from '../../subscriptions/services/subscriptionService';
import type { SubscriptionPlan } from '../../subscriptions/types/subscription.types';
import type { DraftSchoolRequest } from '../types/school.types';
import { ArrowLeft, Clock, Shield, Calendar, CreditCard, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Select } from '../../../components/common/Select';

const schoolSchema = z.object({
    schoolName: z.string().min(3, 'Name must be at least 3 characters'),
    schoolCode: z.string().min(3, 'Code must be at least 3 characters').regex(/^[A-Z0-9]+$/, 'Code must be uppercase alphanumeric'),
    board: z.string().min(2, 'Board is required'),
    registrationNumber: z.string().default(''),
    timezone: z.string().default('Asia/Kolkata'),
    contactInfo: z.object({
        contactEmail: z.string().email('Invalid email address'),
        contactNumber: z.string().min(10, 'Phone must be at least 10 digits'),
        address: z.string().min(5, 'Address is required'),
        city: z.string().min(2, 'City is required'),
        state: z.string().min(2, 'State is required'),
        postalCode: z.string().min(6, 'Postal code is required'),
        country: z.string().min(2, 'Country is required'),
    }),
    adminName: z.string().min(3, 'Admin name is required'),
    adminEmail: z.string().email('Invalid admin email'),
    adminMobile: z.string().min(10, 'Admin mobile must be at least 10 digits'),
    academicYearName: z.string().min(4, 'Academic year name is required (e.g. 2024-25)'),
    startDate: z.string().min(10, 'Start date is required'),
    endDate: z.string().min(10, 'End date is required'),
    planId: z.string().min(1, 'Selection of a subscription plan is required')
});

type SchoolFormData = z.infer<typeof schoolSchema>;

export const SchoolCreate: React.FC = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSavingDraft, setIsSavingDraft] = useState(false);
    const [error, setError] = useState('');
    const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
    const [isLoadingPlans, setIsLoadingPlans] = useState(true);

    React.useEffect(() => {
        const fetchPlans = async () => {
            try {
                const data = await getPlans();
                setPlans(data);
            } catch (err: any) {
                console.error('Failed to fetch subscription plans', err);
            } finally {
                setIsLoadingPlans(false);
            }
        };
        fetchPlans();
    }, []);

    const { register, handleSubmit, trigger, getValues, formState: { errors } } = useForm<SchoolFormData>({
        resolver: zodResolver(schoolSchema) as any,
        defaultValues: {
            board: 'CBSE',
            registrationNumber: '',
            timezone: 'Asia/Kolkata',
            contactInfo: {
                country: 'India',
                state: 'Maharashtra',
                city: 'Pune'
            },
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
        } as any
    });

    const toOptional = (value?: string): string | undefined => {
        if (value == null) {
            return undefined;
        }
        const trimmed = value.trim();
        return trimmed.length > 0 ? trimmed : undefined;
    };

    const buildDraftPayload = (data: SchoolFormData): DraftSchoolRequest => {
        const contactInfo = {
            contactEmail: toOptional(data.contactInfo?.contactEmail),
            contactNumber: toOptional(data.contactInfo?.contactNumber),
            address: toOptional(data.contactInfo?.address),
            city: toOptional(data.contactInfo?.city),
            state: toOptional(data.contactInfo?.state),
            postalCode: toOptional(data.contactInfo?.postalCode),
            country: toOptional(data.contactInfo?.country),
        };

        const hasContactInfo = Object.values(contactInfo).some(Boolean);

        return {
            schoolCode: data.schoolCode.trim().toUpperCase(),
            name: data.schoolName.trim(),
            board: toOptional(data.board),
            registrationNumber: toOptional(data.registrationNumber),
            timezone: toOptional(data.timezone),
            contactInfo: hasContactInfo ? contactInfo : undefined,
        };
    };

    const onSubmit = async (data: SchoolFormData) => {
        setIsSubmitting(true);
        setError('');
        try {
            const payload = {
                ...data,
                schoolCode: data.schoolCode.trim().toUpperCase(),
            };
            console.log('Onboarding Payload:', JSON.stringify(payload, null, 2));
            await onboardSchool(payload as any);
            navigate('/schools');
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Failed to onboard school');
        } finally {
            setIsSubmitting(false);
        }
    };

    const onSaveDraft = async () => {
        const isValid = await trigger(['schoolName', 'schoolCode']);
        if (!isValid) {
            return;
        }

        setIsSavingDraft(true);
        setError('');
        try {
            const savedSchool = await createDraftSchool(buildDraftPayload(getValues()));
            navigate(`/schools/${savedSchool.id}`);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Failed to save draft');
        } finally {
            setIsSavingDraft(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-10">
            <div className="mb-6 flex items-center gap-4">
                <Link to="/schools">
                    <Button variant="ghost" className="p-2 h-auto text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">School Onboarding</h1>
                    <p className="text-gray-500">Save as draft anytime, or complete all steps and activate in one go</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-700 text-sm border-b border-red-100 flex gap-2 items-center">
                            <Shield className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    <div className="p-6 space-y-8">
                        {/* Section 1: Basic Details */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2 text-blue-600 mb-2">
                                <Shield className="w-5 h-5" />
                                <h3 className="text-lg font-semibold text-gray-900">1. School Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="School Name"
                                    placeholder="e.g. St. Xavier High School"
                                    {...register('schoolName')}
                                    error={errors.schoolName?.message}
                                />
                                <Input
                                    label="School Code"
                                    placeholder="e.g. SXHS001"
                                    {...register('schoolCode')}
                                    error={errors.schoolCode?.message}
                                />
                                <Input
                                    label="Board"
                                    placeholder="e.g. CBSE, ICSE, SSC"
                                    {...register('board')}
                                    error={errors.board?.message}
                                />
                                <Input
                                    label="Registration Number"
                                    placeholder="Optional"
                                    {...register('registrationNumber')}
                                    error={errors.registrationNumber?.message}
                                />
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Timezone</label>
                                    <div className="relative">
                                        <select
                                            {...register('timezone')}
                                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                        >
                                            <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                                            <option value="UTC">UTC</option>
                                        </select>
                                        <Clock className="w-4 h-4 absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                                    </div>
                                    {errors.timezone && <p className="text-xs text-red-500 mt-1">{errors.timezone.message}</p>}
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Contact Info */}
                        <section className="space-y-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-green-600 mb-2">
                                <MapPin className="w-5 h-5" />
                                <h3 className="text-lg font-semibold text-gray-900">2. Contact & Address</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Official Email"
                                    type="email"
                                    placeholder="info@school.com"
                                    {...register('contactInfo.contactEmail')}
                                    error={errors.contactInfo?.contactEmail?.message}
                                />
                                <Input
                                    label="Contact Number"
                                    placeholder="+91 9876543210"
                                    {...register('contactInfo.contactNumber')}
                                    error={errors.contactInfo?.contactNumber?.message}
                                />
                                <div className="md:col-span-2 space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">School Address</label>
                                    <textarea
                                        {...register('contactInfo.address')}
                                        className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.contactInfo?.address ? 'border-red-500' : ''}`}
                                        placeholder="Enter full physical address..."
                                    />
                                    {errors.contactInfo?.address && <p className="text-xs text-red-500">{errors.contactInfo.address.message}</p>}
                                </div>
                                <Input
                                    label="City"
                                    placeholder="e.g. Pune"
                                    {...register('contactInfo.city')}
                                    error={errors.contactInfo?.city?.message}
                                />
                                <Input
                                    label="State"
                                    placeholder="e.g. Maharashtra"
                                    {...register('contactInfo.state')}
                                    error={errors.contactInfo?.state?.message}
                                />
                                <Input
                                    label="Postal Code"
                                    placeholder="e.g. 411001"
                                    {...register('contactInfo.postalCode')}
                                    error={errors.contactInfo?.postalCode?.message}
                                />
                                <Input
                                    label="Country"
                                    placeholder="e.g. India"
                                    {...register('contactInfo.country')}
                                    error={errors.contactInfo?.country?.message}
                                />
                            </div>
                        </section>

                        {/* Section 3: Admin Setup */}
                        <section className="space-y-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-orange-600 mb-2">
                                <Shield className="w-5 h-5" />
                                <h3 className="text-lg font-semibold text-gray-900">3. Bootstrap Administrator</h3>
                            </div>
                            <p className="text-sm text-gray-500 mb-4">This user will have full access to the regional school management app.</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Input
                                    label="Admin Full Name"
                                    placeholder="e.g. Principal Joe"
                                    {...register('adminName')}
                                    error={errors.adminName?.message}
                                />
                                <Input
                                    label="Admin Email (Username)"
                                    type="email"
                                    placeholder="admin@school.com"
                                    {...register('adminEmail')}
                                    error={errors.adminEmail?.message}
                                />
                                <Input
                                    label="Admin Mobile"
                                    placeholder="Mobile number"
                                    {...register('adminMobile')}
                                    error={errors.adminMobile?.message}
                                />
                            </div>
                            <div className="p-3 bg-blue-50 rounded text-xs text-blue-700 border border-blue-100 italic">
                                Note: Default password will be set to the admin email for first login.
                            </div>
                        </section>

                        {/* Section 4: Academic Year */}
                        <section className="space-y-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-purple-600 mb-2">
                                <Calendar className="w-5 h-5" />
                                <h3 className="text-lg font-semibold text-gray-900">4. Initial Academic Year</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Input
                                    label="Year Name"
                                    placeholder="e.g. 2024-25"
                                    {...register('academicYearName')}
                                    error={errors.academicYearName?.message}
                                />
                                <Input
                                    label="Start Date"
                                    type="date"
                                    {...register('startDate')}
                                    error={errors.startDate?.message}
                                />
                                <Input
                                    label="End Date"
                                    type="date"
                                    {...register('endDate')}
                                    error={errors.endDate?.message}
                                />
                            </div>
                        </section>

                        {/* Section 5: Subscription Plan */}
                        <section className="space-y-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-pink-600 mb-2">
                                <CreditCard className="w-5 h-5" />
                                <h3 className="text-lg font-semibold text-gray-900">5. Subscription Plan</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {isLoadingPlans ? (
                                    <div className="h-10 bg-gray-100 animate-pulse rounded md:col-span-2" />
                                ) : (
                                    <Select
                                        label="Select Plan"
                                        {...register('planId')}
                                        error={errors.planId?.message}
                                    >
                                        <option value="">Choose a plan...</option>
                                        {plans.map(plan => (
                                            <option key={plan.id} value={plan.id}>
                                                {plan.name} - {plan.durationMonths} Months ({plan.price} INR)
                                            </option>
                                        ))}
                                    </Select>
                                )}
                            </div>
                        </section>
                    </div>

                    <div className="bg-gray-50 p-6 flex justify-end gap-4 border-t border-gray-200 shadow-inner">
                        <Link to="/schools">
                            <Button type="button" variant="outline" className="px-6 hover:bg-white">
                                Cancel
                            </Button>
                        </Link>
                        <Button
                            type="button"
                            variant="outline"
                            isLoading={isSavingDraft}
                            disabled={isSubmitting}
                            onClick={onSaveDraft}
                            className="px-8 bg-white"
                        >
                            Save as Draft
                        </Button>
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            disabled={isSavingDraft}
                            className="bg-blue-600 hover:bg-blue-700 px-8 text-white font-medium shadow-lg hover:shadow-xl transition-all"
                        >
                            Onboard & Activate School
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

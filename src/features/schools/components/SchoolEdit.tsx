import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';
import { getSchoolById, updateSchool } from '../services/schoolService';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const schoolSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    board: z.string().min(2, 'Board is required'),
    contactInfo: z.object({
        contactEmail: z.string().email('Invalid email address'),
        contactNumber: z.string().min(10, 'Phone must be at least 10 digits'),
        address: z.string().min(5, 'Address is required')
    })
});

type SchoolFormData = z.infer<typeof schoolSchema>;

export const SchoolEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const { register, handleSubmit, reset, formState: { errors } } = useForm<SchoolFormData>({
        resolver: zodResolver(schoolSchema)
    });

    useEffect(() => {
        const fetchSchool = async () => {
            if (!id) return;
            try {
                const school = await getSchoolById(id);
                reset({
                    name: school.name,
                    board: school.board,
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
            await updateSchool(id, data as any);
            navigate(`/schools/${id}`);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update school');
        } finally {
            setIsSubmitting(false);
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
                    <h1 className="text-2xl font-bold text-gray-900">Edit School</h1>
                    <p className="text-gray-500">Update school details and contact information</p>
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

                    <div className="pt-6 flex justify-end gap-3 border-t">
                        <Link to={`/schools/${id}`}>
                            <Button type="button" variant="outline">Cancel</Button>
                        </Link>
                        <Button type="submit" isLoading={isSubmitting}>
                            Update School
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSchoolById } from '../services/schoolService';
import { Button } from '../../../components/common/Button';
import { ArrowLeft, School as SchoolIcon, MapPin, Phone, Mail, Edit } from 'lucide-react';
import { InviteAdminModal } from './onboarding/InviteAdminModal';
import { SchoolSubscriptionInfo } from '../../subscriptions/components/SchoolSubscriptionInfo';
import { OperationConfig } from './operations/OperationConfig';

export const SchoolDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    const { data: school, isLoading, isError, refetch } = useQuery({
        queryKey: ['school', id],
        queryFn: () => getSchoolById(id!),
        enabled: !!id,
    });

    if (isLoading) {
        return <div className="text-center py-10">Loading school details...</div>;
    }

    if (isError || !school) {
        return (
            <div className="text-center py-10">
                <p className="text-red-500 mb-4">Failed to load school details</p>
                <Link to="/schools">
                    <Button variant="outline">Back to Schools</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <InviteAdminModal
                schoolId={school.id!}
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                onSuccess={() => {
                    // Refetch or show toast
                    refetch();
                }}
            />

            {/* Header */}
            <div className="flex items-start gap-4">
                <Link to="/schools">
                    <Button variant="ghost" className="p-2 h-auto mt-1">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-gray-900">{school.name}</h1>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${school.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                                school.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'}`}>
                            {school.status}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                            <span className="font-semibold">Code:</span> {school.schoolCode}
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="font-semibold">Board:</span> {school.board}
                        </span>
                    </div>
                </div>
                <Link to={`/schools/${id}/edit`}>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Edit className="w-4 h-4" />
                        Edit School
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content - Overview & Config */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                            <SchoolIcon className="w-5 h-5 text-gray-500" />
                            Overview
                        </h3>
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Founded</dt>
                                <dd className="text-sm text-gray-900">{school.createdAt ? new Date(school.createdAt).toLocaleDateString() : 'N/A'}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                                <dd className="text-sm text-gray-900">{school.updatedAt ? new Date(school.updatedAt).toLocaleDateString() : 'N/A'}</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Readiness Checklist</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                <span className="text-sm text-gray-700">School Profile</span>
                                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">Completed</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                <span className="text-sm text-gray-700">Academic Year</span>
                                <span className="text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded">Pending</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                <span className="text-sm text-gray-700">Admin User</span>
                                <span className="text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded">Pending</span>
                            </div>
                        </div>
                    </div>

                    <OperationConfig schoolId={school.id!} />
                </div>

                {/* Sidebar - Contact Info & Subscription */}
                <div className="space-y-6">
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Contact Information</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                                <span className="text-sm text-gray-600 break-all">{school.contactInfo?.contactEmail}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                                <span className="text-sm text-gray-600">{school.contactInfo?.contactNumber}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                                <span className="text-sm text-gray-600">{school.contactInfo?.address}</span>
                            </li>
                        </ul>
                    </div>

                    <SchoolSubscriptionInfo schoolId={school.id!} />

                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => setIsInviteModalOpen(true)}
                            >
                                Invite Admin
                            </Button>
                            <Link to={`/schools/${id}/finance`} className="block w-full">
                                <Button variant="outline" className="w-full justify-start">Configure Fees</Button>
                            </Link>
                            <Link to={`/schools/${id}/import`} className="block w-full">
                                <Button variant="outline" className="w-full justify-start">Bulk Data Import</Button>
                            </Link>
                            <Button variant="outline" className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200">Deactivate School</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

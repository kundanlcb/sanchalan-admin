import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSchools } from '../services/schoolService';
import { Button } from '../../../components/common/Button';
import { Plus, Search, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SchoolList: React.FC = () => {
    const [page, setPage] = useState(0);
    const { data, isLoading, isError } = useQuery({
        queryKey: ['schools', page],
        queryFn: () => getSchools(page),
    });

    if (isLoading) {
        return <div className="text-center py-10">Loading schools...</div>;
    }

    if (isError) {
        return <div className="text-center py-10 text-red-500">Failed to load schools</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Schools</h1>
                    <p className="text-gray-500">Manage all registered schools</p>
                </div>
                <Link to="/schools/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add School
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search schools..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3">Code</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Board</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Created</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data?.content.map((school) => (
                                <tr key={school.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{school.schoolCode}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium">{school.name}</div>
                                        <div className="text-xs text-gray-500">{school.contactInfo?.contactEmail}</div>
                                    </td>
                                    <td className="px-6 py-4">{school.board}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${school.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                                                school.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-gray-100 text-gray-800'}`}>
                                            {school.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {school.createdAt ? new Date(school.createdAt).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link to={`/schools/${school.id}`}>
                                            <Button variant="ghost" className="p-2 h-auto">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {data?.content.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                                        No schools found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination placeholder */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        Showing {data?.size} of {data?.totalElements} results
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            disabled={page === 0}
                            onClick={() => setPage(p => p - 1)}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            disabled={(page + 1) >= (data?.totalPages || 0)}
                            onClick={() => setPage(p => p + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

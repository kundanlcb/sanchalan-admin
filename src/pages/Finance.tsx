import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSchools } from '../features/schools/services/schoolService';
import { Button } from '../components/common/Button';
import { Search, Wallet, ArrowRight, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Finance: React.FC = () => {
    const [page, setPage] = useState(0);
    const { data, isLoading, isError } = useQuery({
        queryKey: ['schools-finance', page],
        queryFn: () => getSchools(page),
    });

    if (isLoading) {
        return <div className="text-center py-10">Loading financial data...</div>;
    }

    if (isError) {
        return <div className="text-center py-10 text-red-500">Failed to load schools for finance</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Finance Overview</h1>
                <p className="text-gray-500">Manage fee configurations and financial settings across schools</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                        <Wallet className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Schools</p>
                        <p className="text-2xl font-bold text-gray-900">{data?.totalElements || 0}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-green-50 rounded-full text-green-600">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Collection Active</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {data?.content.filter(s => s.status === 'ACTIVE').length || 0}
                        </p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-purple-50 rounded-full text-purple-600">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Pending Setup</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {data?.content.filter(s => s.status === 'DRAFT').length || 0}
                        </p>
                    </div>
                </div>
            </div>

            {/* Schools Table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by school name or code..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3">School Name</th>
                                <th className="px-6 py-3">School Code</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data?.content.map((school) => (
                                <tr key={school.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{school.name}</div>
                                        <div className="text-xs text-gray-500">{school.board} Board</div>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs">{school.schoolCode}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                        ${school.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                                                school.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-gray-100 text-gray-800'}`}>
                                            {school.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link to={`/schools/${school.id}/finance`}>
                                            <Button variant="outline" size="sm" className="inline-flex items-center gap-2">
                                                Configure Fees
                                                <ArrowRight className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        Showing {data?.size} of {data?.totalElements} schools
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

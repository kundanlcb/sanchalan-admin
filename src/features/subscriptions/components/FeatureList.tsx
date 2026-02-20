import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFeatures, createFeature, deleteFeature } from '../services/subscriptionService';
import { Button } from '../../../components/common/Button';
import { ListTodo, Plus, Trash2, AlertCircle, Info } from 'lucide-react';

export const FeatureList: React.FC = () => {
    const queryClient = useQueryClient();
    const [isAdding, setIsAdding] = useState(false);
    const [newFeature, setNewFeature] = useState({
        code: '',
        name: '',
        description: ''
    });

    const { data: features, isLoading, isError } = useQuery({
        queryKey: ['features'],
        queryFn: getFeatures
    });

    const createMutation = useMutation({
        mutationFn: createFeature,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['features'] });
            setIsAdding(false);
            setNewFeature({ code: '', name: '', description: '' });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteFeature,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['features'] });
        }
    });

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this feature? This might affect existing plans.')) {
            deleteMutation.mutate(id);
        }
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createMutation.mutate(newFeature);
    };

    if (isLoading) {
        return <div className="text-center py-10 text-gray-500">Loading features...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Feature Management</h1>
                    <p className="text-sm text-gray-500">Manage global features available for subscription plans.</p>
                </div>
                {!isAdding && (
                    <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Feature
                    </Button>
                )}
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Feature</h3>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Feature Code</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. STUDENT_MGMT"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                                    value={newFeature.code}
                                    onChange={(e) => setNewFeature({ ...newFeature, code: e.target.value.toUpperCase() })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Display Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Student Management"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={newFeature.name}
                                    onChange={(e) => setNewFeature({ ...newFeature, name: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                rows={3}
                                required
                                placeholder="Describe what this feature enables..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={newFeature.description}
                                onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button variant="ghost" type="button" onClick={() => setIsAdding(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" isLoading={createMutation.isPending}>
                                Create Feature
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {features?.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                                    <div className="flex flex-col items-center">
                                        <Info className="w-8 h-8 text-gray-300 mb-2" />
                                        <p>No features found. Start by adding one!</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            features?.map((feature) => (
                                <tr key={feature.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-8 w-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                                                <ListTodo className="w-4 h-4" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{feature.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <code className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                            {feature.code}
                                        </code>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">{feature.description}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleDelete(feature.id)}
                                            disabled={deleteMutation.isPending}
                                            className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                            title="Delete Feature"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {isError && (
                <div className="flex items-center gap-2 p-4 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
                    <AlertCircle className="w-4 h-4" />
                    Failed to fetch features. Please check your connection.
                </div>
            )}
        </div>
    );
};

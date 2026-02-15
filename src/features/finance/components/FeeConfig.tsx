import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FeeCategoryList } from './FeeCategoryList';
import { FeeStructureList } from './FeeStructureList';
import { Button } from '../../../components/common/Button';
import { ArrowLeft, Wallet, Layers, FileText } from 'lucide-react';
import { cn } from '../../../utils/cn';

export const FeeConfig: React.FC = () => {
    const { id: schoolId } = useParams<{ id: string }>();
    const [activeTab, setActiveTab] = useState<'categories' | 'structures'>('categories');

    if (!schoolId) return <div>Invalid School ID</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link to={`/schools/${schoolId}`}>
                    <Button variant="ghost" className="p-2 h-auto">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Fee Configuration</h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('categories')}
                            className={cn(
                                "w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2",
                                activeTab === 'categories'
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            )}
                        >
                            <Layers className="w-4 h-4" />
                            Fee Categories
                        </button>
                        <button
                            onClick={() => setActiveTab('structures')}
                            className={cn(
                                "w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2",
                                activeTab === 'structures'
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            )}
                        >
                            <FileText className="w-4 h-4" />
                            Fee Structures
                        </button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'categories' ? (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="mb-6 bg-blue-50 p-4 rounded-md flex items-start gap-3">
                                <Wallet className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-medium text-blue-900">About Fee Categories</h4>
                                    <p className="text-sm text-blue-700 mt-1">
                                        Define the types of fees your school collects (e.g., Tuition Fee, Transport Fee, Exam Fee).
                                        These categories will be used to build detailed fee structures.
                                    </p>
                                </div>
                            </div>
                            <FeeCategoryList />
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="mb-6 bg-blue-50 p-4 rounded-md flex items-start gap-3">
                                <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-medium text-blue-900">About Fee Structures</h4>
                                    <p className="text-sm text-blue-700 mt-1">
                                        Create fee plans for specific classes and academic years. Link multiple categories to a structure
                                        to define the total payable amount.
                                    </p>
                                </div>
                            </div>
                            <FeeStructureList />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

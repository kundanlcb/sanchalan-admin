import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../../../../components/common/Button';
import { ArrowLeft } from 'lucide-react';
import { AcademicYearList } from './AcademicYearList';
import { ClassList } from './ClassList';
import { SubjectList } from './SubjectList';

type Tab = 'years' | 'classes' | 'subjects';

export const AcademicStructure: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [activeTab, setActiveTab] = useState<Tab>('years');

    if (!id) return <div>Invalid School ID</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link to={`/schools/${id}`}>
                    <Button variant="ghost" className="p-2 h-auto">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Academic Structure</h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden min-h-[500px]">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('years')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'years'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Academic Years
                        </button>
                        <button
                            onClick={() => setActiveTab('classes')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'classes'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Classes & Sections
                        </button>
                        <button
                            onClick={() => setActiveTab('subjects')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'subjects'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Subjects
                        </button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'years' && <AcademicYearList schoolId={id} />}
                    {activeTab === 'classes' && <ClassList schoolId={id} />}
                    {activeTab === 'subjects' && <SubjectList schoolId={id} />}
                </div>
            </div>
        </div>
    );
};

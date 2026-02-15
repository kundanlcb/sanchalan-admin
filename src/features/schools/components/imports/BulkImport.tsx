import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Button } from '../../../../components/common/Button';
import { ImportType, type ImportJob } from '../../types/import.types';
import { uploadImportFile } from '../../services/importService';
import { ArrowLeft, Upload, FileSpreadsheet, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '../../../../utils/cn';

export const BulkImport: React.FC = () => {
    const { id: schoolId } = useParams<{ id: string }>();
    const [selectedType, setSelectedType] = useState<ImportType>(ImportType.STUDENT);
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [job, setJob] = useState<ImportJob | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const uploadMutation = useMutation({
        mutationFn: (fileToUpload: File) => uploadImportFile(schoolId!, selectedType, fileToUpload),
        onSuccess: (data) => {
            setJob(data);
            setUploadStatus('success');
            setFile(null);
        },
        onError: (error: any) => {
            setErrorMessage(error.response?.data?.message || 'Failed to upload file');
            setUploadStatus('error');
        }
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setUploadStatus('idle');
            setErrorMessage('');
        }
    };

    const handleUpload = () => {
        if (!file || !schoolId) return;
        setUploadStatus('uploading');
        uploadMutation.mutate(file);
    };

    if (!schoolId) return <div>Invalid School ID</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link to={`/schools/${schoolId}`}>
                    <Button variant="ghost" className="p-2 h-auto">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Bulk Data Import</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Panel: Configuration & Upload */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">1. Select Import Type</h3>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {(Object.keys(ImportType) as Array<keyof typeof ImportType>).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => { setSelectedType(ImportType[type]); setFile(null); setUploadStatus('idle'); }}
                                    className={cn(
                                        "flex flex-col items-center justify-center p-4 border rounded-lg transition-all",
                                        selectedType === ImportType[type]
                                            ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                                            : "border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
                                    )}
                                >
                                    <FileSpreadsheet className={cn("w-6 h-6 mb-2", selectedType === ImportType[type] ? "text-blue-500" : "text-gray-400")} />
                                    {type}
                                </button>
                            ))}
                        </div>

                        <h3 className="text-lg font-medium text-gray-900 mb-4">2. Upload File</h3>
                        <div className="mb-6">
                            <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                                <span className="flex items-center space-x-2">
                                    <Upload className="w-6 h-6 text-gray-600" />
                                    <span className="font-medium text-gray-600">
                                        {file ? file.name : 'Drop file here or click to browse'}
                                    </span>
                                </span>
                                <input type="file" name="file_upload" className="hidden" accept=".csv,.xlsx" onChange={handleFileChange} />
                            </label>
                            <p className="mt-2 text-sm text-gray-500">Supported formats: .csv, .xlsx</p>
                        </div>

                        {errorMessage && (
                            <div className="mb-4 p-4 bg-red-50 rounded-md border border-red-100 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                                <span className="text-sm text-red-700">{errorMessage}</span>
                            </div>
                        )}

                        <div className="flex justify-end">
                            <Button
                                onClick={handleUpload}
                                disabled={!file || uploadStatus === 'uploading'}
                                isLoading={uploadStatus === 'uploading'}
                            >
                                Start Import
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Status & Help */}
                <div className="space-y-6">
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Implementation Notes</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li>• Ensure the file follows the standard template format.</li>
                            <li>• For <strong>Students</strong>, required fields: Name, Class, Section.</li>
                            <li>• For <strong>Teachers</strong>, ensure unique Email addresses.</li>
                            <li>• Large files may take a few minutes to process.</li>
                        </ul>
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <Button variant="outline" className="w-full">
                                Download Template ({selectedType})
                            </Button>
                        </div>
                    </div>

                    {job && (
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 animate-in fade-in slide-in-from-bottom-4">
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                                {uploadStatus === 'success' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Loader2 className="w-5 h-5 animate-spin text-blue-500" />}
                                Import Status
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Job ID:</span>
                                    <span className="font-mono text-gray-900">{job.id.substring(0, 8)}...</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Status:</span>
                                    <span className={cn(
                                        "font-medium px-2 py-0.5 rounded-full text-xs",
                                        job.status === 'COMPLETED' ? "bg-green-100 text-green-800" :
                                            job.status === 'FAILED' ? "bg-red-100 text-red-800" :
                                                "bg-blue-100 text-blue-800"
                                    )}>{job.status}</span>
                                </div>
                                {job.status === 'PROCESSING' && (
                                    <p className="text-xs text-gray-500 mt-2">The file is being processed in the background. You can navigate away and check back later.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

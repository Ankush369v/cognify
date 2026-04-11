import React, { useCallback, useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FileUpload = ({ onFileSelect, accept, label = "Upload Document", name = "file" }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragging(true);
        } else if (e.type === 'dragleave') {
            setIsDragging(false);
        }
    }, []);

    const validateFile = (file) => {
        // Simple validation based on extension
        if (accept) {
            const acceptedExtensions = accept.split(',').map(ext => ext.trim());
            const fileName = file.name.toLowerCase();
            const isValid = acceptedExtensions.some(ext => fileName.endsWith(ext));
            if (!isValid) {
                setError(`Invalid file type. Accepted: ${accept}`);
                return false;
            }
        }
        setError(null);
        return true;
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (validateFile(droppedFile)) {
                setFile(droppedFile);
                onFileSelect(droppedFile);

                // Manually set the file input files so form submission works
                const input = document.getElementById(`file-upload-${name}`);
                if (input) {
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(droppedFile);
                    input.files = dataTransfer.files;
                }
            }
        }
    }, [onFileSelect, accept, name]);

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (validateFile(selectedFile)) {
                setFile(selectedFile);
                onFileSelect(selectedFile);
            }
        }
    };

    const clearFile = (e) => {
        e.stopPropagation();
        setFile(null);
        setError(null);
        onFileSelect(null);
        // Reset input value
        const input = document.getElementById(`file-upload-${name}`);
        if (input) input.value = '';
    }

    return (
        <div className="w-full">
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById(`file-upload-${name}`).click()}
                className={`
            relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 group
            ${isDragging
                        ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01] shadow-xl shadow-indigo-500/10'
                        : 'border-white/10 hover:border-indigo-400/50 hover:bg-white/5'
                    }
            ${file ? 'bg-indigo-500/5 border-indigo-500/30' : ''}
            ${error ? 'border-red-500/50 bg-red-500/5' : ''}
        `}
            >
                <input
                    type="file"
                    id={`file-upload-${name}`}
                    name={name}
                    className="hidden"
                    accept={accept}
                    onChange={handleChange}
                />

                <AnimatePresence mode='wait'>
                    {!file ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col items-center gap-3"
                        >
                            <div className="p-4 rounded-full bg-slate-800 shadow-inner">
                                <Upload className="w-8 h-8 text-indigo-400" />
                            </div>
                            <div>
                                <p className="text-lg font-medium text-slate-200">{label}</p>
                                <p className="text-sm text-slate-400 mt-1">Drag & drop or click to browse</p>
                            </div>
                            {accept && (
                                <p className="text-xs text-slate-500 uppercase tracking-wider">
                                    Supports: {accept.replace(/\./g, ' ')}
                                </p>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center justify-between gap-4 p-2"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-green-500/20">
                                    <FileText className="w-6 h-6 text-green-400" />
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-slate-200 truncate max-w-[200px]">{file.name}</p>
                                    <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(2)} KB</p>
                                </div>
                            </div>
                            <button
                                onClick={clearFile}
                                className="p-2 hover:bg-red-500/20 rounded-full group transition-colors"
                                title="Remove file"
                            >
                                <div className="i-lucide-x w-5 h-5 text-slate-400 group-hover:text-red-400">✕</div>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-12 left-0 w-full text-center"
                    >
                        <div className="inline-flex items-center gap-2 text-sm text-red-400 bg-red-900/20 px-4 py-2 rounded-full border border-red-900/50">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;

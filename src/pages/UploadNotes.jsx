import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { PixelCard, ArcadeButton } from '../components/RetroUI';

const UploadNotes = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, uploading, processing, done

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            processFile(droppedFile);
        }
    };

    const processFile = (file) => {
        setFile(file);
        setStatus('uploading');
        // Simulate upload/processing
        setTimeout(() => setStatus('processing'), 1500);
        setTimeout(() => setStatus('done'), 4500);
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-pixel text-retro-blue mb-4">Content to Arcade</h1>
                <p className="text-white/60 font-mono">Transform your boring PDF notes into an exciting 8-bit survival level.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Upload Zone */}
                <motion.div
                    animate={isDragging ? { scale: 1.02, borderColor: '#00f3ff', backgroundColor: 'rgba(0,243,255,0.05)' } : {}}
                    className={`
                        border-4 border-dashed rounded-xl h-80 flex flex-col items-center justify-center p-8 transition-colors
                        ${isDragging ? 'border-retro-blue bg-retro-blue/5' : 'border-gray-700 bg-black/20'}
                        ${status === 'done' ? 'border-retro-green/50 opacity-50 pointer-events-none' : ''}
                    `}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {status === 'idle' ? (
                        <>
                            <div className="w-20 h-20 bg-retro-blue/10 rounded-full flex items-center justify-center mb-6">
                                <Upload className="w-10 h-10 text-retro-blue animate-bounce" />
                            </div>
                            <h3 className="font-pixel text-lg mb-2">Drag & Drop Files</h3>
                            <p className="text-sm text-gray-500 mb-6">Supports PDF, TXT, MD</p>
                            <ArcadeButton>Browse Computer</ArcadeButton>
                        </>
                    ) : (
                        <div className="text-center">
                            <FileText className="w-16 h-16 text-white/50 mx-auto mb-4" />
                            <p className="font-mono text-lg">{file?.name}</p>
                            <div className="w-full h-2 bg-gray-800 rounded-full mt-4 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: status === 'uploading' ? '100%' : '100%' }}
                                    transition={{ duration: 1.5 }}
                                    className="h-full bg-retro-blue"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-2 uppercase">{status}...</p>
                        </div>
                    )}
                </motion.div>

                {/* Processing Status */}
                <div>
                    {status !== 'idle' && (
                        <PixelCard title="System Log" className="bg-black/40 h-80 font-mono text-xs overflow-hidden flex flex-col">
                            <div className="flex-1 space-y-2 p-2">
                                <LogItem text={`[SYSTEM] File detected: ${file.name}`} delay={0.2} />
                                <LogItem text="[UPLOAD] Uploading to neural core..." delay={0.5} />
                                {status === 'processing' && (
                                    <>
                                        <LogItem text="[AI] Parsing text content..." delay={1.8} />
                                        <LogItem text="[AI] Generating questions..." delay={2.5} />
                                        <LogItem text="[AI] Designing level layout..." delay={3.2} />
                                    </>
                                )}
                                {status === 'done' && (
                                    <>
                                        <LogItem text="[SUCCESS] 12 Questions generated!" delay={0} color="text-retro-green" />
                                        <LogItem text="[READY] Level 'Chapter 4: History' created." delay={0.2} color="text-retro-blue" />
                                    </>
                                )}
                            </div>

                            {status === 'done' && (
                                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-4">
                                    <ArcadeButton variant="success" className="w-full">Play Generated Level</ArcadeButton>
                                </motion.div>
                            )}
                        </PixelCard>
                    )}

                    {status === 'idle' && (
                        <div className="h-80 flex items-center justify-center border border-white/5 rounded-xl bg-white/5 text-white/20 font-pixel text-center p-8">
                            Waiting for input stream...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const LogItem = ({ text, delay, color = "text-white/70" }) => (
    <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay }}
        className={`flex items-start gap-2 ${color}`}
    >
        <span className="text-retro-pink">➜</span>
        <span>{text}</span>
    </motion.div>
);

export default UploadNotes;

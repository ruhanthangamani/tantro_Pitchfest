import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ArcadeButton = ({ children, onClick, className = '', variant = 'primary' }) => {
    const baseStyles = "font-pixel uppercase text-sm px-6 py-3 border-b-4 active:border-b-0 active:translate-y-1 transition-all duration-75 outline-none focus:outline-none select-none";

    const variants = {
        primary: "bg-retro-blue text-retro-dark border-blue-800 hover:brightness-110 shadow-[0_0_10px_rgba(0,243,255,0.5)]",
        secondary: "bg-retro-pink text-retro-dark border-pink-800 hover:brightness-110 shadow-[0_0_10px_rgba(255,0,255,0.5)]",
        danger: "bg-red-500 text-white border-red-800 hover:brightness-110",
        success: "bg-retro-green text-retro-dark border-green-800 hover:brightness-110",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </motion.button>
    );
};

export const PixelCard = ({ children, className = '', title }) => {
    return (
        <div className={`relative bg-retro-dark border-2 border-retro-blue p-6 ${className} shadow-[4px_4px_0_0_rgba(0,243,255,0.3)]`}>
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-retro-blue" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-retro-blue" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-retro-blue" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-retro-blue" />

            {title && (
                <div className="absolute -top-4 left-4 bg-retro-dark px-2 font-pixel text-xs text-retro-blue">
                    {title}
                </div>
            )}

            {children}
        </div>
    );
};

export const ProgressBar = ({ value, max = 100, color = 'bg-retro-green', label }) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
        <div className="w-full">
            {label && <div className="font-pixel text-xs mb-1 flex justify-between">
                <span>{label}</span>
                <span>{value}/{max}</span>
            </div>}
            <div className="h-4 border-2 border-white/20 p-0.5 bg-black/50">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full ${color} shadow-[0_0_5px_currentColor]`}
                />
            </div>
        </div>
    );
};

export const Modal = ({ isOpen, onClose, title, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg p-4"
                    >
                        <PixelCard title={title} className="bg-retro-dark border-retro-pink shadow-[4px_4px_0_0_rgba(255,0,255,0.3)]">
                            {children}
                            <button
                                onClick={onClose}
                                className="absolute top-2 right-2 text-retro-pink hover:text-white font-pixel"
                            >
                                X
                            </button>
                        </PixelCard>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

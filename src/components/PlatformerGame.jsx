import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PlatformerGame = ({ isMoving }) => {
    return (
        <div className="relative w-full h-[400px] bg-black overflow-hidden border-4 border-retro-dark rounded-lg shadow-inner">
            {/* Background Layer (Parallax could be added here) */}
            <div className="absolute inset-0 bg-[#1a1a2e] opacity-50">
                <div className="absolute bottom-10 left-10 w-20 h-20 bg-white/5 blur-xl rounded-full" />
                <div className="absolute top-20 right-20 w-32 h-32 bg-retro-purple/10 blur-2xl rounded-full" />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />

            {/* Platforms */}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-retro-dark border-t-4 border-retro-green" />

            <Platform x={100} y={150} width={100} />
            <Platform x={300} y={220} width={80} />
            <Platform x={500} y={180} width={120} />
            <Platform x={700} y={250} width={90} />

            {/* Character */}
            <Character isMoving={isMoving} />

            {/* Collectibles */}
            <Coin x={330} y={270} />
            <Coin x={550} y={230} />
        </div>
    );
};

const Platform = ({ x, y, width }) => (
    <div
        className="absolute h-6 bg-retro-blue border-b-4 border-blue-900 shadow-[0_0_5px_theme('colors.retro-blue')]"
        style={{ left: x, bottom: y, width }}
    />
);

const Character = ({ isMoving }) => {
    return (
        <motion.div
            animate={isMoving ? { x: [50, 200, 200], y: [40, 40, 150] } : {}}
            transition={{ duration: 2, times: [0, 0.5, 1] }}
            className="absolute bottom-10 left-[50px] w-8 h-8"
        >
            {/* Simple 8-bit character using CSS box-shadow or just a block */}
            <div className="w-full h-full bg-retro-pink border-2 border-white relative">
                <div className="absolute top-1 left-1 w-2 h-1 bg-black" />
                <div className="absolute top-1 right-1 w-2 h-1 bg-black" />
                <div className="absolute bottom-1 left-2 w-4 h-1 bg-black" />
            </div>
        </motion.div>
    );
};

const Coin = ({ x, y }) => (
    <motion.div
        animate={{ y: [0, -5, 0], rotateY: [0, 180, 360] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute w-6 h-6 rounded-full border-4 border-retro-yellow bg-yellow-500 shadow-[0_0_10px_theme('colors.retro-yellow')]"
        style={{ left: x, bottom: y }}
    />
);

export default PlatformerGame;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Heart, Shield, Hash, Sword } from 'lucide-react';
import { PixelCard, ArcadeButton, ProgressBar } from '../components/RetroUI';

const Multiplayer = () => {
    const [turn, setTurn] = useState('p1'); // 'p1' or 'p2'

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col pt-4">
            <div className="flex justify-between items-center mb-6 px-4">
                <h1 className="text-3xl font-pixel text-retro-purple text-shadow-glow">VS ARENA</h1>
                <div className="bg-retro-dark px-4 py-2 border border-retro-purple rounded flex items-center gap-2">
                    <Sword className="w-5 h-5 text-retro-purple animate-pulse" />
                    <span className="font-mono text-sm">ROUND 3/5</span>
                </div>
            </div>

            <div className="flex-1 grid md:grid-cols-2 gap-0 md:gap-8 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
                    <div className="bg-black border-2 border-white p-2 rounded-full font-pixel text-xl text-yellow-400">VS</div>
                </div>

                {/* Player 1 */}
                <PlayerPanel
                    isCurrentTurn={turn === 'p1'}
                    name="YOU"
                    color="retro-blue"
                    lives={3}
                    streak={5}
                    accuracy={92}
                    avatarSeed="felix"
                />

                {/* Player 2 */}
                <PlayerPanel
                    isCurrentTurn={turn === 'p2'}
                    name="RIVAL_01"
                    color="retro-pink"
                    lives={2}
                    streak={0}
                    accuracy={78}
                    avatarSeed="ralph"
                />
            </div>

            <div className="mt-8 flex justify-center">
                <ArcadeButton onClick={() => setTurn(t => t === 'p1' ? 'p2' : 'p1')}>
                    Force Next Turn (Debug)
                </ArcadeButton>
            </div>
        </div>
    );
};

const PlayerPanel = ({ isCurrentTurn, name, color, lives, streak, accuracy, avatarSeed }) => {
    const borderColor = isCurrentTurn ? (color === 'retro-blue' ? 'border-retro-blue' : 'border-retro-pink') : 'border-gray-800';
    const shadow = isCurrentTurn ? (color === 'retro-blue' ? 'shadow-[0_0_20px_rgba(0,243,255,0.3)]' : 'shadow-[0_0_20px_rgba(255,0,255,0.3)]') : '';
    const opacity = isCurrentTurn ? 'opacity-100' : 'opacity-60';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`relative h-full bg-retro-dark/40 border-4 ${borderColor} ${shadow} rounded-xl overflow-hidden transition-all duration-300 flex flex-col`}
        >
            {isCurrentTurn && (
                <div className={`absolute top-0 inset-x-0 h-1 bg-${color} animate-pulse`} />
            )}

            <div className="p-6 flex flex-col items-center gap-4 border-b border-white/10">
                <div className={`w-24 h-24 rounded-full border-4 border-${color} bg-black overflow-hidden relative`}>
                    {/* Avatar Placeholder */}
                    <img
                        src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${avatarSeed}`}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
                <h2 className={`font-pixel text-2xl text-${color}`}>{name}</h2>
                {isCurrentTurn && <span className="font-mono text-xs bg-white/10 px-2 py-1 rounded animate-pulse">YOUR TURN</span>}
            </div>

            <div className="p-8 space-y-6 flex-1">
                <StatRow icon={<Heart className="text-red-500" />} label="LIVES" value={lives} type="lives" />
                <StatRow icon={<Shield className="text-yellow-500" />} label="STREAK" value={streak} />
                <StatRow icon={<Hash className="text-green-500" />} label="ACCURACY" value={`${accuracy}%`} />

                <div className="mt-10">
                    <p className="font-pixel text-xs mb-2 text-white/50">LEVEL PROGRESS</p>
                    <ProgressBar value={accuracy} color={`bg-${color}`} />
                </div>
            </div>
        </motion.div>
    );
};

const StatRow = ({ icon, label, value, type }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            {icon}
            <span className="font-mono text-white/70">{label}</span>
        </div>
        <div className="font-pixel text-xl">
            {type === 'lives' ? (
                <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className={`w-4 h-4 ${i < value ? 'bg-red-500' : 'bg-gray-800'} rounded-sm`} />
                    ))}
                </div>
            ) : value}
        </div>
    </div>
);

export default Multiplayer;

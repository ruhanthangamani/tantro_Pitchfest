import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArcadeButton, PixelCard } from '../components/RetroUI';
import { Brain, Zap, Upload, Users, Gamepad2, Layers } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-20 py-10 overflow-x-hidden">
            {/* Hero Section */}
            <section className="text-center relative min-h-[60vh] flex flex-col justify-center items-center">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <div className="mb-4 inline-block px-4 py-2 bg-retro-blue/10 border border-retro-blue rounded-full font-mono text-xs text-retro-blue animate-pulse">
                        NEW: AI-POWERED LEVEL GENERATION
                    </div>
                    <h1 className="text-4xl md:text-7xl font-pixel mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-retro-blue via-retro-purple to-retro-pink filter drop-shadow-[0_0_15px_rgba(0,243,255,0.3)]">
                        Education That<br />Doesn't Expire
                    </h1>
                    <p className="text-xl md:text-2xl text-white/80 font-mono mb-10 max-w-2xl mx-auto">
                        "If you can't answer, you can't move."
                    </p>

                    <div className="flex gap-4 justify-center">
                        <ArcadeButton
                            onClick={() => navigate('/dashboard')}
                            className="text-lg md:text-xl px-10 py-5 animate-pulse-glow"
                        >
                            Start Game
                        </ArcadeButton>
                        <ArcadeButton
                            variant="secondary"
                            onClick={() => navigate('/upload')}
                            className="hidden md:block text-lg px-8 py-5"
                        >
                            Upload Notes
                        </ArcadeButton>
                    </div>
                </motion.div>

                {/* Decorative Background Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-retro-blue/5 rounded-full blur-3xl -z-10" />
            </section>

            {/* How It Works */}
            <section className="relative">
                <div className="absolute -left-10 top-0 w-40 h-40 bg-retro-pink/20 blur-3xl rounded-full" />
                <h2 className="text-2xl md:text-3xl font-pixel text-center mb-12 text-white">How It Works</h2>

                <div className="grid md:grid-cols-3 gap-8 px-4">
                    <FeatureCard
                        icon={<Brain className="w-8 h-8 text-retro-pink" />}
                        title="Answer to Move"
                        desc="Solve questions to progress in the platformer game. Wrong answers cost lives!"
                        delay={0.1}
                    />
                    <FeatureCard
                        icon={<Zap className="w-8 h-8 text-retro-yellow" />}
                        title="Build Streaks"
                        desc="Maintain your daily habit. Don't break the chain or you'll lose XP."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={<Layers className="w-8 h-8 text-retro-green" />}
                        title="Level Up"
                        desc="Unlock new avatars and retro themes as you master topics."
                        delay={0.3}
                    />
                </div>
            </section>

            {/* Multiplayer Teaser */}
            <section className="grid md:grid-cols-2 gap-12 items-center px-4">
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <PixelCard className="bg-retro-dark/80 border-retro-purple shadow-[0_0_30px_rgba(188,19,254,0.15)]">
                        <div className="flex items-center justify-between border-b-2 border-retro-purple/30 pb-4 mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-retro-blue rounded-full" />
                                <span className="font-pixel text-sm">YOU</span>
                            </div>
                            <span className="font-pixel text-retro-yellow">VS</span>
                            <div className="flex items-center gap-2">
                                <span className="font-pixel text-sm">RIVAL</span>
                                <div className="w-8 h-8 bg-retro-pink rounded-full" />
                            </div>
                        </div>
                        <div className="h-32 bg-black/50 rounded flex items-center justify-center font-mono text-xs text-white/40">
                            [LIVE BATTLE SIMULATION]
                        </div>
                    </PixelCard>
                </motion.div>

                <div className="space-y-6">
                    <h2 className="text-3xl font-pixel text-retro-purple">1v1 Code Battles</h2>
                    <p className="font-mono text-lg text-white/70 leading-relaxed">
                        Challenge your friends or get matched with random developers. Answer faster to attack, maintain accuracy to defend.
                        <br /><br />
                        <span className="text-retro-purple">Winner takes all XP.</span>
                    </p>
                    <ArcadeButton variant="secondary" onClick={() => navigate('/multiplayer')}>
                        Enter Arena
                    </ArcadeButton>
                </div>
            </section>

            {/* Upload Feature */}
            <section className="grid md:grid-cols-2 gap-12 items-center px-4 bg-white/5 rounded-3xl p-8 border border-white/10">
                <div className="order-2 md:order-1 space-y-6">
                    <h2 className="text-3xl font-pixel text-retro-blue">Your Notes → My Game</h2>
                    <p className="font-mono text-lg text-white/70 leading-relaxed">
                        Upload any PDF, Textbook, or Notion export. Our AI converts your study material into 8-bit platformer levels instantly.
                    </p>
                    <ul className="space-y-2 font-mono text-sm text-white/60">
                        <li className="flex items-center gap-2">
                            <CheckIcon className="text-retro-green" /> Auto-generated quizzes
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckIcon className="text-retro-green" /> Spaced repetition built-in
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckIcon className="text-retro-green" /> Shareable level codes
                        </li>
                    </ul>
                    <ArcadeButton onClick={() => navigate('/upload')}>
                        Try Demo
                    </ArcadeButton>
                </div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="order-1 md:order-2"
                >
                    <PixelCard className="border-retro-blue bg-black/40">
                        <div className="flex flex-col gap-4 items-center py-8">
                            <Upload className="w-16 h-16 text-retro-blue" />
                            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                                <div className="bg-retro-blue w-3/4 h-full animate-pulse" />
                            </div>
                            <p className="font-pixel text-xs text-retro-blue">CONVERTING: BIOLOGY_CH4.PDF</p>
                        </div>
                    </PixelCard>
                </motion.div>
            </section>

            {/* Final CTA */}
            <section className="text-center mt-10 mb-10">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-pixel mb-6 text-white">Ready to start your streak?</h2>
                    <ArcadeButton onClick={() => navigate('/dashboard')} className="scale-125 origin-center">
                        PLAY FREE NOW
                    </ArcadeButton>
                    <p className="mt-6 text-xs font-mono text-white/40">NO CREDIT CARD REQUIRED • INSERT COIN</p>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc, delay }) => (
    <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay, duration: 0.5 }}
        viewport={{ once: true }}
    >
        <PixelCard className="h-full hover:bg-white/5 transition-colors duration-300">
            <div className="flex flex-col items-center text-center gap-4">
                <div className="p-4 bg-retro-dark rounded-full border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                    {icon}
                </div>
                <h3 className="font-pixel text-lg text-white mt-2">{title}</h3>
                <p className="text-white/60 font-mono text-sm leading-relaxed">{desc}</p>
            </div>
        </PixelCard>
    </motion.div>
);

const CheckIcon = ({ className }) => (
    <svg className={`w-4 h-4 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

export default LandingPage;

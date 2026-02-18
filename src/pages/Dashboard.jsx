import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Flame, Zap, Trophy, RefreshCw } from 'lucide-react';
import { PixelCard, ArcadeButton, ProgressBar, Modal } from '../components/RetroUI';
import PlatformerGame from '../components/PlatformerGame';

const QUESTIONS = [
    {
        id: 1,
        text: "What is the primary function of React's useState hook?",
        options: [
            { id: 'a', text: "To manage side effects" },
            { id: 'b', text: "To manage local component state" },
            { id: 'c', text: "To manage global state" },
            { id: 'd', text: "To optimize performance" }
        ],
        correct: 'b'
    },
    {
        id: 2,
        text: "Which CSS property is used to change the text color of an element?",
        options: [
            { id: 'a', text: "text-style" },
            { id: 'b', text: "fg-color" },
            { id: 'c', text: "color" },
            { id: 'd', text: "font-color" }
        ],
        correct: 'c'
    },
    {
        id: 3,
        text: "What does HTML stand for?",
        options: [
            { id: 'a', text: "Hyper Text Markup Language" },
            { id: 'b', text: "High Tech Modern Language" },
            { id: 'c', text: "Hyperlink Text Mode Logic" },
            { id: 'd', text: "Home Tool Markup Language" }
        ],
        correct: 'a'
    }
];

const Dashboard = () => {
    const [lives, setLives] = useState(3);
    const [streak, setStreak] = useState(12);
    const [xp, setXp] = useState(65);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isMoving, setIsMoving] = useState(false);
    const [gameResult, setGameResult] = useState(null); // 'win' | 'lose' | null

    const currentQuestion = QUESTIONS[currentQuestionIndex];

    const handleAnswer = (optionId) => {
        if (optionId === currentQuestion.correct) {
            // Correct
            setStreak(s => s + 1);
            setXp(x => Math.min(100, x + 15));
            setIsMoving(true);
            setTimeout(() => setIsMoving(false), 2000);
            setIsModalOpen(false);

            // Next question delay
            if (currentQuestionIndex < QUESTIONS.length - 1) {
                setTimeout(() => {
                    setCurrentQuestionIndex(prev => prev + 1);
                    setIsModalOpen(true);
                }, 3000); // Wait for animation
            } else {
                setGameResult('win');
            }

        } else {
            // Wrong
            setLives(l => {
                const newLives = l - 1;
                if (newLives <= 0) setGameResult('lose');
                return newLives;
            });
            setStreak(0);
            // Shake effect or visual feedback could go here
        }
    };

    const resetGame = () => {
        setLives(3);
        setStreak(0);
        setXp(0);
        setCurrentQuestionIndex(0);
        setGameResult(null);
        setIsModalOpen(true);
    };

    if (gameResult === 'lose') {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center text-center">
                <h1 className="text-6xl font-pixel text-red-500 mb-8 animate-pulse">GAME OVER</h1>
                <ArcadeButton onClick={resetGame}>Try Again</ArcadeButton>
            </div>
        );
    }

    if (gameResult === 'win') {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center text-center">
                <h1 className="text-6xl font-pixel text-retro-green mb-8 animate-bounce">YOU WIN!</h1>
                <p className="font-mono text-xl mb-6">All questions answered correctly.</p>
                <ArcadeButton onClick={resetGame}>Play Again</ArcadeButton>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4">
            {/* Top HUD - Mobile only or full width */}
            <div className="lg:col-span-4 flex flex-wrap gap-4 justify-between items-center bg-retro-dark/50 p-4 border-b-2 border-retro-blue/30 sticky top-16 z-20 backdrop-blur-md">
                <div className="flex gap-2">
                    {[...Array(3)].map((_, i) => (
                        <Heart
                            key={i}
                            className={`w-8 h-8 ${i < lives ? 'text-red-500 fill-red-500' : 'text-gray-700'}`}
                            style={{ filter: i < lives ? 'drop-shadow(0 0 5px red)' : 'none' }}
                        />
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <Flame className="w-6 h-6 text-orange-500 animate-pulse" />
                    <span className="font-pixel text-xl text-orange-400">{streak}</span>
                    <span className="text-xs uppercase opacity-70">Daily Streak</span>
                </div>

                <div className="w-48">
                    <ProgressBar value={xp} label="XP Level 5" />
                </div>
            </div>

            {/* Main Game Area */}
            <div className="lg:col-span-3">
                <PixelCard title="Live Challenge: Data Structures">
                    <PlatformerGame isMoving={isMoving} />
                </PixelCard>
            </div>

            {/* Side Panel */}
            <div className="lg:col-span-1 space-y-6">
                <PixelCard title="Stats">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-white/60">Questions</span>
                            <span className="font-pixel">{currentQuestionIndex}/{QUESTIONS.length}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-white/60">Accuracy</span>
                            <span className="font-pixel">92%</span>
                        </div>
                    </div>
                </PixelCard>

                <PixelCard title="Revise">
                    <div className="flex flex-col gap-2">
                        <button className="flex items-center gap-2 text-xs text-left p-2 hover:bg-white/10 rounded">
                            <RefreshCw className="w-4 h-4 text-retro-purple" />
                            React Hooks Basics
                        </button>
                        <button className="flex items-center gap-2 text-xs text-left p-2 hover:bg-white/10 rounded">
                            <RefreshCw className="w-4 h-4 text-retro-purple" />
                            CSS Flexbox
                        </button>
                    </div>
                </PixelCard>
            </div>

            {/* Question Modal */}
            <Modal isOpen={isModalOpen} title="Answer to Move" onClose={() => { }}>
                <div className="text-center">
                    <h3 className="text-lg md:text-xl font-mono mb-6 leading-relaxed">
                        {currentQuestion?.text}
                    </h3>

                    <div className="grid gap-3">
                        {currentQuestion?.options.map((opt) => (
                            <ArcadeButton
                                key={opt.id}
                                onClick={() => handleAnswer(opt.id)}
                                className="w-full text-left normal-case tracking-normal py-4"
                                variant="primary"
                            >
                                <span className="font-bold mr-3 text-retro-yellow">[{opt.id.toUpperCase()}]</span>
                                {opt.text}
                            </ArcadeButton>
                        ))}
                    </div>

                    <div className="mt-4 flex justify-center">
                        <div className="w-full h-2 bg-gray-800 rounded mt-2 overflow-hidden">
                            <motion.div
                                initial={{ width: "100%" }}
                                animate={{ width: "0%" }}
                                transition={{ duration: 15 }}
                                className="h-full bg-retro-pink"
                            />
                        </div>
                        <p className="text-xs text-retro-pink mt-1 animate-pulse">TIME REMAINING</p>
                    </div>
                </div>
            </Modal>

        </div>
    );
};

export default Dashboard;

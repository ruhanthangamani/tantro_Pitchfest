import React from 'react';
import { PixelCard } from '../components/RetroUI';
import { Trophy, TrendingUp, Target, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Analytics = () => {
    return (
        <div className="space-y-8 p-4">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-4xl font-pixel text-retro-green mb-2">Battle Reports</h1>
                    <p className="text-white/60 font-mono">Analysis of your survival performance across dimensions.</p>
                </div>

                <div className="flex gap-2">
                    <TimeFilter label="7D" active />
                    <TimeFilter label="30D" />
                    <TimeFilter label="ALL" />
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Total XP" value="12,450" icon={<Trophy className="text-yellow-500" />} />
                <StatCard label="Avg Accuracy" value="87%" icon={<Target className="text-retro-blue" />} />
                <StatCard label="Questions" value="482" icon={<TrendingUp className="text-retro-pink" />} />
                <StatCard label="Current Streak" value="12 Days" icon={<Calendar className="text-green-500" />} />
            </div>

            {/* Graphs Area */}
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <PixelCard title="XP Progression">
                        <div className="h-64 flex items-end justify-between px-4 pb-0 pt-8 gap-2 relative overflow-hidden">
                            {/* Mock Graph Bars */}
                            {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="w-full bg-retro-green/20 hover:bg-retro-green/50 border-t-2 border-retro-green relative group"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 font-pixel text-xs bg-black p-1">
                                        {h * 10}XP
                                    </div>
                                </motion.div>
                            ))}

                            {/* Grid Lines */}
                            <div className="absolute inset-0 pointer-events-none w-full h-full border-b border-l border-white/10" />
                        </div>
                        <div className="flex justify-between text-xs text-white/40 mt-2 px-2 font-mono">
                            <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                        </div>
                    </PixelCard>
                </div>

                <div className="space-y-8">
                    <PixelCard title="Weakest Topics">
                        <div className="space-y-4 pt-2">
                            <TopicBar label="CSS Grid" value={45} color="bg-red-500" />
                            <TopicBar label="React Context" value={62} color="bg-orange-500" />
                            <TopicBar label="Async/Await" value={70} color="bg-yellow-500" />
                        </div>
                    </PixelCard>

                    <PixelCard title="Leaderboard">
                        <div className="space-y-3">
                            <LeaderItem rank={1} name="CyberNinja" score={15040} />
                            <LeaderItem rank={2} name="PixelMaster" score={14200} />
                            <LeaderItem rank={3} name="CodeWarrior" score={12450} isYou />
                            <LeaderItem rank={4} name="RetroFan" score={11000} />
                        </div>
                    </PixelCard>
                </div>
            </div>
        </div>
    );
};

const TimeFilter = ({ label, active }) => (
    <button className={`px-3 py-1 text-xs font-pixel rounded ${active ? 'bg-retro-blue text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}>
        {label}
    </button>
);

const StatCard = ({ label, value, icon }) => (
    <PixelCard className="bg-white/5 border-white/10 p-4">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-white/50 text-xs uppercase mb-1">{label}</p>
                <p className="font-pixel text-lg md:text-xl text-white">{value}</p>
            </div>
            {icon}
        </div>
    </PixelCard>
);

const TopicBar = ({ label, value, color }) => (
    <div>
        <div className="flex justify-between text-xs mb-1">
            <span>{label}</span>
            <span>{value}%</span>
        </div>
        <div className="h-2 bg-black rounded-full overflow-hidden">
            <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
        </div>
    </div>
);

const LeaderItem = ({ rank, name, score, isYou }) => (
    <div className={`flex items-center justify-between text-sm ${isYou ? 'bg-white/10 -mx-2 px-2 py-1 rounded border border-white/20' : ''}`}>
        <div className="flex items-center gap-3">
            <span className={`w-5 h-5 flex items-center justify-center font-pixel text-xs ${rank === 1 ? 'text-yellow-400' : 'text-gray-400'}`}>
                {rank}
            </span>
            <span className={isYou ? 'text-retro-blue font-bold' : 'text-white/80'}>{name}</span>
        </div>
        <span className="font-mono text-white/50">{score.toLocaleString()}</span>
    </div>
);

export default Analytics;

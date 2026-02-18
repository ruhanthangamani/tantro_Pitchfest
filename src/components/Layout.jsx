import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Gamepad2, Upload, Users, BarChart2, Home } from 'lucide-react';

const Layout = () => {
    return (
        <div className="min-h-screen relative font-mono text-retro-blue selection:bg-retro-pink selection:text-white overflow-hidden">
            {/* Background with Grid */}
            <div className="fixed inset-0 z-0 bg-retro-dark">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [transform-origin:center_top] [transform:perspective(500px)_rotateX(20deg)_scale(1.5)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-retro-dark via-transparent to-transparent" />
            </div>

            {/* CRT Overlay */}
            <div className="scanlines pointer-events-none" />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-30 bg-retro-dark/80 backdrop-blur-md border-b-2 border-retro-blue/20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <Gamepad2 className="w-8 h-8 text-retro-pink animate-pulse" />
                            <span className="font-pixel text-lg bg-clip-text text-transparent bg-gradient-to-r from-retro-blue to-retro-pink">
                                RetroRevive
                            </span>
                        </div>

                        <div className="flex gap-1 md:gap-4">
                            <NavItem to="/" icon={<Home className="w-5 h-5" />} label="Home" />
                            <NavItem to="/dashboard" icon={<Gamepad2 className="w-5 h-5" />} label="Play" />
                            <NavItem to="/multiplayer" icon={<Users className="w-5 h-5" />} label="Versus" />
                            <NavItem to="/upload" icon={<Upload className="w-5 h-5" />} label="Upload" />
                            <NavItem to="/analytics" icon={<BarChart2 className="w-5 h-5" />} label="Stats" />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 pt-20 px-4 min-h-screen">
                <div className="max-w-7xl mx-auto pb-10">
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 text-center py-6 text-xs text-white/40 font-pixel">
                <p>INSERT COIN TO CONTINUE • © 2026 RETROREVIVE</p>
            </footer>
        </div>
    );
};

const NavItem = ({ to, icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) => `
      flex items-center gap-2 px-3 py-2 rounded transition-all duration-200
      ${isActive
                ? 'text-retro-pink bg-retro-pink/10 shadow-[0_0_10px_rgba(255,0,255,0.2)]'
                : 'text-retro-blue/70 hover:text-retro-blue hover:bg-retro-blue/10'}
    `}
    >
        {icon}
        <span className="hidden md:inline font-bold uppercase tracking-wider text-xs">{label}</span>
    </NavLink>
);

export default Layout;

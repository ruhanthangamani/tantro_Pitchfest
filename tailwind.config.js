/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'retro-dark': '#0f0f1a',
                'retro-blue': '#00f3ff',
                'retro-pink': '#ff00ff',
                'retro-purple': '#bc13fe',
                'retro-green': '#0aff0a',
                'retro-yellow': '#ffff00',
            },
            fontFamily: {
                'pixel': ['"Press Start 2P"', 'cursive'],
                'mono': ['"Share Tech Mono"', 'monospace'],
            },
            animation: {
                'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'pixel-bounce': 'pixel-bounce 1s steps(4) infinite',
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': { opacity: '1', filter: 'brightness(1.2)' },
                    '50%': { opacity: '0.8', filter: 'brightness(1)' },
                },
                'pixel-bounce': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-4px)' },
                }
            }
        },
    },
    plugins: [],
}

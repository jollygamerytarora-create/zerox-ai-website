import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                chart: {
                    1: 'oklch(var(--chart-1))',
                    2: 'oklch(var(--chart-2))',
                    3: 'oklch(var(--chart-3))',
                    4: 'oklch(var(--chart-4))',
                    5: 'oklch(var(--chart-5))'
                },
                sidebar: {
                    DEFAULT: 'oklch(var(--sidebar))',
                    foreground: 'oklch(var(--sidebar-foreground))',
                    primary: 'oklch(var(--sidebar-primary))',
                    'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
                    accent: 'oklch(var(--sidebar-accent))',
                    'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
                    border: 'oklch(var(--sidebar-border))',
                    ring: 'oklch(var(--sidebar-ring))'
                },
                // Zerox signature palette — Violet Nova
                zx: {
                    void: '#08050f',
                    ink: '#120a20',
                    mist: '#fdf4ff',
                    violet: '#a855f7',
                    fuchsia: '#e879f9',
                    bloom: '#f0abfc',
                    rose: '#f472b6',
                    slate: '#c4b5fd'
                },
                // Legacy neon aliases (kept so existing classes keep working)
                neon: {
                    cyan: 'oklch(0.7 0.2 195)',
                    blue: 'oklch(0.6 0.25 240)',
                    purple: 'oklch(0.65 0.22 280)',
                    pink: 'oklch(0.7 0.25 340)',
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
                xl: '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
                glow: '0 0 20px rgba(168, 85, 247, 0.35)',
                'glow-lg': '0 0 40px rgba(192, 132, 252, 0.45)',
                'glow-purple': '0 0 20px rgba(168, 85, 247, 0.3)',
                lift: '0 24px 60px -24px rgba(0, 0, 0, 0.75)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'pulse-slow': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.6' }
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'pulse-slow': 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};

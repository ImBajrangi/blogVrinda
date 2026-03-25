import React from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const Navbar = ({ onSearchOpen }) => (
    <div className="relative flex h-auto w-full flex-col bg-transparent group/design-root overflow-x-hidden" style={{ fontFamily: 'Newsreader, "Noto Sans", sans-serif' }}>
        <div className="layout-container flex h-full grow flex-col">
            <div className="px-6 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
                <div className="layout-content-container flex flex-col w-full max-w-[1200px] flex-1">
                    <header className="flex items-center justify-between h-[80px]">
                        <Link to="/" className="flex items-center gap-3 md:gap-4 text-zinc-900 dark:text-white shrink-0">
                            <div className="size-5 md:size-6 text-primary flex items-center justify-center">
                                <svg 
                                    fill="currentColor" 
                                    viewBox="0 0 48 48" 
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ width: '24px', height: '24px' }}
                                >
                                    <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"></path>
                                </svg>
                            </div>
                            <h2 className="text-zinc-900 dark:text-white text-lg md:text-2xl font-bold leading-tight tracking-[-0.015em] hover:text-primary transition-colors cursor-pointer truncate">Vrindopnishad</h2>
                        </Link>
                        <div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
                            <ThemeToggle />
                            <div className="flex items-center gap-4 md:gap-9">
                                <button onClick={onSearchOpen} className="text-zinc-500 dark:text-white/80 text-sm font-medium tracking-[0.1em] uppercase hover:text-primary transition-colors flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[20px] md:text-[18px]">search</span>
                                    <span className="hidden md:inline">[Seek]</span>
                                </button>
                                <Link to="/topics" className="text-zinc-500 dark:text-white/80 text-sm font-medium tracking-[0.1em] uppercase hover:text-primary transition-colors flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[20px] md:text-[18px]">menu</span>
                                    <span className="hidden md:inline">[Topics]</span>
                                </Link>
                            </div>
                        </div>
                    </header>
                </div>
            </div>
        </div>
    </div>
);

export default Navbar

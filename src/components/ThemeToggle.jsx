import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem('theme') === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="relative w-14 h-7 rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors duration-500 flex items-center px-1 group"
      aria-label="Toggle Theme"
    >
      <motion.div
        animate={{ x: isDark ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="size-5 rounded-full bg-white dark:bg-zinc-100 shadow-sm flex items-center justify-center overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="material-symbols-outlined text-[14px] text-zinc-900"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              dark_mode
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="material-symbols-outlined text-[14px] text-zinc-900"
            >
              light_mode
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;

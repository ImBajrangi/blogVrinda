import React from 'react';
import { motion } from 'framer-motion';

const LoadingDots = () => {
    const dotVariants = {
        animate: (i) => ({
            y: [0, -6, 0],
            opacity: [0.4, 1, 0.4],
            transition: {
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
            }
        })
    };

    return (
        <div className="flex items-center justify-center gap-2 py-10 overflow-hidden">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    custom={i}
                    variants={dotVariants}
                    animate="animate"
                    className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-white/40"
                />
            ))}
        </div>
    );
};

export default LoadingDots;

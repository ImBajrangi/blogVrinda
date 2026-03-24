import React from 'react';
import { motion } from 'framer-motion';

const LoadingDots = () => {
    const dotVariants = {
        animate: (i) => ({
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
            }
        })
    };

    return (
        <div className="flex items-center justify-center gap-4 py-20 overflow-hidden">
            {[0, 1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    custom={i}
                    variants={dotVariants}
                    animate="animate"
                    className="w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-white/30"
                />
            ))}
        </div>
    );
};

export default LoadingDots;

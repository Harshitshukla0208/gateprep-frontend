'use client';
import { Loader } from '@/components/Loader';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut"
      }}
      className="min-h-screen p-8 bg-[#0a0f1e] text-white"
    >
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: "easeOut"
        }}
        className="text-4xl font-bold bg-gradient-to-r from-[#60a5fa] via-[#818cf8] to-[#c084fc] bg-clip-text text-transparent"
      >
        Welcome to GatePrep
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: "easeOut"
        }}
        className="mt-4 text-[#93c5fd]/80"
      >
        Your journey to GATE success starts here
      </motion.p>
    </motion.div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden min-h-screen bg-[#0a0f1e]">
      <AnimatePresence initial={false}>
        {loading ? (
          <motion.div
            key="loader"
            initial={{ y: 0 }}
            exit={{ 
              y: '-100%',
              transition: {
                duration: 0.6,
                ease: "easeInOut"
              }
            }}
            className="absolute inset-0 z-50 bg-[#0a0f1e]"
          >
            <Loader />
          </motion.div>
        ) : (
          <motion.div
            key="homepage"
            initial={{ y: '100%', opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: "easeInOut"
            }}
            className="absolute inset-0 z-40"
          >
            <HomePage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
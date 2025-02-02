'use client';
import { Loader } from '@/components/Loader';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Banner from '@/components/Banner';

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut"
      }}
      className="min-h-screen p-4 md:p-8 bg-[#0a0f1e] text-white"
    >
      <Banner />
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
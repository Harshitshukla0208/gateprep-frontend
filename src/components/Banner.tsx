'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import Lottie from 'lottie-react';
import animation from '../assets/animation.json'

interface TypewriterTextProps {
    text: string;
    delay?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, delay = 0 }) => {
    const [displayText, setDisplayText] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text]);

    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay }}
            className="inline-block"
        >
            {displayText}
            {currentIndex < text.length && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-0.5 h-5 md:h-6 bg-gradient-to-r from-[#60a5fa] to-[#c084fc] ml-1"
                />
            )}
        </motion.span>
    );
};

const Banner: React.FC = () => {
    return (
        <div className="w-full min-h-[80vh] flex items-center justify-center bg-[#0a0f1e]">
            <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                
                {/* Mobile-Optimized Background Effects */}
                <div className="absolute inset-0 sm:hidden overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#60a5fa]/20 to-transparent opacity-30" />
                    <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-[#c084fc]/20 to-transparent opacity-30" />
                    <div 
                        className="absolute inset-0 bg-[#0a0f1e]"
                        style={{ 
                            maskImage: 'radial-gradient(circle at 50% 50%, transparent 20%, black 70%)',
                            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, transparent 20%, black 70%)'
                        }}
                    />
                </div>

                {/* Desktop Background Effects */}
                <div className="absolute inset-0 hidden sm:block overflow-hidden">
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e] via-[#0a0f1e]/90 to-[#0a0f1e]"
                        style={{ 
                            maskImage: 'radial-gradient(circle at center, transparent, black)',
                            WebkitMaskImage: 'radial-gradient(circle at center, transparent, black)'
                        }}
                    />
                </div>

                {/* Content Container */}
                <div className="relative z-10 flex flex-col sm:flex-row items-center">
                    {/* Text Content */}
                    <div className="text-center sm:text-left sm:flex-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center justify-center sm:justify-start space-x-2 mb-5"
                        >
                            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#60a5fa] relative animate-bounce" />
                            
                            <span className="text-lg font-medium tracking-wide sm:hidden bg-gradient-to-br from-[#60a5fa] via-[#a78bfa] to-[#c084fc] bg-clip-text text-transparent">
                                Welcome to GatePrep
                            </span>
                            <span className="hidden sm:inline-block text-base bg-gradient-to-r from-[#93c5fd] via-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
                                Welcome to GatePrep
                            </span>
                        </motion.div>

                        {/* Mobile & Desktop Headings */}
                        <motion.h1 className="text-4xl sm:text-5xl font-semibold mb-6 leading-tight tracking-tight">
                            {/* Mobile Heading */}
                            <div className="block sm:hidden">
                                <span className="bg-gradient-to-br from-[#60a5fa] via-[#818cf8] to-[#c084fc] bg-clip-text text-transparent">
                                    <TypewriterText text="Master GATE with" />
                                </span>
                                <span className="block mt-2 bg-gradient-to-br from-[#60a5fa] via-[#818cf8] to-[#c084fc] bg-clip-text text-transparent">
                                    <TypewriterText text="Confidence" delay={1.2} />
                                </span>
                            </div>
                            {/* Desktop Heading */}
                            <span className="hidden sm:inline-block bg-gradient-to-r from-[#60a5fa] via-[#818cf8] to-[#c084fc] bg-clip-text text-transparent">
                                <TypewriterText text="Master GATE with Confidence" />
                            </span>
                        </motion.h1>

                        {/* Mobile & Desktop Descriptions */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-sm sm:text-lg lg:text-xl mb-10 max-w-2xl font-normal leading-relaxed"
                        >
                            {/* Mobile Description */}
                            <span className="sm:hidden bg-gradient-to-br from-[#93c5fd] via-[#818cf8] to-[#c084fc] bg-clip-text text-transparent">
                                Learn from top educators, solve mock tests, and get expert guidance.
                            </span>
                            {/* Desktop Description */}
                            <span className="hidden sm:inline-block bg-gradient-to-r from-[#60a5fa] via-[#818cf8] to-[#c084fc] bg-clip-text text-transparent">
                                Access comprehensive study materials, practice tests, and personalized guidance to excel in your GATE preparation journey.
                            </span>
                        </motion.p>

                        {/* Single Register Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mb-5 sm:mb-0"
                        >
                            <button className="w-40 sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg bg-gradient-to-br from-[#60a5fa] via-[#818cf8] to-[#c084fc] text-white font-medium text-sm sm:text-base hover:opacity-90 transition-opacity shadow-lg shadow-[#60a5fa]/20">
                                Register
                            </button>
                        </motion.div>
                    </div>

                    {/* Animation Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="sm:flex-1 md:ml-32 w-full sm:w-auto mt-8 sm:mt-0"
                    >
                        <div className="w-48 sm:w-96 mx-auto">
                            <Lottie 
                                animationData={animation}
                                loop={true}
                                autoplay={true}
                                className="w-full h-full"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Background Glow Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Mobile Glow Effects */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        transition={{ delay: 0.8 }}
                        className="sm:hidden absolute top-10 right-0 w-40 h-40 bg-gradient-to-br from-[#60a5fa] to-[#c084fc] rounded-full filter blur-[80px] -z-10"
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        transition={{ delay: 0.9 }}
                        className="sm:hidden absolute bottom-10 left-0 w-40 h-40 bg-gradient-to-br from-[#c084fc] to-[#60a5fa] rounded-full filter blur-[80px] -z-10"
                    />
                    
                    {/* Desktop Glow Effects */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        transition={{ delay: 0.8 }}
                        className="hidden sm:block absolute -top-20 right-0 w-96 h-96 bg-gradient-to-r from-[#60a5fa] to-[#c084fc] rounded-full filter blur-[160px] -z-10"
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        transition={{ delay: 1 }}
                        className="hidden sm:block absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-r from-[#c084fc] to-[#60a5fa] rounded-full filter blur-[160px] -z-10"
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;
'use client';
import { BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Loader() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }

    return (
        <div
            className={`
                fixed inset-0 flex flex-col items-center justify-center
                transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}
                bg-[#0a0f1e] text-white
            `}
        >
            <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-r from-[#0ea5e9]/20 via-[#6366f1]/20 to-[#a855f7]/20 blur-2xl rounded-full animate-glow" />
                <div className="absolute -inset-4 bg-gradient-to-r from-[#0ea5e9]/25 to-[#6366f1]/25 blur-xl rounded-full animate-pulse" />
                <BookOpen className="w-16 h-16 text-[#60a5fa] relative animate-bounce" />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-[#60a5fa]/50 to-transparent blur-md" />
            </div>
            <h2 className="mt-8 text-3xl font-bold animate-gradient bg-gradient-to-r from-[#60a5fa] via-[#818cf8] to-[#c084fc] bg-clip-text text-transparent">
                GatePrep
            </h2>
            <p className="mt-3 text-sm text-[#93c5fd]/80">
                Your Gateway to Engineering Excellence
            </p>
            <div className="mt-8 flex space-x-2">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="w-2.5 h-2.5 rounded-full bg-[#60a5fa]/80 animate-pulse"
                        style={{
                            animationDelay: `${i * 200}ms`,
                            animationDuration: '1.5s'
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

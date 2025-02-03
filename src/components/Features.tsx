import React from 'react';
import { BookOpen, Trophy, Users } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <BookOpen className="h-10 w-10 text-[#4a5fab]" />,
      title: "GATE-like Experience",
      description: "Practice with exam patterns and questions similar to actual GATE examinations"
    },
    {
      icon: <Users className="h-10 w-10 text-[#3b4a7c]" />,
      title: "All Branches Welcome",
      description: "Dedicated sections for every engineering discipline with specialized content"
    },
    {
      icon: <Trophy className="h-10 w-10 text-[#5a6bb5]" />,
      title: "Cash Prizes",
      description: "Top 3 performers from each branch win exciting cash rewards"
    }
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-black/30 backdrop-blur-sm rounded-xl transition-all duration-300 
                          hover:scale-105 transform 
                          border border-white/10 p-6 text-center"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
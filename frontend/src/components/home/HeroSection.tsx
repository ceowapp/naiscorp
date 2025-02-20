'use client';
import React from 'react';

const HeroBanner: React.FC = () => {
  return (
    <div className="absolute w-full h-full pt-32 sm:pt-32 md:pt-32 lg:pt-40 bg-opacity-50 flex flex-col items-center justify-start">
      <div className="w-[90%] sm:w-[85%] md:w-[75%] lg:w-2/3 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#D1FBFF] via-[#6AA0FF] to-[#89FBFF] text-transparent bg-clip-text">
          Compute Future
        </h1>
        <p className="text-gray-300 mt-2 sm:mt-3 md:mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          Creating the best values of technologies in daily lives and fostering disruptive innovations
        </p>
      </div>
    </div>
  );
};

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[850px] flex items-center text-center">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="https://res.cloudinary.com/dc0pcnmqx/video/upload/v1739766621/hero-background_xjevdo.mp4" type="video/mp4" />
      </video>
      <HeroBanner /> 
    </section>
  );
};

HeroSection.displayName = 'HeroSection';

export default HeroSection;
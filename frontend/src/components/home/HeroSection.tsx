'use client';
import React from 'react';

const HeroBanner: React.FC = () => {
  return (
    <div className="absolute w-full h-full pt-32 sm:pt-32 md:pt-32 lg:pt-40 bg-opacity-50 flex flex-col items-center justify-start">
      <div className="w-full sm:w-[50%] md:w-[50%] lg:w-[60%] xl:w-[40%] px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-[#D1FBFF] via-[#6AA0FF] to-[#89FBFF] text-transparent bg-clip-text [text-shadow:0_4px_24px_0px_#040B3080]">
          Compute Future
        </h1>
        <p className="text-gray-300 mt-2 sm:mt-3 md:mt-4 text-sm sm:text-lg md:text-xl lg:text-2xl">
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
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </video>
      <HeroBanner /> 
    </section>
  );
};

HeroSection.displayName = 'HeroSection';

export default React.memo(HeroSection);
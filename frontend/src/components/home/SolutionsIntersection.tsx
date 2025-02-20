'use client';
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef, useEffect, useState } from 'react';
import { services } from '@/constants/data';
import Carousel from '../shared/Carousel';
import Image from 'next/image';

const serviceItems = services.map(service => ({
  id: service.title,
  content: (
    <div className="bg-white text-[#0A599A] rounded-lg flex flex-col items-center justify-center shadow-md p-2 sm:p-3 lg:p-4 space-y-2 sm:space-y-3 lg:space-y-4 hover:animate-bg-card-transition hover:text-white">
      <div className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14">
        <Image 
          src={service.imgSrc}
          alt={service.title}
          fill
          className="object-contain"
        />
      </div>
      <span className="text-center text-[10px] sm:text-xs lg:text-sm font-medium">
        {service.title}
      </span>
    </div>
  ),
}));

const SolutionsIntersection: React.FC = () => {
  return (
    <section className="w-full">
      <div className="w-full h-0">
        <div className="relative w-full flex items-center justify-center -translate-y-1/2 px-4">
          <div className="w-full max-w-screen-xl bg-[linear-gradient(360deg,rgba(71,185,255,0.3)_0%,rgba(136,234,175,0.09)_100%)] border-[3px] border-white backdrop-blur-2xl rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] px-3 py-5 lg:px-4 lg:py-8">
            <h2 className="text-center text-xl sm:text-2xl lg:text-3xl text-white mb-4 sm:mb-6">
              What are we doing
            </h2>
            <Carousel items={serviceItems} />
          </div>
        </div>
      </div>
    </section>
  );
};

SolutionsIntersection.displayName = 'SolutionsIntersection';

export default React.memo(SolutionsIntersection);
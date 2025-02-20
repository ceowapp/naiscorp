'use client';
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { solutions } from '@/constants/data';
import SolutionList from './SolutionList';

interface ImageFrameProps {
  videoUrl?: string;
  imageUrl: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  imagePosition?: 'left' | 'right';
  imageSize?: string;
  imageOffset?: string;
  showBlur?: boolean;
}

const ImageFrame: React.FC<ImageFrameProps> = ({
  videoUrl,
  imageUrl,
  alt,
  className,
  imageClassName,
  imagePosition = 'right',
  imageSize = '85%',
  imageOffset = '20%',
  showBlur = true,
}) => {
  return (
    <div className={cn("relative aspect-square w-full max-w-[60vh] max-h-[60vh]", className)}>
      <div className="absolute inset-0 overflow-hidden rounded-3xl shadow-xl">
        <div className="relative w-full h-full">
          {videoUrl && (
            <video 
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <div className="absolute inset-0 z-10">
            <div className="relative w-full h-full flex items-end justify-end">
              <div 
                className={cn(
                  "relative",
                  imagePosition === 'right' 
                    ? "right-[-20%]"
                    : "left-[15%]"
                )}
                style={{
                  width: imageSize,
                  height: imageSize
                }}
              >
                <div className="relative w-full pb-[100%]">
                  <Image
                    src={imageUrl}
                    alt={alt}
                    fill
                    className={cn(
                      "!relative object-contain",
                      imagePosition === 'left' && "scale-x-[-1]",
                      imageClassName
                    )}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 450px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showBlur && (
          <div className="absolute z-20 inset-0">
            <div className="absolute bg-white top-[5%] left-[5%] w-[15%] h-[15%] blur-[40px]"/>
          </div>
        )}
      </div>
    </div>
  );
};

const SolutionsSection: React.FC = () => {
  const midPoint = Math.ceil(solutions.length / 2);
  const leftSolutions = solutions.slice(0, midPoint);
  const rightSolutions = solutions.slice(midPoint);
  return (
    <section className="pt-[150px] sm:pt-[180px] md:pt-[210px] lg:pt-[240px] pb-8 sm:pb-12 md:pb-16 lg:pb-20 bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
        <div className="flex flex-col md:flex-row gap-8 sm:gap-12 lg:gap-16">
          <div className="w-full lg:flex-1 order-1 lg:order-1">
            <h2 className="text-start text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Summary of
            </h2>
            <h2 className="text-start text-3xl sm:text-4xl md:text-5xl font-bold bg-[linear-gradient(88.18deg,_#0945EB_0%,_#67D1FF_77.46%)] bg-clip-text text-transparent mb-6 sm:mb-8">
              Naiscorp's solutions
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-4">
              <SolutionList solutions={leftSolutions} offset={0} />
              <SolutionList solutions={rightSolutions} offset={midPoint} />
            </div>
          </div>
          <div className="order-2 lg:order-2 w-full lg:w-[450px] xl:w-[500px] justify-start items-start flex">
            <ImageFrame
              videoUrl="https://res.cloudinary.com/dc0pcnmqx/video/upload/v1739766621/particle-dot_jhdejl.mp4"
              imageUrl="/images/ai-robot.png"
              alt="Naiscorp Solutions"
              imagePosition="left"
              imageSize="85%"
              imageOffset="-20%"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

SolutionsSection.displayName = 'SolutionsSection';

export default React.memo(SolutionsSection);

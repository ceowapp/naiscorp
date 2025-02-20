'use client';

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface CarouselItem {
  id: string | number;
  content: React.ReactNode;
}

interface CarouselProps {
  items: CarouselItem[];
  repetitions?: number;
  responsive?: {
    breakpoint: number;
    itemsPerView: number;
    gap: number;
  }[];
  className?: string;
  itemClassName?: string;
  navigationButtons?: {
    prev?: React.ReactNode;
    next?: React.ReactNode;
  };
  isHoverEffect?: boolean;
  withSlideIndicator?: boolean;
  containerWidth?: string;
  isInfinite?: boolean;
  setHoveredIndex?: (index: number | null) => void;
  hoveredIndex?: number | null;
}

interface CachedDimensions {
  itemWidth: number;
  itemsPerView: number;
  gap: number;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  repetitions = 2,
  responsive = [
    { breakpoint: 360, itemsPerView: 1, gap: 4 },
    { breakpoint: 480, itemsPerView: 1, gap: 8 },
    { breakpoint: 640, itemsPerView: 2, gap: 8 },
    { breakpoint: 768, itemsPerView: 3, gap: 12 },
    { breakpoint: 1024, itemsPerView: 4, gap: 12 },
    { breakpoint: 1536, itemsPerView: 5, gap: 16 },
  ],
  withSlideIndicator = false,
  className = "",
  itemClassName = "",
  navigationButtons,
  isHoverEffect = false,
  isInfinite = true,
  containerWidth = "max-w-screen-xl",
  setHoveredIndex,
  hoveredIndex,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const dimensionsCacheRef = useRef<Map<number, CachedDimensions>>(new Map());
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [currentBreakpoint, setCurrentBreakpoint] = useState(responsive[0].breakpoint);
  const [dimensions, setDimensions] = useState<CachedDimensions>({
    itemWidth: 0,
    itemsPerView: responsive[0].itemsPerView,
    gap: responsive[0].gap
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const extendedItems = useMemo(() => {
    return Array(repetitions).fill(items).flat();
  }, [items, repetitions]);

  const getResponsiveConfig = useCallback((width: number) => {
    const sortedResponsive = [...responsive].sort((a, b) => a.breakpoint - b.breakpoint);
    return sortedResponsive.find((r, index) => {
      const nextBreakpoint = sortedResponsive[index + 1]?.breakpoint ?? Infinity;
      return width >= r.breakpoint && width < nextBreakpoint;
    }) || sortedResponsive[0];
  }, [responsive]);

  const calculateDimensionsForBreakpoint = useCallback((breakpoint: number, containerWidth: number) => {
    const config = getResponsiveConfig(breakpoint);
    const totalGapWidth = config.gap * (config.itemsPerView - 1);
    const itemWidth = (containerWidth - totalGapWidth) / config.itemsPerView;
    const dimensions = {
      itemWidth,
      itemsPerView: config.itemsPerView,
      gap: config.gap
    };
    return dimensions;
  }, [getResponsiveConfig]);

  const updateLayout = useCallback(() => {
    if (!carouselRef.current) return;
    const containerWidth = carouselRef.current.offsetWidth;
    const screenWidth = window.innerWidth;
    const config = getResponsiveConfig(screenWidth);
    setCurrentBreakpoint(config.breakpoint);
    const newDimensions = calculateDimensionsForBreakpoint(config.breakpoint, containerWidth);
    setDimensions(newDimensions);
    if (!isInitialized) {
      if (isInfinite) {
        const initialScrollPosition = newDimensions.itemWidth * items.length;
        carouselRef.current.scrollLeft = initialScrollPosition;
      }
      setIsInitialized(true);
    } 
  }, [getResponsiveConfig, calculateDimensionsForBreakpoint, items.length, isInfinite, isInitialized, dimensions]);

  useEffect(() => {
    updateLayout();
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateLayout, 150);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    if (!carouselRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === carouselRef.current) {
          updateLayout();
        }
      }
    });
    resizeObserver.observe(carouselRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    let startX: number;
    let scrollLeft: number;
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const x = e.touches[0].pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    };
    carousel.addEventListener('touchstart', handleTouchStart);
    carousel.addEventListener('touchmove', handleTouchMove);
    return () => {
      carousel.removeEventListener('touchstart', handleTouchStart);
      carousel.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleScroll = useCallback(() => {
    if (!carouselRef.current || !isInitialized) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const containerWidth = carouselRef.current.offsetWidth;
    const scrollWidth = carouselRef.current.scrollWidth;
  }, [dimensions, items.length, isInfinite, repetitions, isInitialized]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!carouselRef.current || !isInitialized) return;
    const containerWidth = carouselRef.current.offsetWidth;
    const itemTotalWidth = dimensions.itemWidth + dimensions.gap;
    const visibleItems = Math.floor(containerWidth / itemTotalWidth);
    const itemsToScroll = Math.max(1, Math.floor(visibleItems / 2));
    const scrollAmount = itemTotalWidth * itemsToScroll;
    const currentScroll = carouselRef.current.scrollLeft;
    const newScrollLeft = currentScroll + (direction === 'left' ? -scrollAmount : scrollAmount);
    carouselRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  }, [dimensions, items.length, isInfinite, repetitions, isInitialized]);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <motion.div className="relative flex items-center w-full">
        {(isInfinite || !isAtStart) && isInitialized && (
          <button
            onClick={() => scroll('left')}
            className="absolute z-20 bg-[#7A73FF] rounded-full shadow-lg transition-colors hover:bg-[#6963FF] p-1 left-0 sm:left-2"
            aria-label="Previous slides"
          >
            {navigationButtons?.prev || (
              <ChevronLeft className="w-4 h-4 text-white" />
            )}
          </button>
        )}
        <div
          ref={carouselRef}
          className="flex scroll-smooth justify-start items-center w-full overflow-x-auto no-scrollbar mx-6 sm:mx-10"
          style={{ 
              gap: `${dimensions.gap}px`,
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              visibility: isInitialized ? 'visible' : 'hidden',
              WebkitOverflowScrolling: 'touch'
          }}
          onScroll={handleScroll}
        >
          {extendedItems.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              className={`flex-none scroll-snap-align-start ${itemClassName}`}
              style={{
                width: `${dimensions.itemWidth}px`,
                minWidth: `${dimensions.itemWidth}px`,
                opacity: isInitialized ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
              }}
            >
              {item.content}
            </motion.div>
          ))}
        </div>

        {(isInfinite || !isAtEnd) && isInitialized && (
          <button
            onClick={() => scroll('right')}
            className="absolute z-20 bg-[#7A73FF] rounded-full shadow-lg transition-colors hover:bg-[#6963FF] right-0 sm:right-2 p-1"
            aria-label="Next slides"
          >
            {navigationButtons?.next || (
              <ChevronRight className="w-4 h-4 text-white" />
            )}
          </button>
        )}
      </motion.div>
      {withSlideIndicator && isInitialized && (
        <div className="flex items-center gap-2 mt-1 overflow-x-auto no-scrollbar">
          {items.map((_, index) => (
            <div
              key={index}
              className={`transition-all duration-300 rounded-full flex-shrink-0
                ${index === activeIndex 
                  ? 'w-8 sm:w-12 h-[7px] bg-[#7A73FF]' 
                  : 'w-1 h-[7px] bg-gray-300'
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;



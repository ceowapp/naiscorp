'use client';

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from '@/lib/utils';

interface ScreenConfig {
  breakpoint: number;
  itemsPerView: number;
  gap: number;
  containerWidthPercent: number;
  expandedWidthPercent: number;
}

interface CalculatedConfig {
  breakpoint: number;
  itemWidth: number;
  expandedWidth: number;
  itemsPerView: number;
  gap: number;
  containerWidth: string;
}

interface CarouselItem {
  id: string | number;
  content: React.ReactNode;
}

interface CarouselProps {
  items: CarouselItem[];
  repetitions?: number;
  className?: string;
  itemClassName?: string;
  navigationButtons?: {
    prev?: React.ReactNode;
    next?: React.ReactNode;
  };
  isHoverEffect?: boolean;
  withSlideIndicator?: boolean;
  isInfinite?: boolean;
  setHoveredIndex?: (index: number | null) => void;
  hoveredIndex?: number | null;
}

const baseScreenConfigs: ScreenConfig[] = [
  {
    breakpoint: 360,
    itemsPerView: 1,
    gap: 8,
    containerWidthPercent: 100,
    expandedWidthPercent: 105
  },
  {
    breakpoint: 480,
    itemsPerView: 1,
    gap: 8,
    containerWidthPercent: 72,
    expandedWidthPercent: 160
  },
  {
    breakpoint: 640,
    itemsPerView: 2,
    gap: 8,
    containerWidthPercent: 72,
    expandedWidthPercent: 180
  },
  {
    breakpoint: 768,
    itemsPerView: 2,
    gap: 8,
    containerWidthPercent: 72,
    expandedWidthPercent: 180
  },
  {
    breakpoint: 1024,
    itemsPerView: 3,
    gap: 8,
    containerWidthPercent: 72,
    expandedWidthPercent: 180
  },
  {
    breakpoint: 1280,
    itemsPerView: 4,
    gap: 8,
    containerWidthPercent: 72,
    expandedWidthPercent: 180
  },
  {
    breakpoint: 1536,
    itemsPerView: 4,
    gap: 8,
    containerWidthPercent: 72,
    expandedWidthPercent: 180
  }
];

export const Carousel: React.FC<CarouselProps> = ({
  items,
  repetitions = 2,
  className = "",
  itemClassName = "",
  navigationButtons,
  isHoverEffect = false,
  withSlideIndicator = false,
  isInfinite = true,
  setHoveredIndex,
  hoveredIndex,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [currentConfig, setCurrentConfig] = useState<CalculatedConfig>();

  const extendedItems = useMemo(() => {
    return Array(repetitions).fill(items).flat();
  }, [items, repetitions]);

  const calculateScreenConfig = useCallback((screenWidth: number, baseConfig: ScreenConfig): CalculatedConfig => {
    const containerWidth = (screenWidth * baseConfig.containerWidthPercent) / 100;
    const totalGapWidth = baseConfig.gap * (baseConfig.itemsPerView - 1);
    const itemWidth = Math.floor(
      (containerWidth - totalGapWidth - 160) / baseConfig.itemsPerView
    );
    let expandedWidth;
    if (baseConfig.expandedWidthPercent < 0) {
      expandedWidth = Math.floor(itemWidth * (1 - Math.abs(baseConfig.expandedWidthPercent) / 100));
    } else {
      expandedWidth = Math.floor((itemWidth * baseConfig.expandedWidthPercent) / 100);
    }
    return {
      breakpoint: baseConfig.breakpoint,
      itemWidth,
      expandedWidth,
      itemsPerView: baseConfig.itemsPerView,
      gap: baseConfig.gap,
      containerWidth: `${baseConfig.containerWidthPercent}%`
    };
  }, []);

  const getCurrentScreenConfig = useCallback(() => {
    const screenWidth = window.innerWidth;
    const baseConfig = baseScreenConfigs.reduce((acc, config) => {
      return screenWidth >= config.breakpoint ? config : acc;
    }, baseScreenConfigs[0]);
    return calculateScreenConfig(screenWidth, baseConfig);
  }, [calculateScreenConfig]);

  const updateLayout = useCallback(() => {
    const newConfig = getCurrentScreenConfig();
    setCurrentConfig(newConfig);
  }, [getCurrentScreenConfig]);

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
  }, [updateLayout]);

  const handleScroll = useCallback(() => {
    if (!carouselRef.current || !currentConfig) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const { itemWidth, gap } = currentConfig;
    const itemTotalWidth = itemWidth + gap;
    const maxScroll = scrollWidth - clientWidth;
    setIsAtStart(scrollLeft <= 0);
    setIsAtEnd(scrollLeft >= maxScroll - 1);
    const rawIndex = Math.round(scrollLeft / itemTotalWidth);
    const activeItemIndex = rawIndex % items.length;
    setActiveIndex(activeItemIndex);
  }, [currentConfig, items.length]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!carouselRef.current || !currentConfig) return;
    const { itemWidth, gap, itemsPerView } = currentConfig;
    const itemTotalWidth = itemWidth + gap;
    const scrollAmount = itemTotalWidth * Math.max(1, Math.floor(itemsPerView / 2));
    const carousel = carouselRef.current;
    const currentScroll = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    let newScrollPosition = direction === 'left' 
      ? currentScroll - scrollAmount 
      : currentScroll + scrollAmount;
    if (isInfinite) {
      if (direction === 'left' && currentScroll <= 0) {
        newScrollPosition = maxScroll - scrollAmount;
      } else if (direction === 'right' && currentScroll >= maxScroll) {
        newScrollPosition = 0;
      }
    }
    carousel.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    });
  }, [currentConfig, isInfinite]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    let startX: number;
    let startScrollLeft: number;
    let isDragging = false;
    const handleDragStart = (clientX: number) => {
      isDragging = true;
      startX = clientX;
      startScrollLeft = carousel.scrollLeft;
      carousel.style.cursor = 'grabbing';
      carousel.style.userSelect = 'none';
    };
    const handleDragMove = (clientX: number) => {
      if (!isDragging) return;
      const dx = startX - clientX;
      carousel.scrollLeft = startScrollLeft + dx;
    };
    const handleDragEnd = () => {
      isDragging = false;
      carousel.style.cursor = '';
      carousel.style.userSelect = '';
    };
    const handleTouchStart = (e: TouchEvent) => handleDragStart(e.touches[0].clientX);
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      handleDragMove(e.touches[0].clientX);
    };
    const handleTouchEnd = () => handleDragEnd();
    const handleMouseDown = (e: MouseEvent) => handleDragStart(e.clientX);
    const handleMouseMove = (e: MouseEvent) => handleDragMove(e.clientX);
    const handleMouseUp = () => handleDragEnd();
    carousel.addEventListener('touchstart', handleTouchStart);
    carousel.addEventListener('touchmove', handleTouchMove);
    carousel.addEventListener('touchend', handleTouchEnd);
    carousel.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    carousel.addEventListener('scroll', handleScroll);
    return () => {
      carousel.removeEventListener('touchstart', handleTouchStart);
      carousel.removeEventListener('touchmove', handleTouchMove);
      carousel.removeEventListener('touchend', handleTouchEnd);
      carousel.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      carousel.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const getItemStyle = useCallback((index: number) => {
    if (!currentConfig) return {};
    const normalizedIndex = index % items.length;
    const isHovered = hoveredIndex !== null && (hoveredIndex % items.length) === normalizedIndex;
    const { itemWidth, expandedWidth } = currentConfig;
    return {
      width: isHovered && isHoverEffect ? `${expandedWidth}px` : `${itemWidth}px`,
      minWidth: isHovered && isHoverEffect ? `${expandedWidth}px` : `${itemWidth}px`,
      transition: 'all 0.3s ease-in-out',
      zIndex: isHovered ? 10 : 1,
      position: 'relative' as const,
    };
  }, [currentConfig, hoveredIndex, isHoverEffect, items.length]);

  const getContainerStyle = () => {
    if (!currentConfig || !isHoverEffect || hoveredIndex === null) {
      return {
        width: currentConfig?.containerWidth,
        willChange: 'transform',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      };
    }
    const { itemWidth, expandedWidth } = currentConfig;
    const extentedWidth = expandedWidth - itemWidth;
    return {
      width: `calc(${currentConfig.containerWidth} + ${extentedWidth}px)`,
      willChange: 'transform',
      transformOrigin: 'center',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  if (!currentConfig) return null;

  return (
    <div 
      style={getContainerStyle()}
      className={cn("flex flex-col items-center gap-4 w-full overflow-visible", className)}
    >
      <div className="relative w-full max-w-7xl mx-auto flex items-center gap-8">
        <div className="flex-none">
          {(isInfinite || !isAtStart) && (
            <button
              onClick={() => scroll('left')}
              className={cn(
                "bg-[#7A73FF] rounded-full shadow-lg transition-all hover:bg-[#6963FF]",
                "p-2"
              )}
              aria-label="Previous slides"
            >
              {navigationButtons?.prev || (
                <ChevronLeft className="w-4 h-4 text-white" />
              )}
            </button>
          )}
        </div>
        <div
          ref={carouselRef}
          className="flex scroll-smooth w-full overflow-x-auto no-scrollbar"
          style={{ 
            gap: `${currentConfig.gap}px`,
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch'
          }}
          onScroll={handleScroll}
        >
          {extendedItems.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              className={cn(
                "flex-none shrink-0 scroll-snap-align-start",
                itemClassName
              )}
              style={getItemStyle(index)}
              onMouseEnter={() => {
                isHoverEffect && setHoveredIndex?.(index % items.length);
              }}
              onMouseLeave={() => {
                isHoverEffect && setHoveredIndex?.(null);
              }}
            >
              {item.content}
            </motion.div>
          ))}
        </div>
        <div className="flex-none">
          {(isInfinite || !isAtEnd) && (
            <button
              onClick={() => scroll('right')}
              className={cn(
                "bg-[#7A73FF] rounded-full shadow-lg transition-all hover:bg-[#6963FF]",
                "p-2"
              )}
              aria-label="Next slides"
            >
              {navigationButtons?.next || (
                <ChevronRight className="w-4 h-4 text-white" />
              )}
            </button>
          )}
        </div>
      </div>
      {withSlideIndicator && (
        <div className="flex items-center gap-2 mt-4">
          {items.map((_, index) => (
            <div
              key={index}
              className={`transition-all duration-300 rounded-full
                ${index === activeIndex 
                  ? 'w-12 h-[7px] bg-[#7A73FF]' 
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
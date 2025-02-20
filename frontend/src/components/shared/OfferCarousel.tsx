'use client';

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from '@/lib/utils';

interface ScreenConfig {
  breakpoint: number;
  itemWidth: number;
  expandedWidth: number;
  itemsPerView: number;
  gap: number;
}

const screenConfigs: ScreenConfig[] = [
  {
    breakpoint: 480,
    itemWidth: 300,
    expandedWidth: 500,
    itemsPerView: 1,
    gap: 1
  },
  {
    breakpoint: 640,
    itemWidth: 300,
    expandedWidth: 530,
    itemsPerView: 1,
    gap: 8
  },
  {
    breakpoint: 768,
    itemWidth: 275,
    expandedWidth: 450,
    itemsPerView: 2,
    gap: 8
  },
  {
    breakpoint: 1024,
    itemWidth: 220,
    expandedWidth: 390,
    itemsPerView: 3,
    gap: 8
  },
  {
    breakpoint: 1280,
    itemWidth: 250,
    expandedWidth: 445,
    itemsPerView: 3,
    gap: 8
  },
  {
    breakpoint: 1536,
    itemWidth: 225,
    expandedWidth: 400,
    itemsPerView: 4,
    gap: 8
  }
];

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

interface ItemDimensions {
  width: number;
  scaledWidth: number;
  gap: number;
  itemsPerView: number;
}

const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const Carousel: React.FC<CarouselProps> = ({
  items,
  repetitions = 3,
  className = "",
  itemClassName = "",
  navigationButtons,
  isHoverEffect = false,
  withSlideIndicator = false,
  containerWidth = "max-w-screen-2xl",
  isInfinite = true,
  setHoveredIndex,
  hoveredIndex,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [currentConfig, setCurrentConfig] = useState<ScreenConfig>(screenConfigs[0]);
  const [isInitialized, setIsInitialized] = useState(false);

  const extendedItems = useMemo(() => {
    return Array(repetitions).fill(items).flat();
  }, [items, repetitions]);

  const getCurrentScreenConfig = useCallback(() => {
    const width = window.innerWidth;
    return screenConfigs.reduce((acc, config) => {
      return width >= config.breakpoint ? config : acc;
    }, screenConfigs[0]);
  }, []);

  const updateLayout = useCallback(() => {
    const newConfig = getCurrentScreenConfig();
    setCurrentConfig(newConfig);
    if (!isInitialized && carouselRef.current && isInfinite) {
      const initialScrollPosition = 0;
      carouselRef.current.scrollLeft = initialScrollPosition;
      setIsInitialized(true);
    }
  }, [getCurrentScreenConfig, isInfinite, items.length, isInitialized]);

  useEffect(() => {
    updateLayout();
    const debouncedResize = debounce(updateLayout, 150);
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, [updateLayout]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    let startX: number;
    let startScrollLeft: number;
    let isDragging = false;
    let startTime: number;
    let lastX: number;
    let velocity: number;
    const handleDragStart = (clientX: number) => {
      isDragging = true;
      startX = clientX;
      lastX = clientX;
      startScrollLeft = carousel.scrollLeft;
      startTime = Date.now();
      velocity = 0;
      carousel.style.cursor = 'grabbing';
      carousel.style.userSelect = 'none';
    };

    const handleDragMove = (clientX: number) => {
      if (!isDragging) return;
      const dx = clientX - lastX;
      const timeDelta = Date.now() - startTime;
      velocity = dx / timeDelta;
      carousel.scrollLeft = startScrollLeft - (clientX - startX);
      lastX = clientX;
      startTime = Date.now();
    };

    const handleDragEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      carousel.style.cursor = '';
      carousel.style.userSelect = '';
      if (Math.abs(velocity) > 0.5) {
        const momentum = velocity * 200;
        carousel.scrollBy({
          left: -momentum,
          behavior: 'smooth'
        });
      }
    };
    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      handleDragStart(e.clientX);
    };
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      handleDragMove(e.clientX);
    };
    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      handleDragEnd();
    };
    const handleTouchStart = (e: TouchEvent) => {
      handleDragStart(e.touches[0].clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      handleDragMove(e.touches[0].clientX);
    };
    const handleTouchEnd = () => {
      handleDragEnd();
    };
    carousel.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    carousel.addEventListener('touchstart', handleTouchStart);
    carousel.addEventListener('touchmove', handleTouchMove);
    carousel.addEventListener('touchend', handleTouchEnd);
    return () => {
      carousel.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      carousel.removeEventListener('touchstart', handleTouchStart);
      carousel.removeEventListener('touchmove', handleTouchMove);
      carousel.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleScroll = useCallback(() => {
    if (!carouselRef.current || !isInitialized) return;
    const carousel = carouselRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = carousel;
    const { itemWidth, gap } = currentConfig;
    const itemTotalWidth = itemWidth + gap;
    const maxScroll = scrollWidth - clientWidth;
    const progress = scrollLeft / maxScroll;
    setIsAtStart(scrollLeft <= 0);
    setIsAtEnd(scrollLeft >= maxScroll - 1);
    const rawIndex = Math.round(scrollLeft / itemTotalWidth);
    const activeItemIndex = rawIndex % items.length;
    setActiveIndex(activeItemIndex);
  }, [currentConfig, items.length, isInitialized, isInfinite]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!carouselRef.current || !isInitialized) return;
    const { itemWidth, gap, itemsPerView } = currentConfig;
    const itemTotalWidth = itemWidth + gap;
    const scrollAmount = itemTotalWidth * Math.floor(itemsPerView / 2);
    const currentScroll = carouselRef.current.scrollLeft;
    const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
    const newScrollPosition = direction === 'left' 
      ? currentScroll - scrollAmount 
      : currentScroll + scrollAmount;
    carouselRef.current.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    });
  }, [currentConfig, isInitialized, isInfinite]);

  const getItemStyle = useCallback((index: number) => {
    const normalizedIndex = index % items.length;
    const isHovered = hoveredIndex !== null && (hoveredIndex % items.length) === normalizedIndex;
    const { itemWidth, expandedWidth } = currentConfig;

    return {
      width: isHovered && isHoverEffect ? `${expandedWidth}px` : `${itemWidth}px`,
      minWidth: isHovered && isHoverEffect ? `${expandedWidth}px` : `${itemWidth}px`,
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: isHovered ? 10 : 1,
      position: isHovered ? 'relative' : 'static',
    };
  }, [currentConfig, hoveredIndex, isHoverEffect, items.length]);

  const getContainerStyle = () => {
    if (!isHoverEffect || hoveredIndex === null) {
      return {
        width: '72%',
        willChange: 'transform',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      };
    }
    const { itemWidth, expandedWidth } = currentConfig;
    const extentedWidth = expandedWidth - itemWidth;
    return {
      width: `calc(72% + ${extentedWidth}px)`,
      willChange: 'transform',
      transformOrigin: 'center',
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);


  return (
    <div 
      style={getContainerStyle()}
      className="flex flex-col items-center gap-4 w-full overflow-visible"
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
            visibility: isInitialized ? 'visible' : 'hidden',
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

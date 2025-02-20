'use client';

import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { offers } from '@/constants/data';
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { cn } from '@/lib/utils';
import Carousel from '../shared/OfferCarousel';

const OfferHeader = () => {
  return (
    <div className="flex items-center justify-center mb-6 sm:mb-6 px-4">
      <div className="w-full sm:max-w-2xl lg:max-w-3xl">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-6">
            What can we <span className="bg-gradient-to-r from-[#0945EB] to-[#67D1FF] bg-clip-text text-transparent">Offer?</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#6D6D6D]">
            Providing customers with high quality products...
          </p>
        </div>
      </div>
    </div>
  );
};

interface OfferData {
  title: string;
  description: string;
  color: string;
  image: string;
  chipGroups: string[][];
  chipPositions: {
    [key: number]: Array<{
      start: { x: number; y: number };
      end: { x: number; y: number };
    }>;
  };
}

const OfferCard: React.FC<{ offer: OfferData; isHovered: boolean }> = ({ offer, isHovered }) => {
  const chipRefs = useRef<(HTMLDivElement | null)[][]>([]);
  const [chipDimensions, setChipDimensions] = useState<Array<Array<{ width: number; height: number }>>>([]);

  useEffect(() => {
    const newDimensions = offer.chipGroups.map((group, groupIndex) => {
      return group.map((_, chipIndex) => {
        const ref = chipRefs.current[groupIndex]?.[chipIndex];
        return {
          width: ref?.offsetWidth || 0,
          height: ref?.offsetHeight || 0
        };
      });
    });
    setChipDimensions(newDimensions);
  }, [offer.chipGroups]);

  useEffect(() => {
    chipRefs.current = offer.chipGroups.map(group => new Array(group.length).fill(null));
  }, [offer.chipGroups]);

  const getChipTransition = useCallback((groupIndex: number, chipIndex: number) => {
    const groupDuration = 0.8;
    const delay = groupIndex === 0 ? 0 : groupDuration * 0.2;
    const transition = {
      x: {
        type: "tween",
        duration: groupDuration,
        ease: [0.4, 0, 0.2, 1],
        delay: isHovered 
          ? delay 
          : (groupIndex === 0 ? groupDuration * 0.2 : 0)
      },
      y: {
        type: "tween",
        duration: groupDuration,
        ease: [0.4, 0, 0.2, 1],
        delay: isHovered 
          ? delay 
          : (groupIndex === 0 ? groupDuration * 0.2 : 0)
      }
    };
    return transition;
  }, [isHovered]);

  const calculateGroupPosition = useCallback((
    group: (string | string[])[],
    groupIndex: number,
    chipIndex: number,
    dimensions: Array<Array<{ width: number; height: number }>>
  ) => {
    const VERTICAL_GAP = 40;
    const HORIZONTAL_GAP = 12;
    const GROUP_VERTICAL_OFFSET = 40;
    let startY = 0;
    for (let i = 0; i < groupIndex; i++) {
      startY += (offer.chipGroups[i].length) * VERTICAL_GAP;
    }
    startY += chipIndex * VERTICAL_GAP;
    let endX = 0;
    for (let i = 0; i < chipIndex; i++) {
      const prevDimension = dimensions[groupIndex]?.[i];
      if (prevDimension) {
        endX += prevDimension.width + HORIZONTAL_GAP;
      }
    }
    return {
      start: { x: 0, y: startY },
      end: { x: endX, y: groupIndex * GROUP_VERTICAL_OFFSET + 80 }
    };
  }, [offer.chipGroups]);
 
  return (
    <motion.div
      className={cn(
        "relative rounded-lg flex w-full overflow-hidden flex-col items-start justify-start shadow-md h-[450px]",
        "p-8 xs:p-4 sm:p-4 md:p-4 lg:p-4 xl:p-5"
      )}
      style={{ backgroundColor: offer.color }}
      animate={{ opacity: isHovered ? 1 : 0.8 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${offer.image})`,
          backgroundPosition: '150% 110%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'clamp(150px, 30%, 250px)',
        }}
        animate={{ 
          opacity: isHovered ? 0.7 : 1,
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ 
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1]
        }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <h3 className={cn(
          "text-[#0A2540] font-semibold mb-2",
          "w-[180px] xs:w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px]",
          "text-base xs:text-base sm:text-md xl:text-md"
        )}>
          {offer.title}
        </h3>
        <div className="flex flex-col flex-grow">
          <AnimatePresence mode="wait">
            {isHovered && (
              <motion.div
                className="absolute flex flex-col gap-4 pb-2 z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                  delay: 0.2
                }}
              >
                <motion.p
                  className={cn(
                    "text-[#6D6D6D] line-clamp-3 text-clip",
                    "text-xs xs:text-sm sm:text-base md:text-sm",
                    "xl:w-[400px] lg:w-[400px] md:w-[400px] sm:w-[300px] w-[400px]"
                  )}
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                  }}
                >
                  {offer.description}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <div className="relative max-h-full z-50">
              {offer.chipGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="absolute w-full">
                  {group.map((chip, chipIndex) => {
                    const groupPosition = calculateGroupPosition(group, groupIndex, chipIndex, chipDimensions);

                    if (Array.isArray(chip)) {
                      return (
                        <motion.div
                          key={`group-${groupIndex}-${chipIndex}`}
                          className="absolute flex gap-1"
                          initial={false}
                          animate={{
                            x: isHovered ? groupPosition.end.x : groupPosition.start.x,
                            y: isHovered ? groupPosition.end.y : groupPosition.start.y,
                            scale: isHovered ? 1.05 : 1,
                          }}
                          transition={getChipTransition(groupIndex, chipIndex)}
                        >
                          {chip.map((subChip, subIndex) => (
                            <div
                              key={`${groupIndex}-${chipIndex}-${subIndex}`}
                              ref={el => {
                                if (!chipRefs.current[groupIndex]) {
                                  chipRefs.current[groupIndex] = [];
                                }
                                if (!chipRefs.current[groupIndex][chipIndex]) {
                                  chipRefs.current[groupIndex][chipIndex] = [];
                                }
                                chipRefs.current[groupIndex][chipIndex][subIndex] = el;
                              }}
                              className="inline-flex px-3 py-1 text-xs sm:text-sm rounded-full bg-white border border-[#00D4FF] text-[#6D6D6D] whitespace-nowrap"
                            >
                              {subChip}
                            </div>
                          ))}
                        </motion.div>
                      );
                    }
                    return (
                      <motion.div
                        key={`${groupIndex}-${chipIndex}`}
                        ref={el => {
                          if (!chipRefs.current[groupIndex]) {
                            chipRefs.current[groupIndex] = [];
                          }
                          chipRefs.current[groupIndex][chipIndex] = el;
                        }}
                        className="absolute inline-flex px-3 py-1 text-xs sm:text-sm rounded-full bg-white border border-[#00D4FF] text-[#6D6D6D] whitespace-nowrap"
                        initial={false}
                        animate={{
                          x: isHovered ? groupPosition.end.x : groupPosition.start.x,
                          y: isHovered ? groupPosition.end.y : groupPosition.start.y,
                          scale: isHovered ? 1.05 : 1,
                        }}
                        transition={getChipTransition(groupIndex, chipIndex)}
                        whileHover={{ scale: isHovered ? 1.1 : 1 }}
                      >
                        {chip}
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </div>
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait">
          {isHovered && (
            <motion.button
              className={cn(
                "bg-violet-500 rounded-full text-white flex items-center justify-center gap-2",
                "hover:bg-violet-600 transition-colors mt-auto",
                "w-24 h-8 xs:w-28 xs:h-9 sm:w-32 sm:h-10 md:w-36 md:h-11"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ 
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
                delay: 0.4
              }}
            >
              <span className="text-sm xs:text-base">Read</span>
              <ArrowRight className="w-3 h-3 xs:w-4 xs:h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const OffersSection: React.FC<> = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const extendedFeatures = offers.map((offer, index) => ({
    id: offer.title,
    content: (
      <OfferCard
        offer={offer}
        isHovered={hoveredIndex === index}
      />
    ),
  }));
  return (
    <section className="w-full m-0 p-0">
      <div className="relative flex flex-col items-center justify-center bg-white p-4 sm:p-0 overflow-hidden">
        <OfferHeader />
        <Carousel 
          items={extendedFeatures}
          navigationButtons={{
            prev: <ArrowLeft className="w-4 h-4 text-white" />,
            next: <ArrowRight className="w-4 h-4 text-white" />,
          }}
          setHoveredIndex={setHoveredIndex}
          hoveredIndex={hoveredIndex}
          withSlideIndicator
          isHoverEffect
        />
      </div>
    </section>
  );
};

OffersSection.displayName = 'OffersSection';

export default React.memo(OffersSection);
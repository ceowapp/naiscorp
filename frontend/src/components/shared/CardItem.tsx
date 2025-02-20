import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CardItemProps {
  title: string;
  image: string;
  imageClassName?: string;
  insetStyle?: React.CSSProperties;
  imageStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  descriptionStyle?: React.CSSProperties;
  description?: string;
  className?: string;
  imageWidth?: number;
  imageHeight?: number;
  onClick?: () => void;
}

const CardItem: React.FC<CardItemProps> = ({
  title,
  image,
  description,
  insetStyle,
  imageStyle,
  imageClassName,
  titleStyle,
  descriptionStyle,
  className,
  imageWidth = 300,
  imageHeight = 300,
  onClick,
}) => {
  return (
    <div 
      className={cn(
        `w-full max-w-[320px] sm:max-w-sm rounded-3xl hover:shadow-xl transition-all duration-300 relative overflow-hidden cursor-pointer`,
        className
      )}
      onClick={onClick}
    >
      {insetStyle && (
        <div 
          className="absolute inset-0 rounded-2xl"
          style={insetStyle}
        />
      )}
      <div className="relative w-full h-full p-3 sm:p-4 flex flex-col">
        <div 
          className="relative w-full overflow-hidden"
          className={cn(
            "relative w-full overflow-hidden",
            imageClassName
          )}
          style={imageStyle}
        >
          <Image
            src={image}
            alt={title}
            width={imageWidth}
            height={imageHeight}
            className={cn(
              "transition-transform duration-300",
              !insetStyle ? "w-full h-full object-cover rounded-2xl" : "",
              "hover:scale-105"
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority
          />
        </div>
        <div 
          className={cn(
            "flex flex-col flex-grow",
            insetStyle 
              ? "mt-[150px] sm:mt-[130px] md:mt-[150px] lg:mt-[160px]" 
              : "mt-3 sm:mt-4 md:mt-5 lg:mt-6"
          )}
        >
          <h3 
            className="font-semibold mb-6 line-clamp-2" 
            style={titleStyle}
          >
            {title}
          </h3>
          {description && (
            <p 
              className="line-clamp-3" 
              style={descriptionStyle}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardItem;

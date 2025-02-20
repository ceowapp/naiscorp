import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BaseItem {
  text: string;
  href?: string;
}

interface ContactItem extends BaseItem {
  icon?: string;
  name?: string;
}

interface FooterColumnProps {
  title: string;
  subtitle?: string;
  items: ContactItem[];
  isLink?: boolean;
  isContact?: boolean;
  className?: string;
  itemClassName?: string;
}

const FooterColumn: React.FC<FooterColumnProps> = ({
  title,
  subtitle,
  items,
  isLink = false,
  isContact = false,
  className,
  itemClassName,
}) => {
  return (
    <div 
      className={cn(
        "flex flex-col justify-start items-start w-full",
        "px-0 sm:px-0 lg:px-0",
        className
      )}
    >
      {title && (
        <h3 className="font-light text-[#D1D1D1] mb-3 sm:mb-4 
          text-base sm:text-lg md:text-xl lg:text-2xl">
          {title}
        </h3>
      )}
      {subtitle && (
        <p className="text-[#D1D1D1] mb-3 sm:mb-4 leading-relaxed 
          text-xs sm:text-sm md:text-base lg:text-lg">
          {subtitle}
        </p>
      )}
      <ul className="space-y-2 sm:space-y-3 w-full">
        {items.map((item, index) => (
          <li
            key={index}
            className={cn(
              "text-xs sm:text-sm md:text-base lg:text-lg transition-colors duration-200",
              isContact && "text-[#D1D1D1]",
              !isContact && !item.href && "text-cyan-500 cursor-pointer hover:text-cyan-400",
              !isContact && item.href && "text-white font-semibold hover:text-gray-300",
              itemClassName
            )}
          >
            {isLink && item.href ? (
              <Link 
                href={item.href} 
                className="hover:text-gray-300 transition-colors duration-200"
              >
                {item.text}
              </Link>
            ) : (
              <div className="flex items-center space-x-2">
                {item.icon && (
                  <Image
                    src={item.icon}
                    alt={item.name || 'icon'}
                    width={16}
                    height={16}
                    className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 object-contain"
                  />
                )}
                <span>{item.text}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;
import React from 'react';
import CardItem from '../shared/CardItem';
import { newsItems } from '@/constants/data';

const NewsHeader = () => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-12 text-center px-4">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#454545]">
        News and insights
      </h1>
      <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base lg:text-lg text-[#454545] max-w-2xl mx-auto">
        The world is changing rapidly...
      </p>
    </div>
  );
};

const NewsSection = () => {
  return (
    <section className="w-full bg-white py-8 sm:py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        <NewsHeader />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {newsItems.map((item, index) => (
            <CardItem
              key={index}
              title={item.title}
              image={item.imageSrc}
              description={item.description}
              className="h-[300px] sm:h-[280px] md:h-[300px] lg:h-[320px]"
               titleStyle={{
                color: '#178DDF',
                fontSize: 'clamp(12px, 2vw, 18px)',
                lineHeight: '1.2',
              }}
              descriptionStyle={{
                color: '#6D6D6D',
                fontSize: 'clamp(10px, 1.5vw, 16px)',
                lineHeight: '1.5'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

NewsSection.displayName = 'NewsSection';

export default NewsSection;
import React from 'react';
import CardItem from '../shared/CardItem';
import { projectData } from '@/constants/data';

const ProjectHighlightsHeader = () => {
  return (
    <div className="flex items-center justify-center mb-4 sm:mb-8 px-4">
      <div className="w-full sm:max-w-2xl lg:max-w-3xl">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-6">
            Spotlight <span className="bg-gradient-to-r from-[#0945EB] to-[#67D1FF] bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#6D6D6D]">
            We always looking for next millions users products - provide great impact in people's live
          </p>
        </div>
      </div>
    </div>
  );
};

const ProjectHighlightsSection = () => {
  return (
    <section className="w-full px-3 sm:px-4 py-8 sm:py-12 md:py-16 lg:py-24 bg-white">
      <div className="max-w-screen-xl mx-auto">
        <ProjectHighlightsHeader />
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {projectData.map((project) => (
            <div key={project.id} className="w-full flex justify-center sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]">
              <CardItem
                title={project.title}
                insetStyle={{
                  height: '65%',
                  width: '100%',
                  background: "linear-gradient(237.73deg, #FFFFFF 0%, #67CAFF 100%)",
                  borderRadius: '24px'
                }}
                image={project.image}
                imageWidth={160}
                imageHeight={160}
                imageClassName="absolute top-[20%] -translate-y-1/2 
                  w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] lg:h-[160px] lg:w-[160px]
                  right-[-5%] sm:right-[-8%] md:right-[-10%] lg:right-[-12%]"
                titleStyle={{
                  color: 'white',
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  lineHeight: '1.2',
                }}
                descriptionStyle={{
                  color: '#454545',
                  fontSize: 'clamp(14px, 1.5vw, 18px)',
                  lineHeight: '1.5'
                }}
                description={project.description}
                className="h-[300px] sm:h-[280px] md:h-[300px] lg:h-[320px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

ProjectHighlightsSection.displayName = 'ProjectHighlightsSection';

export default React.memo(ProjectHighlightsSection);
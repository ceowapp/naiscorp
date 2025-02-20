import Image from "next/image";
import { whyItems, infoData } from '@/constants/data';
import SkewedGroup from '../shared/SkewedGroup';

interface WhyItMattersItemProps {
  icon: string;       
  title: string;
  description: string;
}

const WhyItMattersItem = ({ imageSrc, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row items-center w-full">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-0 sm:mr-4">
          <Image
            src={imageSrc}
            alt={title}
            layout="fill"
            objectFit="contain"
            className="h-full w-full"
          />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-semibold mb-1 text-gray-800">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ title, color, points }) => (
  <div className="p-4">
    <h3
      className={`
        text-lg
        font-semibold 
        text-[#00D4FF] 
        border-l-4 
        border-[#00D4FF] 
        pl-2
      `}
    >
      {title}
    </h3>
    <ul className="mt-2 space-y-2">
      {points.map((point, index) => (
        <li 
          key={index} 
          className="flex items-start text-gray-700 group"
        >
          <span className={`
            mr-2 
            text-[#00D4FF]
            font-medium
            text-sm 
            transition-all 
            duration-200 
          `}>
            -
          </span>
          <span className="flex-1">{point}</span>
        </li>
      ))}
    </ul>
  </div>
);

export interface MatterItem {
  icon: string;
  title: string;
  description: string;
}

const WhyItMatters: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col justify-center items-center mb-20">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-12 font-bold bg-[linear-gradient(86.06deg,#4583FF_0%,#BAEAFF_52.07%)] bg-clip-text text-transparent">
        Why It Matters
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {whyItems.map((item, index) => (
          <WhyItMattersItem
            key={index}
            imageSrc={item.imageSrc}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

const MissionHeader = () => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-start items-start p-4 sm:p-6 pt-16 sm:pt-24 md:pt-32">
      <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-[#4583FF] to-[#BAEAFF] bg-clip-text text-transparent">
        Sustainability and Innovation
      </h1>
      <p className="text-white mt-2 sm:mt-4 text-sm sm:text-base md:text-lg max-w-2xl text-start">
        Driving Innovation to Enhance Productivity and Cost Efficiency
      </p>
      <p className="text-white mt-2 sm:mt-4 text-xs sm:text-sm md:text-base max-w-xl text-start">
        At Naiscorp, sustainability is about creating smarter solutions...
      </p>
    </div>
  );
};

const MissionSection = () => {
  return (
    <section className="bg-white text-gray-900 relative">
      <div className="relative top-12 sm:top-16 md:top-20 left-0 z-[9999] w-48 sm:w-64 md:w-80 lg:w-96">
        <Image
          src='/images/skew-group.png'
          alt='Skewed-Group'
          width={330}
          height={100}
          className="w-full h-auto"
          sizes="(max-width: 640px) 12rem, (max-width: 768px) 16rem, (max-width: 1024px) 20rem, 24rem"
        />
      </div>
      <div
        className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden z-50"
        style={{
          clipPath: 'polygon(0 10%, 100% 0, 100% 100%, 0 100%)',
        }}
      >
        <video
          autoPlay 
          loop 
          muted 
          className="absolute inset-0 w-full h-full object-cover" 
          preload="auto"
          playsInline
        >
          <source src="https://res.cloudinary.com/dc0pcnmqx/video/upload/v1739766628/technology-futuristic_fllamr.mp4" type="video/mp4" />
        </video>
        <MissionHeader />
      </div>
      <div className="relative w-full">
        <div className="absolute w-full -top-[100px] h-[100px] z-50 bg-gradient-to-t from-white to-transparent"></div>
        <div className="absolute -top-[10%] sm:-top-[15%] md:-top-[20%] lg:-top-[25%] -left-[20%] sm:-left-[15%] md:-left-[12%] lg:-left-[10%] rotate-[-45deg] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[550px] lg:h-[550px] rounded-full bg-[linear-gradient(180deg,#FFFFFF_0%,#C2F5FF_100%)]"></div>
        <div className="relative max-w-screen-xl mx-auto py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 z-50">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <div className="col-span-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-[#178DDF] text-start">
                Our Commitment to Sustainability Through Innovation:
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 col-span-2">
              {infoData.map((item, index) => (
                <InfoCard 
                  key={index} 
                  title={item.title} 
                  color={item.color} 
                  points={item.points} 
                />
              ))}
            </div>
          </div>
        </div>
        <WhyItMatters />
      </div>
    </section>
  );
};

MissionSection.displayName = 'MissionSection';

export default MissionSection;



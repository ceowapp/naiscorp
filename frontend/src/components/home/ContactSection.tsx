import Image from "next/image";
import { Quote } from "lucide-react";
import { contactFields } from '@/constants/data';

const InputField = ({ label, type, placeholder }) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <label className="text-[13px] xs:text-sm lg:text-base text-gray-300">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-[38px] xs:h-10 md:h-11 bg-gray-800/80 border border-[#E7E7E7] 
        rounded-lg px-3 py-2 text-[13px] xs:text-sm lg:text-base
        placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
        transition-all duration-300"
      />
    </div>
  );
};

const ContactForm = () => {
  return (
    <div className="w-full flex flex-col lg:col-span-4 xl:col-span-4 
      px-0 sm:px-6 lg:px-0 
      pt-4 sm:pt-6 lg:pt-8"
    >
      <h2 className="text-white text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4 leading-tight">
        Ready to <br />
        <span className="bg-gradient-to-r from-[#0945EB] to-[#67D1FF] bg-clip-text text-transparent">
          get in touch?
        </span>
      </h2>
      <p className="text-gray-300 text-[13px] xs:text-sm lg:text-base mb-4 sm:mb-6">
        Leave your business information below, we will contact you as soon as possible!
      </p>
      <form className="space-y-3 xs:space-y-4 sm:space-y-5 w-full">
        {contactFields.map((field, index) => (
          <InputField
            key={index}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
          />
        ))}
        <button
          type="submit"
          className="relative bg-[#7A73FF] hover:bg-blue-700 text-white 
          px-4 sm:px-6 py-2 xs:py-2.5 mt-4 xs:mt-6
          rounded-full h-[38px] xs:h-10 md:h-11
          w-24 xs:w-28 md:w-32
          text-[13px] xs:text-sm lg:text-base
          flex items-center justify-center
          transition-all duration-300
          hover:transform hover:scale-105"
        >
          Send
        </button>
      </form>
    </div>
  );
};

const ContactQuote = () => {
  return (
    <div className="w-full h-full flex items-center lg:col-span-8 lg:col-start-6 xl:col-span-7 xl:col-start-6 mb-6 sm:mb-8 lg:mb-0">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 flex items-center justify-center rounded-full 
          min-h-[400px] min-w-[400px] 
          xs:min-h-[450px] xs:min-w-[450px]
          sm:min-h-[550px] sm:min-w-[550px] 
          md:min-h-[650px] md:min-w-[650px]
          lg:min-h-[750px] lg:min-w-[750px] 
          xl:min-h-[850px] xl:min-w-[850px]
          2xl:min-h-[950px] 2xl:min-w-[950px]"
        >
          <Image
            src="/images/contact-background.png"
            alt="Contact Background"
            fill
            className="object-contain mix-blend-color-dodge opacity-30"
            style={{ transform: 'translateY(-20%) translateX(-15%)' }}
            sizes="(max-width: 480px) 400px, (max-width: 640px) 450px, (max-width: 768px) 550px, (max-width: 1024px) 650px, (max-width: 1280px) 750px, (max-width: 1536px) 850px, 950px"
            priority
          />
        </div>
        <div className="relative top-[20%] bg-[#082C8F] 
          p-5 xs:p-6 sm:p-8 lg:p-10 
          mx-3 xs:mx-4 sm:mx-6 lg:mx-8
          rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg
          transform transition-transform duration-300 hover:scale-[1.02]"
        >
          <div className="absolute -top-2.5 -left-2.5 xs:-top-3 xs:-left-3 sm:-top-4 sm:-left-4 
            w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
          >
            <Image 
              src="/svgs/quote.svg" 
              alt="Quote Icon" 
              width={56} 
              height={56} 
              className="w-full h-full opacity-80"
              priority
            />
          </div>
          <blockquote className="text-[15px] xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 
            leading-relaxed text-white"
          >
            Partner with Naiscorp to transform your business with technology that
            drives sustainability, reduces costs, and unlocks new levels of
            productivity. Let us help you achieve more with less.
          </blockquote>
        </div>
      </div>
    </div>
  );
};

const ContactSection = () => {
  return (
    <section className="bg-white text-gray-900 relative overflow-hidden w-full">
      <div className="relative top-10 xs:top-12 sm:top-16 lg:top-20 left-0 z-50 
        w-28 xs:w-32 sm:w-44 lg:w-64 xl:w-80"
      >
        <Image
          src={'/images/skew-group.png'}
          alt='Skewed-Group'
          width={330}
          height={100}
          className="w-full h-auto"
          sizes="(max-width: 480px) 7rem, (max-width: 640px) 8rem, (max-width: 768px) 11rem, (max-width: 1024px) 16rem, 20rem"
          priority
        />
      </div>

      <div 
        className="relative bg-[#0A2540] w-full 
          min-h-[450px] xs:min-h-[500px] sm:min-h-[600px] md:min-h-[650px] lg:min-h-[700px] xl:min-h-[800px] 
          pt-12 pb-12 xs:pt-14 xs:pb-14 sm:pt-16 sm:pb-16 md:pt-20 md:pb-20 lg:pt-24 lg:pb-24"
        style={{
          clipPath: 'polygon(0 5%, 100% 0, 100% 95%, 0 100%)',
        }}
      >
        <div className="max-w-[95%] sm:max-w-[90%] xl:max-w-screen-xl mx-auto h-full 
          grid grid-cols-1 lg:grid-cols-12 
          gap-4 xs:gap-6 sm:gap-8 lg:gap-12 
          py-6 xs:py-8 sm:py-10 lg:py-12"
        >
          <ContactForm />
          <ContactQuote />
        </div>
      </div>

      <div className="relative -top-10 xs:-top-12 sm:-top-16 lg:-top-20 right-0 z-50 
        rotate-180 w-28 xs:w-32 sm:w-44 lg:w-64 xl:w-80 ml-auto"
      >
        <Image
          src={'/images/skew-group.png'}
          alt='Skewed-Group'
          width={330}
          height={100}
          className="w-full h-auto"
          sizes="(max-width: 480px) 7rem, (max-width: 640px) 8rem, (max-width: 768px) 11rem, (max-width: 1024px) 16rem, 20rem"
          priority
        />
      </div>
    </section>
  );
};

export default ContactSection;
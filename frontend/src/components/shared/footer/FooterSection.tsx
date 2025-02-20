import React from 'react';
import FooterColumn from './FooterColumn';
import SocialContainer from './SocialContainer';
import CompanyLogo from '../CompanyLogo';

const aboutColumn = {
  title: 'About',
  links: [
    { text: 'About Naiscorp', href: '/about' },
    { text: 'News', href: '/news' },
    { text: 'Careers', href: '/careers' },
    { text: 'Contact Us' },
  ],
};

const solutionsColumn = {
  title: 'Our Solutions',
  links: [
    { text: 'High performance insurance system', href: '/solutions/insurance' },
    { text: 'AI personal assistant', href: '/solutions/ai-assistant' },
    { text: 'Car damage inspection', href: '/solutions/car-inspection' },
    { text: 'See all' },
  ],
};

const divisionsColumn = {
  title: 'Our Divisions',
  links: [
    { text: 'Production house', href: '/divisions/production' },
    { text: 'Robotics and smart hardware', href: '/divisions/robotics' },
    { text: 'Investment and incubation', href: '/divisions/investment' },
    { text: 'Innovative apps', href: '/divisions/apps' },
    { text: 'Insurtech', href: '/divisions/insurtech' },
    { text: 'See all' },
  ],
};

const contactColumn = {
  subtitle: `Naiscorp is a leading technology service company providing digital 
  transformation solutions, developing AI, Big Data, Robotics, and 
  Big Apps; providing customers with high quality products, services, 
  and solutions to help transform the world. Established in 2006, 
  led by Tai Nguyen, invested by DGW and Softbank.`,
  items: [     
    {   
      name: 'address',
      icon: '/svgs/local.svg',
      text: '86 Ton That Thuyet, ward 4, TP HCM',
    },
    {
      name: 'phone',
      icon: '/svgs/phone.svg',
      text: '+84-938318383',
    },
    {
      name: 'email',
      icon: '/svgs/mail.svg',
      text: 'tai.nguyen@naiscorp.com',
    },
  ],
};

function FooterSection() {
  return (
    <footer className="bg-[#0b2e45] text-white relative">
      <div className="relative w-full h-2">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-[#00D4FF]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#7A73FF]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 mt-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
          <CompanyLogo />
          <SocialContainer />
        </div>
        <div className="w-full h-[1px] bg-[#E1EFFD] mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">    
          <div className="sm:col-span-2 lg:col-span-5">
            <FooterColumn
              title={contactColumn.title}
              items={contactColumn.items}
              subtitle={contactColumn.subtitle}
              isContact
              className="h-full"
            />
          </div>
          <div className="sm:col-span-1 lg:col-span-2 lg:col-start-7">
            <FooterColumn
              title={aboutColumn.title}
              items={aboutColumn.links}
              isLink
              className="h-full"
            />
          </div>
          
          <div className="sm:col-span-1 lg:col-span-2">
            <FooterColumn
              title={solutionsColumn.title}
              items={solutionsColumn.links}
              isLink
              className="h-full"
            />
          </div>
          <div className="sm:col-span-2 lg:col-span-2">
            <FooterColumn
              title={divisionsColumn.title}
              items={divisionsColumn.links}
              isLink
              className="h-full"
            />
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-gray-700">
          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} Naiscorp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

FooterSection.displayName = 'FooterSection';

export default FooterSection;
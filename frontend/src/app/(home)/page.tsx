"use client"

import React from "react";
import Navbar from "@/components/shared/navbar/Navbar";
import HeroSection from "@/components/home/HeroSection";
import SolutionsIntersection from "@/components/home/SolutionsIntersection";
import SolutionsSection from "@/components/home/SolutionsSection";
import OffersSection from "@/components/home/OffersSection";
import ProjectHighlightsSection from "@/components/home/ProjectHighlightsSection";
import MissionSection from "@/components/home/MissionSection";
import ContactSection from "@/components/home/ContactSection";
import FooterSection from "@/components/shared/footer/FooterSection";
import NewsSection from "@/components/home/NewsSection";

const HomePage: React.FC = () => {
  return (
    <div className="bg-white text-white">
      <Navbar />
      <HeroSection />
      <SolutionsIntersection />
      <SolutionsSection />
      <OffersSection />
      <ProjectHighlightsSection />
      <MissionSection />
      <ContactSection />
      <NewsSection />
      <FooterSection />
    </div>
  );
};

HomePage.displayName = 'HomePage';

export default HomePage;

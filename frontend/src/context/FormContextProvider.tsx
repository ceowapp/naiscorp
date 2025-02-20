"use client"
import React, { createContext, useContext } from 'react';

interface SEOFormContextType {
  handleSubmit: () => void;
}

export const SEOFormContext = createContext<SEOFormContextType | undefined>(undefined);

export const useSEOForm = () => {
  const context = useContext(SEOFormContext);
  if (!context) {
    throw new Error('useSEOForm must be used within a SEOFormProvider');
  }
  return context;
};

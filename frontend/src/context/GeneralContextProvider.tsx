'use client';
import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { PRODUCT } from '@/types/product';
import { Package } from '@prisma/client';
import { type PaymentType, CurrencyCode, CreditPaymentInfo } from '@/types/billing';
import { type AIError } from '@/types/ai';
import { defaultCreditPaymentInfo } from '@/constants/billing';

export interface GeneralContextType {
  state: GeneralState;
  submitTypeRef: React.RefObject<string | undefined>;
}

export interface ProcessingStatus {
  isProcessing: boolean;
  progress: number;
  showStatus: boolean;
  isSuccess: boolean;
}

export interface AISettings {
  tone: 'professional' | 'casual' | 'friendly';
  length: 'short' | 'medium' | 'long';
  keywordDensity: number;
}

interface LoadingProgress {
  progress: number;
  currentState: string;
}

export type Theme = "light" | "light-mobile" | "light-high-contrast-experimental" | "dark-experimental";

export type ProductUpdate = Partial<Pick<PRODUCT, 'title' | 'shortDescription' | 'bodyContent' |'category' | 'pageTitle' | 'metaDescription' | 'images' | 'tags' | 'urlHanle' | 'technical' | 'review' | 'product' | 'faq' | 'weight' | 'profit' | 'costPerItem' | 'price'>>;

export interface GeneralActionsType {
  setLoadingFields: (fields: Record<string, boolean>) => void;
  setIsLoading: (value: boolean) => void;
  setLoadingProgress: (value: LoadingProgress) => void;
  setAiSettings: (value: Partial<AISettings>) => void;
  setIsSEOLoading: (value: boolean) => void;
  setError: (value: string) => void;
  setAiErrors: (value: AIError[]) => void;
  setOpenAISEO: (value: boolean) => void;
  setSelectedProduct: (value: PRODUCT | null) => void;
  setRewriteProduct: (value: ProductUpdate) => void;
  setSeoProduct: (value: ProductUpdate) => void;
  setEditSeoProduct: (value: ProductUpdate) => void;
  setTheme: (theme: Theme) => void;
  setCurrentStep: (value: number) => void;
  setPreviewLink: (value: string | null) => void;
  setPaymentType: (value: PaymentType) => void;  
  setBodyHtml: (value: string) => void;
  setCreditPaymentInfo: (value: CreditPaymentInfo) => void;
  setProcessingStatus: (value: ProcessingStatus) => void;
}

class GeneralState {
  openAISEO: boolean = false;
  isLoading: boolean = false;
  previewLink: string | null = null;
  loadingFields: Record<string, boolean> = {};
  aiSettings: AISettings = { tone: 'None', length: '100-400', keywordDensity: 2 };
  loadingProgress: LoadingProgress = { progress: 0, currentState: '' };
  isSEOLoading: boolean = false;
  error: string = '';
  bodyHtml: string = '';
  aiErrors: AIError[] = [];
  selectedProduct: PRODUCT | null = null;
  rewriteProduct: PRODUCT = {} as PRODUCT;
  seoProduct: PRODUCT = {} as PRODUCT;
  editSeoProduct: PRODUCT = {} as PRODUCT;
  theme: Theme = "light";
  currentStep: number = 0;
  creditPaymentInfo: defaultCreditPaymentInfo;
  paymentType: PaymentType = 'SUBSCRIPTION';
  processingStatus: ProcessingStatus = {
    isProcessing: false,
    progress: 0,
    showStatus: false,
    isSuccess: false
  };

  constructor(init?: Partial<GeneralState>) {
    Object.assign(this, init);
  }
}

const InitialValues: GeneralContextType = {
  state: new GeneralState(),
  submitTypeRef: { current: undefined },
};

const GeneralContext = createContext<GeneralContextType>(InitialValues);
const GeneralActionsContext = createContext<GeneralActionsType | undefined>(undefined);

export const GeneralContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GeneralState>(new GeneralState());
  const submitTypeRef = useRef<string | undefined>(undefined);

  const setIsLoading = useCallback((value: boolean) =>
    setState(prev => ({ ...prev, isLoading: value })), []);

  const setLoadingProgress = useCallback((value: LoadingProgress ) =>
    setState(prev => ({ ...prev, loadingProgress: value })), []);

  const setIsSEOLoading = useCallback((value: boolean) =>
    setState(prev => ({ ...prev, isSEOLoading: value })), []);

  const setError = useCallback((value: string) =>
    setState(prev => ({ ...prev, error: value })), []);

  const setAiErrors = useCallback((value: AIError[]) =>
    setState(prev => ({ ...prev, aiErrors: value })), []);

  const setOpenAISEO = useCallback((value: boolean) =>
    setState(prev => ({ ...prev, openAISEO: value })), []);

  const setSelectedProduct = useCallback((value: PRODUCT | null) =>
    setState(prev => ({ ...prev, selectedProduct: value })), []);

  const setLoadingFields = useCallback((fields: Record<string, boolean>) =>
    setState(prev => ({ ...prev, loadingFields: fields })), []);

  const setProcessingStatus = useCallback((value: ProcessingStatus) => {
    setState(prev => ({ ...prev, processingStatus: value }));
  }, []);

  const setRewriteProduct = useCallback((updates: ProductUpdate) => {
    setState(prev => ({
        ...prev,
        rewriteProduct: {
            ...prev.rewriteProduct, 
            ...updates 
        }
    }));
  }, []);

  const setSeoProduct = useCallback((updates: ProductUpdate, isFullUpdate = false) => {
    setState(prev => ({
      ...prev,
      seoProduct: isFullUpdate
        ? updates 
        : {
            ...prev.seoProduct, 
            ...updates,          
          },
    }));
  }, []);

  const setEditSeoProduct = useCallback((updates: ProductUpdate, isFullUpdate = false) => {
    setState(prev => ({
      ...prev,
      editSeoProduct: isFullUpdate
        ? updates 
        : {
            ...prev.editSeoProduct,
            ...updates,             
          },
    }));
  }, []);

  const setAiSettings = useCallback((updates: Partial<AISettings>) => {
    setState(prev => ({
      ...prev,
      aiSettings: {
        ...prev.aiSettings,
        ...updates
      }
    }));
  }, []);

  const setBodyHtml = useCallback((value: PaymentType) =>
    setState(prev => ({ ...prev, bodyHtml: value })), []);

  const setCurrentStep = useCallback((value: number) =>
    setState(prev => ({ ...prev, currentStep: value })), []);

  const setPaymentType = useCallback((value: PaymentType) =>
    setState(prev => ({ ...prev, paymentType: value })), []);

  const setCreditPaymentInfo = useCallback((value: CreditPaymentInfo) =>
    setState(prev => ({ ...prev, creditPaymentInfo: value })), []);

  const setTheme = useCallback((theme: Theme) => {
    setState(prev => ({ ...prev, theme }));
    localStorage.setItem('theme', theme);
  }, []);

  const setPreviewLink = useCallback((value: string | null) =>
    setState(prev => ({ ...prev, previewLink: value })), []);

  return (
    <GeneralContext.Provider value={{ state, submitTypeRef }}>
      <GeneralActionsContext.Provider value={{
        setIsLoading,
        setAiSettings,
        setProcessingStatus,
        setLoadingFields,
        setPreviewLink,
        setLoadingProgress,
        setIsSEOLoading,
        setError,
        setAiErrors,
        setOpenAISEO,
        setRewriteProduct,
        setSeoProduct,
        setEditSeoProduct,
        setSelectedProduct,
        setTheme,
        setPaymentType,
        setCurrentStep,
        setCreditPaymentInfo,
        setBodyHtml,
      }}>
        {children}
      </GeneralActionsContext.Provider>
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error('useGeneralContext must be used within a ContextProvider');
  }
  return context;
};

export const useGeneralActions = () => {
  const context = useContext(GeneralActionsContext);
  if (!context) {
    throw new Error('useGeneralActions must be used within a GeneralActionsProvider');
  }
  return context;
};
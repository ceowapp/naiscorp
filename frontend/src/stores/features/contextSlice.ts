import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_VALUES } from '@/constants/product';

interface ContextData {
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  costPerItem?: number;
  profit?: number;
  weight?: number;
  pageTitle?: string;
  metaDescription?: string;
  urlHandle?: string;
  tags?: string;
  shortDescription?: string;
  bodyContent?: string;
  technical?: Record<string, any>;
  product?: Record<string, any>;
  faq?: Record<string, any>;
  review?: Record<string, any>;
  images?: any[];
  rawData?: Record<string, any>;
  rewriteData?: Record<string, any>;
  seoData?: Record<string, any>;
}

interface ContextState {
  context: ContextData | null;
}

const initialState: ContextState = {
  context: DEFAULT_VALUES,
};

const contextSlice = createSlice({
  name: 'context',
  initialState,
  reducers: {
    storeContextData: (state, action: PayloadAction<Partial<ContentData>>) => {
      state.context = {
        ...state.context,
        ...action.payload,
      };
    },
    reset: () => initialState,
  },
});

export const { storeContextData, reset } = contextSlice.actions;

export const selectRawContext = (state: { context: ContextState }) => state.context.context || {};

export const selectContextData = createSelector(
  [selectRawContext],
  (contextData) => ({
    title: contextData.title || DEFAULT_VALUES.title,
    description: contextData.description || DEFAULT_VALUES.description,
    category: contextData.category || DEFAULT_VALUES.category,
    price: contextData.price ?? DEFAULT_VALUES.price,
    costPerItem: contextData.costPerItem ?? DEFAULT_VALUES.costPerItem,
    profit: contextData.profit ?? DEFAULT_VALUES.profit,
    weight: contextData.weight ?? DEFAULT_VALUES.weight,
    pageTitle: contextData.pageTitle || DEFAULT_VALUES.pageTitle,
    metaDescription: contextData.metaDescription || DEFAULT_VALUES.metaDescription,
    urlHandle: contextData.urlHandle || DEFAULT_VALUES.urlHandle,
    tags: contextData.tags || DEFAULT_VALUES.tags,
    shortDescription: contextData.shortDescription || DEFAULT_VALUES.shortDescription,
    bodyContent: contextData.bodyContent || DEFAULT_VALUES.bodyContent,
    technical: contextData.technical || DEFAULT_VALUES.technical || {},
    product: contextData.product || DEFAULT_VALUES.product || {},
    faq: contextData.faq || DEFAULT_VALUES.faq || {},
    review: contextData.review || DEFAULT_VALUES.review || {},
    images: contextData.images || DEFAULT_VALUES.images || [],
    rawData: contextData.rawData || {},
    rewriteData: contextData.rewriteData || {},
    seoData: contextData.seoData || {}
  })
);

export default contextSlice.reducer;
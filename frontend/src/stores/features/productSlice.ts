import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type PRODUCT, type ProductDataInput } from '@/types/product';

const initialProduct: PRODUCT = {
  id: '',
  title: '',
  shortDescription: '',
  bodyContent: '',
  metaDescription: '',
  category: '',
  pageTitle: '',
  urlHandle: '',
  tags: '',
  images: [],
  price: '',
};

export const initialInputProduct: ProductDataInput = {
  identifier: "",
  productName: "",
  price: 0,
  currency: "",
  condition: "",
  description: "",
  technicalDescription: "",
  dimensions: "",
  keyFeatures: "",
  specifications: "",
  productCategory: "",
  brandName: "",
  brandLogo: "",
  brandFoundingDate: "",
  brandDescription: "",
  availabilityStatus: "",
  inventoryQuantity: 0,
  maxOrderQuantity: 0,
  restockDate: '',
  ratingAverage: 0,
  ratingCount: 0,
  ratingDistribution: "",
  productPros: "",
  productCons: "",
  productKeyThemes: "",
  popularReviews: "",
  sourceURL: "",
  images: [],
  videos: [],
  documents: [],
  keywords: "",
  metaDescription: "",
  pageTitle: "",
  urlHandle: "",
  variants: "",
  relatedProducts: "",
  accessories: "",
  comparison: "",
  discount: "",
  warrantyDuration: "",
  returnPolicy: "",
  shippingMethods: "",
  shippingCost: 0,
  estimatedDelivery: "",
  supportPhone: "",
  supportEmail: "",
  paymentMethods: "",
  additionalFees: "",
  safetyWarning: "",
  legalDisclaimers: "",
  recommendedAgeRange: "",
  countryOrigin: "",
  regionOrigin: "",
  platforms: "",
  sellers: "",
  links: ""
};

interface ProductState {
  product: PRODUCT | null;
  seoProduct: PRODUCT | null;
  rawInputProduct: ProductDataInput | null;
  seoInputProduct: PRODUCT | null;
  editSeoProduct: PRODUCT | null;
  openAISEO: boolean;
  previewLink: string | null;
}

const initialState: ProductState = {
  product: initialProduct,
  seoProduct: initialProduct,
  rawInputProduct: initialInputProduct,
  seoInputProduct: initialProduct,
  editSeoProduct: initialProduct,
  previewLink: null,
  openAISEO: false,
  aiSettings: { tone: 'professional', length: 'medium', keywordDensity: 2, customPrompt: '' },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductData: (state, action: PayloadAction<PRODUCT>) => {
      state.product = action.payload;
    },
    updateProductData: (state, action: PayloadAction<Partial<PRODUCT>>) => {
      if (state.product) {
        state.product = {
          ...state.product,
          ...action.payload,
        };
      }
    },
    setSeoProductData: (state, action: PayloadAction<PRODUCT>) => {
      state.seoProduct = action.payload;
    },
    updateSeoProductData: (state, action: PayloadAction<Partial<PRODUCT>>) => {
      if (state.seoProduct) {
        state.seoProduct = {
          ...state.seoProduct,
          ...action.payload,
        };
      }
    },
    setRawInputProductData: (state, action: PayloadAction<PRODUCT>) => {
      state.rawInputProduct = action.payload;
    },
    updateRawInputProductData: (state, action: PayloadAction<Partial<PRODUCT>>) => {
      if (state.rawInputProduct) {
        state.rawInputProduct = {
          ...state.rawInputProduct,
          ...action.payload,
        };
      }
    },
    setSeoInputProductData: (state, action: PayloadAction<PRODUCT>) => {
      state.seoInputProduct = action.payload;
    },
    updateSeoInputProductData: (state, action: PayloadAction<Partial<PRODUCT>>) => {
      if (state.seoInputProduct) {
        state.seoInputProduct = {
          ...state.seoInputProduct,
          ...action.payload,
        };
      }
    },
    setEditSeoProductData: (state, action: PayloadAction<PRODUCT>) => {
      state.editSeoProduct = action.payload;
    },
    updateEditSeoProductData: (state, action: PayloadAction<Partial<PRODUCT>>) => {
      if (state.editSeoProduct) {
        state.editSeoProduct = {
          ...state.editSeoProduct,
          ...action.payload,
        };
      }
    },
    setOpenAISEO: (state, action: PayloadAction<boolean>) => {
      state.openAISEO = action.payload;
    },
    setPreviewLink: (state, action: PayloadAction<string>) => {
      state.previewLink = action.payload;
    },
    updateBodyContent: (state, action: PayloadAction<string>) => {
      if (state.product && typeof action.payload === 'string' && action.payload.trim() !== "") {
        state.product.bodyContent = action.payload;
      }
    },
    addImage: (state, action: PayloadAction<string>) => {
      if (state.product) {
        state.product.images = [...(state.product.images || []), action.payload];
      }
    },
    removeImage: (state, action: PayloadAction<string>) => {
      if (state.product) {
        state.product.images = state.product.images.filter(img => img !== action.payload);
        if (state.product.image?.src === action.payload) {
          state.product.image = undefined;
        }
      }
    },
    replaceImage: (state, action: PayloadAction<{ oldUrl: string; newUrl: string }>) => {
      if (state.product) {
        state.product.images = state.product.images.map(img => 
          img === action.payload.oldUrl ? action.payload.newUrl : img
        );
        if (state.product.image?.src === action.payload.oldUrl) {
          state.product.image = { src: action.payload.newUrl };
        }
      }
    },
    setFeaturedImage: (state, action: PayloadAction<string>) => {
      if (state.product) {
        state.product.image = { src: action.payload };
        state.product.images = state.product.images.filter(img => img !== action.payload);
      }
    },
    setAiSettings: (state, action: PayloadAction<Partial<AISettings>>) => {
      state.aiSettings = {
        ...state.aiSettings,
        ...action.payload,
      };
    },
    reset: () => initialState,
  },
});

export const {
  setProductData,
  updateProductData,
  setSeoProductData,
  updateSeoProductData,
  setRawInputProductData,
  updateRawInputProductData,
  setSeoInputProductData,
  updateSeoInputProductData,
  setEditSeoProductData,
  updateEditSeoProductData,
  setOpenAISEO,
  setPreviewLink,
  updateBodyContent,
  addImage,
  removeImage,
  replaceImage,
  setFeaturedImage,
  setAiSettings,
  reset
} = productSlice.actions;

export const selectProductState = (state: { product: ProductState }) => state.product;

export const selectProductData = createSelector(
  [selectProductState],
  (productState) => productState?.product || null
);

export const selectSeoProductData = createSelector(
  [selectProductState],
  (productState) => productState?.seoProduct || null
);

export const selectRawInputProductData = createSelector(
  [selectProductState],
  (productState) => productState?.rawInputProduct || null
);

export const selectSeoInputProductData = createSelector(
  [selectProductState],
  (productState) => productState?.seoInputProduct || null
);

export const selectEditSeoProductData = createSelector(
  [selectProductState],
  (productState) => productState?.editSeoProduct || null
);

export const selectOpenAISEO = createSelector(
  [selectProductState],
  (productState) => productState?.openAISEO || false
);

export const selectPreviewLink = createSelector(
  [selectProductState],
  (productState) => productState?.previewLink || null
);

export const selectAISettings = createSelector(
  [selectProductState],
  (productState) => productState?.aiSettings || null
);

export default productSlice.reducer;
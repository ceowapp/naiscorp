import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from '@/stores/utils/storage';
import authReducer from "@/stores/features/authSlice";
import productReducer from "@/stores/features/productSlice";
import coversReducer from '@/stores/features/coversSlice';
import contextReducer from "@/stores/features/contextSlice";
import imageReducer from "@/stores/features/imageSlice";

const persistConfigAuth = {
  key: 'auth',
  storage,
};

const persistConfigContext = {
  key: 'context',
  storage,
};

const persistConfigEditor = {
  key: 'editor',
  storage,
};

const persistConfigProduct = {
  key: 'product',
  storage,
};

const persistConfigImage = {
  key: 'image',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfigAuth, authReducer);
const persistedCoverReducer = persistReducer(persistConfigEditor, coversReducer);
const persistedContextReducer = persistReducer(persistConfigContext, contextReducer);
const persistedProductReducer = persistReducer(persistConfigProduct, productReducer);
const persistedImageReducer = persistReducer(persistConfigImage, imageReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    context: persistedContextReducer,
    covers: persistedCoverReducer,
    product: persistedProductReducer,
    image: persistedImageReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
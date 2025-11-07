import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slice/login.slice';
import cartReducer from './slice/cart.slice';
import productsReducer from './slice/product.slice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token', 'isAuthenticated']
};

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items', 'totalQuantity', 'totalPrice']
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: persistedCartReducer,
    products: productsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
});

export const persistor = persistStore(store);
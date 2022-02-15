import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { usersApi, specialistAPI, clientApi, tendersApi } from '@services';
import { createWrapper } from 'next-redux-wrapper';
import { uiReducer } from './slices/UISlice';
import { authReducer } from './slices/authSlice';

const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  [specialistAPI.reducerPath]: specialistAPI.reducer,
  [clientApi.reducerPath]: clientApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [tendersApi.reducerPath]: tendersApi.reducer
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        specialistAPI.middleware,
        clientApi.middleware,
        usersApi.middleware,
        tendersApi.middleware
      )
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });

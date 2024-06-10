// // store.ts

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../actions/authSlide';

import mapSlice from '../../redux/mapSlice';
import carSlice from '../../redux/carSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    map: mapSlice,
    car: carSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;

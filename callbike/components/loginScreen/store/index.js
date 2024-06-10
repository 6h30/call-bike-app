

import { combineReducers } from 'redux';
import authReducer from '../actions/authSlice';
// import other reducers

const rootReducer = combineReducers({
  auth: authReducer,
  // other reducers
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

// store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;
    },
    loginFailure(state, action) {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, setLoading } = authSlice.actions;

export const login = (username, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await fakeApiCall(username, password);
    await AsyncStorage.setItem('userToken', response.token);
    await AsyncStorage.setItem('userData', JSON.stringify(response.user));
    dispatch(loginSuccess(response));
  } catch (error) {
    dispatch(loginFailure('sai ten or mk'));
  }
};

export const performLogout = () => async (dispatch) => {
  await AsyncStorage.removeItem('userToken');
  await AsyncStorage.removeItem('userData');
  dispatch(logout());
};

// export const checkAuthStatus = () => async (dispatch) => {
//   dispatch(setLoading(true));
//   const token = await AsyncStorage.getItem('userToken');
//   const userData = await AsyncStorage.getItem('userData');
//   if (token && userData) {
//     dispatch(loginSuccess({ token, user: JSON.parse(userData) }));
//   } else {
//     dispatch(setLoading(false));
//   }
// };

export const checkAuthStatus = () => async (dispatch) => {
  dispatch(setLoading(true));
  const token = await AsyncStorage.getItem('userToken');
  const userData = await AsyncStorage.getItem('userData');
  if (token && userData) {
    dispatch(loginSuccess({ token, user: JSON.parse(userData) }));
  } else {
    dispatch(setLoading(false));
  }
  return Promise.resolve(); // Trả về một promise để đảm bảo hàm này luôn trả về một promise
};

export default authSlice.reducer;

// Giả lập một API call
const fakeApiCall = (username, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'dc' && password === 'ad') {
        // Giả định rằng bạn có một cơ sở dữ liệu và bạn truy vấn thông tin khách hàng từ đó
        const customerData = {
          customerId: 123, 
          first_name: 'Truong', 
          last_name: 'Duc', 
          phoneNumber: '123456789', 
          email: 'example@gmail.com', 
          homeAddress: '123 Đường, Quận 7', 
          currentLocation: '456 Đường, Quận 1', 
          // Các trường thông tin khác nếu cần
        };
        resolve({
          token: 'fake-jwt-token',
          user: customerData,
        });
      } else {
        reject(new Error('sai'));
      }
    }, 1000);
  });

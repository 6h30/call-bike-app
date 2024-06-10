// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AppThunk } from '../store'; 

// interface User {
//   first_name: string;
//   last_name: string;
// }

// interface CustomerData {
//   customerId: number;
//   first_name: string;
//   last_name: string;
//   phoneNumber: string;
//   email: string;
//   homeAddress: string;
//   currentLocation: string;
// }

// interface AuthState {
//   isAuthenticated: boolean;
//   loading: boolean;
//   user: User | null;
//   error: string | null;
//   customerData: CustomerData | null;
// }

// const initialState: AuthState = {
//   isAuthenticated: false,
//   loading: true,
//   user: null,
//   error: null,
//   customerData: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginRequest(state) {
//       state.loading = true;
//       state.error = null;
//     },
//     loginSuccess(state, action: PayloadAction<{ token: string; user: User; customerData: CustomerData }>) {
//       state.isAuthenticated = true;
//       state.loading = false;
//       state.user = action.payload.user;
//       state.customerData = action.payload.customerData; 
//     },
//     loginFailure(state, action: PayloadAction<string>) {
//       state.isAuthenticated = false;
//       state.loading = false;
//       state.error = action.payload;
//     },
//     logout(state) {
//       state.isAuthenticated = false;
//       state.loading = false;
//       state.user = null;
//     },
//     setLoading(state, action: PayloadAction<boolean>) {
//       state.loading = action.payload;
//     },
//   },
// });

// export const { loginRequest, loginSuccess, loginFailure, logout, setLoading } = authSlice.actions;

// export const login = (username: string, password: string): AppThunk => async (dispatch) => {
//   dispatch(loginRequest());
//   try {
//     const response = await fakeApiCall(username, password);
//     await AsyncStorage.setItem('userToken', response.token);
//     await AsyncStorage.setItem('userData', JSON.stringify(response.user));
//     // Chỉ truyền vào token và user trong loginSuccess
//     dispatch(loginSuccess({ token: response.token, user: response.user, customerData: response.user }));
//   } catch (error) {
//     dispatch(loginFailure('sai ten or mk'));
//   }
// };

// export const performLogout = (): AppThunk => async (dispatch) => {
//   await AsyncStorage.removeItem('userToken');
//   await AsyncStorage.removeItem('userData');
//   dispatch(logout());
// };

// export const checkAuthStatus = (): AppThunk => async (dispatch) => {
//   dispatch(setLoading(true));
//   const token = await AsyncStorage.getItem('userToken');
//   const userData = await AsyncStorage.getItem('userData');
//   if (token && userData) {
//     const user = JSON.parse(userData);
//     const emptyCustomerData: CustomerData = {
//       customerId: 0, // hoặc giá trị mặc định khác tùy vào cấu trúc của CustomerData
//       first_name: '',
//       last_name: '',
//       phoneNumber: '',
//       email: '',
//       homeAddress: '',
//       currentLocation: ''
//     };
//     dispatch(loginSuccess({ token, user, customerData: emptyCustomerData }));
//   } else { 
//     dispatch(setLoading(false));
//   }
//   return Promise.resolve();
// };



// export default authSlice.reducer;

// //Giả lập một API call
// const fakeApiCall = (username: string, password: string): Promise<{ token: string; user: CustomerData }> =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (username === 'dc' && password === 'ad') {
//         const customerData: CustomerData = {
//           customerId: 123,
//           first_name: 'Truong',
//           last_name: 'Duc',
//           phoneNumber: '123456789',
//           email: 'example@gmail.com',
//           homeAddress: '123 Đường, Quận 7',
//           currentLocation: '456 Đường, Quận 1',
//         };
//         resolve({
//           token: 'fake-jwt-token',
//           user: customerData,
//         });
//       } else {
//         reject(new Error('sai'));
//       }
//     }, 1000);
//   });


import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppThunk } from '../store'; 

interface User {
  first_name: string;
  last_name: string;
}

interface CustomerData {
  customerId: number;
  first_name: string;
  last_name: string;
  phoneNumber: string;
  email: string;
  homeAddress: string;
  currentLocation: string;
}

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  error: string | null;
  customerData: CustomerData | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: true,
  user: null,
  error: null,
  customerData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ token: string; user: User; customerData: CustomerData }>) {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;
      state.customerData = action.payload.customerData; 
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.customerData = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, setLoading } = authSlice.actions;

export const login = (username: string, password: string): AppThunk => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await fakeApiCall(username, password);
    await AsyncStorage.setItem('userToken', response.token);
    await AsyncStorage.setItem('userData', JSON.stringify(response.user));
    dispatch(loginSuccess({ token: response.token, user: response.user, customerData: response.user }));
  } catch (error) {
    dispatch(loginFailure('Tên người dùng hoặc mật khẩu không đúng.'));
    dispatch(setLoading(false));
  }
};

export const performLogout = (): AppThunk => async (dispatch) => {
  await AsyncStorage.removeItem('userToken');
  await AsyncStorage.removeItem('userData');
  dispatch(logout());
};

export const checkAuthStatus = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  const token = await AsyncStorage.getItem('userToken');
  const userData = await AsyncStorage.getItem('userData');
  if (token && userData) {
    const user = JSON.parse(userData);
    const emptyCustomerData: CustomerData = {
      customerId: 0,
      first_name: '',
      last_name: '',
      phoneNumber: '',
      email: '',
      homeAddress: '',
      currentLocation: ''
    };
    dispatch(loginSuccess({ token, user, customerData: emptyCustomerData }));
  } else { 
    dispatch(setLoading(false));
  }
  return Promise.resolve();
};

export default authSlice.reducer;

// Giả lập một API call
const fakeApiCall = (username: string, password: string): Promise<{ token: string; user: CustomerData }> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'dc' && password === 'ad') {
        const customerData: CustomerData = {
          customerId: 123,
          first_name: 'Truong',
          last_name: 'Duc',
          phoneNumber: '123456789',
          email: 'example@gmail.com',
          homeAddress: '123 Đường, Quận 7',
          currentLocation: '456 Đường, Quận 1',
        };
        resolve({
          token: 'fake-jwt-token',
          user: customerData,
        });
      } else {
        reject(new Error('Tên người dùng hoặc mật khẩu không đúng.'));
      }
    }, 1000);
  });

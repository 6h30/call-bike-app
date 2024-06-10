// import React from 'react';
// import LoginScreen from './Login'; 

// import { Provider } from 'react-redux';
// import store from './store'

// const App = () => {
//   return (
//     <Provider store={store}>
//       <LoginScreen />
//       </Provider>
//   );
// };

// export default App;

// import React from 'react';
// import LoginForm from './Login'; 


// const LoginTab = () => {
//   return (
//       <LoginForm />
//       // <RegisterForm />
//   );
// };

// export default LoginTab;


// import React from 'react';
// import HomePage from '../home'; 
// import MainScreen from '../mainScreen'; 

// import { NavigationContainer } from '@react-navigation/native';


// const LoginTab = () => {
//   return (
//     <NavigationContainer>
//       <HomePage />
//       </NavigationContainer>
//   );
// };

// export default LoginTab;

// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';

// import LoginForm from '../loginScreen/Login';
// import InfoForm from '../infoScreen';

// const Stack = createStackNavigator();

// const LoginTab = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Main">
//         <Stack.Screen name="Login" component={LoginForm} options={{ title: 'Đăng nhập' }} />
//         <Stack.Screen name="Info" component={InfoForm} options={{ title: 'Thông tin' }} />
//       </Stack.Navigator>
//       </NavigationContainer>
//   );
// };

// export default LoginTab;
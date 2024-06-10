// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
// import { Button, Text } from 'react-native-elements';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../actions/authSlide';
// import { useRouter } from 'expo-router';

// const LoginScreen = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const auth = useSelector(state => state.auth);
//   const router = useRouter();

//   const handleLogin = () => {
//     dispatch(login(username, password));
//   };

//   useEffect(() => {
//     if (auth.user) {
//       router.replace('/home'); // Điều hướng đến trang home sau khi đăng nhập thành công
//     }
//   }, [auth.user]);

//   return (
//     <View style={styles.container}>
//       {auth.error && (
//         <View style={styles.errorMessageContainer}>
//           <Text style={styles.errorMessage}>{auth.error}</Text>
//         </View>
//       )}
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button
//         title="Login"
//         onPress={handleLogin}
//         loading={auth.loading}
//         buttonStyle={styles.button}
//       />
//       {auth.loading && <ActivityIndicator size="large" color="#0000ff" />}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#DCDCDC',
//   },
//   errorMessageContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   errorMessage: {
//     color: '#ff0000',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     backgroundColor: 'white',
//   },
//   button: {
//     width: '100%',
//   },
// });

// export default LoginScreen;



// Trong LoginScreen.js
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../actions/authSlice';
// import { useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native'; // Đối với React Navigation v5 hoặc mới hơn

// const LoginScreen = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const auth = useSelector(state => state.auth);
//   const navigation = useNavigation(); // Sử dụng hook useNavigation để điều hướng

//   useEffect(() => {
//     if (auth.isAuthenticated) {
//       navigation.navigate('HomePage'); // Chuyển hướng đến trang HomePage khi đăng nhập thành công
//     }
//   }, [auth.isAuthenticated, navigation]);

//   const handleLogin = () => {
//     dispatch(login({ username, password }));
//   };

//   return (
//     <View style={styles.container}>
//       {auth.error && (
//         <View style={styles.errorMessageContainer}>
//           <Text style={styles.errorMessage}>{auth.error}</Text>
//         </View>
//       )}
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button
//         title="Login"
//         onPress={handleLogin}
//         loading={auth.loading}
//         buttonStyle={styles.button}
//       />
//       {auth.loading && <ActivityIndicator size="large" color="#0000ff" />}
//     </View>
//   );
// };

// export default LoginScreen;



// import React, { useState } from 'react';
// import { View, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
// import { Button, Text } from 'react-native-elements';
// import { useDispatch, useSelector } from 'react-redux';

// import { login } from '../actions/authSlice';

// const LoginForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const auth = useSelector(state => state.auth);

//   const handleLogin = () => {
//     dispatch(login(username, password));
//   };

//   return (
//     <View style={styles.container}>
//       {auth.error && (
//         <View style={styles.errorMessageContainer}>
//           <Text style={styles.errorMessage}>{auth.error}</Text>
//         </View>
//       )}
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button
//         title="Login"
//         onPress={handleLogin}
//         loading={auth.loading}
//         buttonStyle={styles.button}
//       />
//       {auth.loading && <ActivityIndicator size="large" color="#0000ff" />}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#DCDCDC',
//   },
//   errorMessageContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   errorMessage: {
//     color: '#ff0000',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     backgroundColor: 'white',
//   },
//   button: {
//     width: '100%',
//   },
// });

// export default LoginForm;



// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../actions/authSlice';

// const LoginForm = ({ navigation }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const auth = useSelector(state => state.auth);

//   const handleLogin = () => {
//     dispatch(login({ username, password }));
//   };

//   if (auth.isAuthenticated) {
//     navigation.replace('Main');
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Đăng nhập</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Tên người dùng"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Mật khẩu"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button
//         title="Đăng nhập"
//         onPress={handleLogin}
//         disabled={auth.loading}
//       />
//       {auth.loading && <ActivityIndicator size="large" color="#0000ff" />}
//       {auth.error && <Text style={styles.errorMessage}>{auth.error}</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     width: '100%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   errorMessage: {
//     color: 'red',
//     marginTop: 10,
//   },
// });

// export default LoginForm;




// import React, { useState } from 'react';
// import { View, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
// import { Button, Text } from 'react-native-elements';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '@/components/loginScreen/actions/authSlice';

// const LoginForm = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const auth = useSelector(state => state.auth);

//   const handleLogin = () => {
//     dispatch(login(username, password)).then(() => {
//       if (auth.isAuthenticated) {
//         onLogin();
//       }
//     });
//   };

//   return (
//     <View style={styles.container}>
//       {auth.error && (
//         <View style={styles.errorMessageContainer}>
//           <Text style={styles.errorMessage}>{auth.error}</Text>
//         </View>
//       )}
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button
//         title="Login"
//         onPress={() => {
//           handleLogin();
//         }}
//         loading={auth.loading}
//         buttonStyle={styles.button}
//       />

//       {auth.loading && <ActivityIndicator size="large" color="#0000ff" />}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#DCDCDC',
//   },
//   titleContainer: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     width: '100%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     backgroundColor: 'white',
//   },
//   errorMessageContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   errorMessage: {
//     color: '#ff0000',
//   },
//   button: {
//     width: '100%',
//   },
//   loggedContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


// export default LoginForm;



import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/components/loginScreen/actions/authSlice';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const handleLogin = () => {
    dispatch(login(username, password)).then(() => {
      if (auth.isAuthenticated) {
        onLogin();
      }
    });
  };

  return (
    <View style={styles.container}>
      {auth.error && (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessage}>{auth.error}</Text>
        </View>
      )}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Login"
        onPress={handleLogin}
        loading={auth.loading}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
      />
      {auth.loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#F9F9F9',
  },
  errorMessageContainer: {
    marginBottom: 20,
  },
  errorMessage: {
    color: '#ff0000',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    paddingVertical: 10,
  },
});

export default LoginForm;

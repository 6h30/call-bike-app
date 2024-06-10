// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Button, Text } from 'react-native-elements';
// import { useDispatch } from 'react-redux';
// import { performLogout } from '../loginScreen/actions/authSlice';
// import { useRouter } from 'expo-router';

// const HomePage = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const handleLogout = () => {
//     dispatch(performLogout());
//     router.replace('/login'); // Điều hướng đến trang login sau khi logout
//   };

//   return (
//     <View style={styles.container}>
//       <Text h1>Home</Text>
//       <Button title="Logout" onPress={handleLogout} buttonStyle={styles.button} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   button: {
//     marginTop: 20,
//     width: '100%',
//   },
// });

// export default HomePage;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { performLogout } from '../loginScreen/actions/authSlice';

const HomePage = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(performLogout());
  };

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title="Logout" onPress={handleLogout} buttonStyle={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
});

export default HomePage;

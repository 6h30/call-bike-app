
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { performLogout } from '../loginScreen/actions/authSlice';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';

const HomePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(performLogout());
    router.replace('/login'); 
  };

  return (
    <View style={styles.container}>
      <ThemedText>Home</ThemedText>
      <Button title="Login" onPress={handleLogout} buttonStyle={styles.button} />
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





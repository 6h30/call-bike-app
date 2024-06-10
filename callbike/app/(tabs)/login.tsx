import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus } from '@/components/loginScreen/actions/authSlice';
import LoginForm from '@/components/loginScreen/Login';
import { RootState, AppDispatch } from '@/components/loginScreen/store';
import { useRouter } from 'expo-router';

const LoginScreen: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    dispatch(checkAuthStatus()).then(() => {
      if (auth.isAuthenticated) {
        router.push('/mapcarSelection'); 
      }
    });
  }, [dispatch, auth.isAuthenticated, router]);

  const handleLogin = () => {
    router.push('/mapcarSelection'); 
  };

  return (
    <View style={styles.container}>
      <LoginFormContainer onLogin={handleLogin} />
    </View>
  );
};

const LoginFormContainer: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  return (
    <ThemedView style={styles.formContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>Welcome!</ThemedText>
      </ThemedView>
      <LoginForm onLogin={onLogin} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default LoginScreen;

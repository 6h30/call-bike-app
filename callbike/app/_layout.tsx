import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import store from '@/components/loginScreen/store';

import { useColorScheme } from '@/hooks/useColorScheme';


// Ngăn màn hình splash tự động ẩn trước khi việc tải tài nguyên hoàn thành.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });


  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="mapcarSelection" options={{ headerShown: false }} />
          <Stack.Screen name="not-found" />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
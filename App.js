import React, { useState, useEffect } from 'react';
import { Slot, router } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store, persistor } from './src/store/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
  async function checkFirstLaunch() {
    try {
      // For testing purposes, uncomment this line to force onboarding each time
      // await AsyncStorage.removeItem('hasLaunched');

      const hasLaunched = await AsyncStorage.getItem('hasLaunched');

      if (hasLaunched === null) {
        // First time launching the app
        router.replace('/onboarding');
        // Only set this to true AFTER onboarding is complete
        // We'll move this to the onboarding component
        // await AsyncStorage.setItem('hasLaunched', 'true');
      } else {
        // Not first launch, go to main app
        router.replace('/(tabs)');
      }

      setIsFirstLaunch(hasLaunched === null);
    } catch (error) {
      // Handle error
      console.error('Error checking first launch:', error);
      setIsFirstLaunch(false);
    }
  }

  checkFirstLaunch();
}, []);

  // Show nothing while checking if it's the first launch
  if (isFirstLaunch === null) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar style="light" />
          <Slot />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
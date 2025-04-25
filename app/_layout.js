import { Slot, Stack } from 'expo-router';
import { useState, useEffect } from 'react';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Just mark as ready after component mounts
    setIsReady(true);
  }, []);

  // Simply render the Slot component - this is crucial
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
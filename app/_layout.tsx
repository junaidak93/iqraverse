import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { Suspense, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import dbConstants from '../constants/db-constants';
import { AppProvider } from '@/providers/app-provider';
import { setAudioModeAsync } from 'expo-audio';

export default function RootLayout() {
  const dbPath = require('../assets/database/quran.db');

  useEffect(() => {
    const initAudio = async () => {
      await setAudioModeAsync({
        playsInSilentMode: true,
      });
    };

    initAudio();
  }, []);

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider
        databaseName={dbConstants.DATABASE_NAME}
        assetSource={{ assetId: dbPath }}
      >
        <AppProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="ayahs" />
            <Stack.Screen 
              name="details"
              options={{
                headerBackButtonDisplayMode: "default",
                presentation: "modal",
                sheetAllowedDetents: [1],
                sheetGrabberVisible: true,
                sheetCornerRadius: 20,
                headerShown: false
              }}
            />
            <Stack.Screen name="settings" />
            <Stack.Screen name="profile" />
            <Stack.Screen name="auth-success" />
          </Stack>
        </AppProvider>
      </SQLiteProvider>
    </Suspense>
  );
}
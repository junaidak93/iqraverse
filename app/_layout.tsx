import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { Suspense } from 'react';
import { ActivityIndicator } from 'react-native';
import dbConstants from '../constants/db-constants';
import { ThemeProvider } from '@/providers/theme-provider';

export default function RootLayout() {
  const dbPath = require('../assets/database/quran.db');

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider
        databaseName={dbConstants.DATABASE_NAME}
        assetSource={{ assetId: dbPath }}
      >
        <ThemeProvider>
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
          </Stack>
        </ThemeProvider>
      </SQLiteProvider>
    </Suspense>
  );
}
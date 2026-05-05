import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { Suspense } from 'react';
import { ActivityIndicator } from 'react-native';
import dbConstants from '../constants/db-constants';

export default function RootLayout() {
  const dbPath = require('../assets/database/quran.db');

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider
        databaseName={dbConstants.DATABASE_NAME}
        assetSource={{ assetId: dbPath }}
      >
        <Stack screenOptions={{ headerShown: false }} />
      </SQLiteProvider>
    </Suspense>
  );
}
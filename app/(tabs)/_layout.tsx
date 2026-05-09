import React, { useContext, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { StatusBar, useWindowDimensions, View } from 'react-native';
import AppHeader from '@/components/app-header';
import { ThemeContext } from '@/providers/contexts';

const Tab = createMaterialTopTabNavigator();

// This connects React Navigation with Expo Router
const TopTabs = withLayoutContext(Tab.Navigator);

export default function TabsLayout() {

  const { width } = useWindowDimensions();
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? '#0f1511' : '#F7F9F8' }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} translucent={true} backgroundColor="transparent" />
      <AppHeader title='IqraVerse' />
      
      <TopTabs
        screenOptions={{
          tabBarGap: 0,
          tabBarShowLabel: true,
          tabBarScrollEnabled: true,
          tabBarLabelStyle: {
            fontWeight: '700',
            textTransform: 'capitalize',
            alignContent: 'center',
            alignItems: 'stretch',
            marginTop: 10,
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#1E7F5C',
            height: 3,
            borderRadius: 10,
            marginHorizontal: 0,
          },
          tabBarStyle: {
            backgroundColor: isDarkMode ? '#222' : '#fff',
            elevation: 10,
          },
          tabBarItemStyle: {
            width: width / 2,
            paddingHorizontal: 0,
            marginStart: 0
          },
          tabBarActiveTintColor: '#1E7F5C',
          tabBarInactiveTintColor: '#999',
        }}
      >
        <TopTabs.Screen
          name="surahs"
          options={{ title: 'By Surah' }}
        />
        <TopTabs.Screen
          name="parahs"
          options={{ title: 'By Juz' }}
        />
      </TopTabs>
    </View>
  );
}
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { ColorScheme } from '@/helper/color-scheme-helper';
import { StatusBar, View } from 'react-native';

const Tab = createMaterialTopTabNavigator();

// This connects React Navigation with Expo Router
const TopTabs = withLayoutContext(Tab.Navigator);

export default function TabsLayout() {

  return (
      <TopTabs
        screenOptions={{
          tabBarGap: 90,
          tabBarShowLabel: true,
          tabBarScrollEnabled: true,
          tabBarLabelStyle: {
            fontWeight: '900',
            textTransform: 'none',
            alignContent: 'center',
            alignItems: 'stretch',
            marginTop: 50,
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#1E7F5C',
            height: 3,
            borderRadius: 10,
            marginHorizontal: 0,
          },
          tabBarStyle: {
            backgroundColor: ColorScheme.isDarkMode ? '#222' : '#fff',
            elevation: 10,
          },
          tabBarItemStyle: {
            width: 'auto',
            paddingHorizontal: 12,
            marginStart: 10
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
  );
}
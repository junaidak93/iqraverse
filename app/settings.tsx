import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  StatusBar,
  ScrollView,
} from 'react-native';

import AppHeader from '@/components/app-header';

import { Ionicons } from '@expo/vector-icons';

import reciters from '@/assets/static-data/reciters';

import { Dropdown } from 'react-native-element-dropdown';

import { AppContext } from '@/providers/contexts';

import { Image } from 'expo-image';

import { getUserProfile, loginWithQuran } from '@/services/quran-api/user-oauth-service';

import { router } from 'expo-router';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function SettingsScreen() {

  const {
    isDarkMode,
    autoPlayNextAyah,
    updateAutoPlayNextAyah,
    theme,
    updateTheme,
    reciterId,
    updateReciterId,
    profile,
    updateProfile,
    updateUserToken
  } = useContext(AppContext);

  const [reciter, setReciter] =
    useState(
      reciters.find(
        r => r.id === reciterId
      )
    );

  async function openLoginPage() {
    if (profile) {
      router.navigate('/profile');
    } else {
      const token = await loginWithQuran();

      if (token) {
        updateUserToken(token);

        let _profile = await getUserProfile(token);

        if (_profile) {
          updateProfile(_profile);
        }
      }
    }
  }

  function getReciterItem(item: any) {
    return (
      <View style={styles.dropdownItem}>
        <Image
          source={item.image}
          style={styles.avatar}
          placeholder={blurhash}
          contentFit="cover"
        />

        <View style={styles.dropdownText}>
          <Text
            style={[
              styles.dropdownTitle,
              {
                color: isDarkMode
                  ? '#F3F4F6'
                  : '#111827',
              },
            ]}
          >
            {item.reciter_name}
          </Text>

          <Text
            style={[
              styles.dropdownSubtitle,
              {
                color: isDarkMode
                  ? '#9CA3AF'
                  : '#6B7280',
              },
            ]}
          >
            {item.style}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            isDarkMode
              ? '#0B100D'
              : '#F5F7F6',
        },
      ]}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={
          isDarkMode
            ? 'light-content'
            : 'dark-content'
        }
      />

      <AppHeader
        title="Settings"
        showBack={true}
        showSettings={false}
        showThemeToggle={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        {/* RECITATION */}
        <View style={styles.section}>
          <Text style={styles.heading}>
            Recitation
          </Text>

          <Dropdown
            style={[
              styles.dropdown,
              {
                backgroundColor:
                  isDarkMode
                    ? '#151C18'
                    : '#FFFFFF',

                borderColor:
                  isDarkMode
                    ? '#1F2A24'
                    : '#E5E7EB',
              },
            ]}
            containerStyle={[
              styles.dropdownContainer,
              {
                backgroundColor:
                  isDarkMode
                    ? '#151C18'
                    : '#FFFFFF',
              },
            ]}
            placeholderStyle={
              styles.placeholderStyle
            }
            selectedTextStyle={[
              styles.selectedTextStyle,
              {
                color: isDarkMode
                  ? '#F9FAFB'
                  : '#111827',
              },
            ]}
            selectedTextProps={{
              numberOfLines: 2,
            }}
            data={reciters}
            labelField="reciter_name"
            valueField="id"
            value={reciter?.id}
            autoScroll={true}
            onChange={item => {
              setReciter(item);
              updateReciterId(item.id);
            }}
            renderItem={item =>
              getReciterItem(item)
            }
            renderLeftIcon={() => {
              const selected =
                reciters.find(
                  r =>
                    r.id === reciter?.id
                );

              return selected ? (
                <Image
                  source={selected.image}
                  style={styles.avatar}
                  placeholder={blurhash}
                  contentFit="cover"
                />
              ) : null;
            }}
          />
        </View>

        {/* PLAYBACK */}
        <View style={styles.section}>
          <Text style={styles.heading}>
            Playback
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor:
                  isDarkMode
                    ? '#151C18'
                    : '#FFFFFF',

                borderColor:
                  isDarkMode
                    ? '#1F2A24'
                    : '#E5E7EB',
              },
            ]}
          >
            <View
              style={styles.rowContent}
            >
              <Ionicons
                name="play-circle-outline"
                size={22}
                color="#1E7F5C"
              />

              <Text
                style={[
                  styles.cardText,
                  {
                    color:
                      isDarkMode
                        ? '#F9FAFB'
                        : '#111827',
                  },
                ]}
              >
                Autoplay next ayah
              </Text>
            </View>

            <Switch
              value={
                autoPlayNextAyah
              }
              onValueChange={value =>
                updateAutoPlayNextAyah(
                  value
                )
              }
              trackColor={{
                false: '#767577',
                true: '#1E7F5C',
              }}
            />
          </View>
        </View>

        {/* APPEARANCE */}
        <View style={styles.section}>
          <Text style={styles.heading}>
            Appearance
          </Text>

          {[
            'system',
            'dark',
            'light',
          ].map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.card,
                {
                  backgroundColor:
                    isDarkMode
                      ? '#151C18'
                      : '#FFFFFF',

                  borderColor:
                    isDarkMode
                      ? '#1F2A24'
                      : '#E5E7EB',
                },
              ]}
              onPress={() =>
                updateTheme(
                  option as any
                )
              }
              activeOpacity={0.8}
            >
              <View
                style={styles.rowContent}
              >
                <Ionicons
                  name={
                    option ===
                    'system'
                      ? 'phone-portrait-outline'
                      : option ===
                          'dark'
                        ? 'moon-outline'
                        : 'sunny-outline'
                  }
                  size={20}
                  color="#1E7F5C"
                />

                <Text
                  style={[
                    styles.cardText,
                    {
                      color:
                        isDarkMode
                          ? '#F9FAFB'
                          : '#111827',
                    },
                  ]}
                >
                  {option
                    .charAt(0)
                    .toUpperCase() +
                    option.slice(1)}
                </Text>
              </View>

              {theme === option && (
                <Ionicons
                  name="checkmark-circle"
                  size={22}
                  color="#1E7F5C"
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* ACCOUNT */}
        <View style={styles.section}>
          <Text style={styles.heading}>
            Account
          </Text>

          {/* LOGIN BUTTON */}
          <TouchableOpacity
            style={[
              styles.card,
              {
                backgroundColor:
                  isDarkMode
                    ? '#151C18'
                    : '#FFFFFF',

                borderColor:
                  isDarkMode
                    ? '#1F2A24'
                    : '#E5E7EB',
              },
            ]}
            activeOpacity={0.8}
            onPress={openLoginPage}
          >
            <View
              style={styles.rowContent}
            >
              <Ionicons
                name="person-circle-outline"
                size={24}
                color="#1E7F5C"
              />

              <View
                style={{
                  marginLeft: 12,
                }}
              >
                <Text
                  style={[
                    styles.cardText,
                    {
                      marginLeft: 0,
                      color:
                        isDarkMode
                          ? '#F9FAFB'
                          : '#111827',
                    },
                  ]}
                >
                  {profile ? `${profile.firstName} ${profile.lastName}` : 'Login with Quran.com'} 
                </Text>

                <Text
                  style={{
                    marginTop: 2,
                    fontSize: 13,
                    color:
                      isDarkMode
                        ? '#9CA3AF'
                        : '#6B7280',
                  }}
                >
                  {profile ? `${profile.username}` : 'Sync your bookmarks'} 
                  
                </Text>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={
                isDarkMode
                  ? '#6B7280'
                  : '#9CA3AF'
              }
            />
          </TouchableOpacity>
        </View>

        {/* ABOUT */}
        <View style={styles.section}>
          <Text style={styles.heading}>
            About
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor:
                  isDarkMode
                    ? '#151C18'
                    : '#FFFFFF',

                borderColor:
                  isDarkMode
                    ? '#1F2A24'
                    : '#E5E7EB',
              },
            ]}
          >
            <View
              style={styles.rowContent}
            >
              <Ionicons
                name="book-outline"
                size={22}
                color="#1E7F5C"
              />

              <View
                style={{
                  marginLeft: 12,
                }}
              >
                <Text
                  style={[
                    styles.cardText,
                    {
                      marginLeft: 0,
                      color:
                        isDarkMode
                          ? '#F9FAFB'
                          : '#111827',
                    },
                  ]}
                >
                  Powered by Quran.com
                </Text>

                <Text
                  style={{
                    marginTop: 2,
                    fontSize: 13,
                    color:
                      isDarkMode
                        ? '#9CA3AF'
                        : '#6B7280',
                  }}
                >
                  Content APIs & ecosystem
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  section: {
    marginTop: 26,
    paddingHorizontal: 18,
  },

  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1E7F5C',
  },

  card: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderWidth: 1,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  cardText: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },

  dropdown: {
    height: 68,
    borderRadius: 20,
    paddingHorizontal: 16,

    borderWidth: 1,
  },

  dropdownContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 0,
  },

  placeholderStyle: {
    fontSize: 16,
  },

  selectedTextStyle: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },

  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },

  dropdownText: {
    marginLeft: 12,
  },

  dropdownTitle: {
    fontSize: 16,
    fontWeight: '600',
  },

  dropdownSubtitle: {
    marginTop: 2,
    fontSize: 12,
  },
});
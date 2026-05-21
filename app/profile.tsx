import React, { useContext, useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { Image } from 'expo-image';

import { Ionicons } from '@expo/vector-icons';

import AppHeader from '@/components/app-header';

import { AppContext } from '@/providers/contexts';
import { getUserProfile, logout, refreshToken } from '@/services/quran-api/user-oauth-service';
import { router } from 'expo-router';
import { syncBookmarks } from '@/services/quran-api/bookmark-service';
import { ReadState } from '@/models/read-state';

export default function UserProfileScreen() {

  const { 
    isDarkMode, 
    userToken, 
    updateUserToken, 
    profile, 
    updateProfile, 
    clearProfile, 
    clearUserToken,
    bookmarks,
    updateBookmarks
  } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const avatar =
    profile?.avatarUrls?.medium ||
    profile?.avatarUrls?.small ||
    profile?.avatarUrls?.large;

  useEffect(()=> {
    async function fetchUpdatedProfile(attempt = 0) {
        if (userToken) {
            setIsLoading(true);

            const _profile = await getUserProfile(userToken);
            
            if (_profile) {
                updateProfile(_profile);
                setIsLoading(false);
            } else if (attempt === 0) {
                const _token = await refreshToken(userToken);

                if (_token) {
                    updateUserToken(_token);
                    fetchUpdatedProfile(1);
                } else {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }

    fetchUpdatedProfile();
  }, []);

  const onSyncBookmarks = async (attempt = 0) => {
    if (userToken) {
        setIsLoading(true);

        const response = await syncBookmarks(userToken, bookmarks ?? []);

        if (response) {
            updateBookmarks(response as ReadState[]);
            setIsLoading(false);
            Alert.alert('Bookmarks have been synced');
        } else if (attempt === 0) {
            const _token = await refreshToken(userToken);

            if (_token) {
                updateUserToken(_token);
                onSyncBookmarks(1);
            } else {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    } else {
        setIsLoading(false);
    }
  };

  const onLogout = async () => {

    Alert.alert(
        'Logout',
        'Are you sure you want to logout?\n\nYou may lose access to synced data and personalized features until you login again.',
        [
        {
            text: 'Cancel',
            style: 'cancel',
        },
        {
            text: 'Logout',
            style: 'destructive',
            onPress: async () => {
                try {
                    await logout();
                    clearProfile();
                    clearUserToken();
                    router.back();
                } catch (e) {
                    console.error(e);
                }
            },
        },
        ],
        {
            cancelable: true,
        }
    );
    };

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
        title="Profile"
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
        {/* HERO */}
        <View
          style={[
            styles.heroCard,
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
          {/* Avatar */}
          {avatar ? (
            <Image
              source={{ uri: avatar }}
              style={styles.avatar}
              contentFit="cover"
            />
          ) : (
            <View
              style={[
                styles.placeholderAvatar,
                {
                  backgroundColor:
                    isDarkMode
                      ? '#1F2A24'
                      : '#E5E7EB',
                },
              ]}
            >
              <Ionicons
                name="person"
                size={42}
                color="#1E7F5C"
              />
            </View>
          )}

          {/* Name */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 16,
            }}
          >
            <Text
              style={[
                styles.name,
                {
                  color:
                    isDarkMode
                      ? '#F9FAFB'
                      : '#111827',
                },
              ]}
            >
              {profile?.firstName}{' '}
              {profile?.lastName}
            </Text>

            {profile?.verified && (
              <Ionicons
                name="checkmark-circle"
                size={20}
                color="#1E7F5C"
                style={{
                  marginLeft: 6,
                }}
              />
            )}
          </View>

          {/* Username */}
          <Text
            style={[
              styles.username,
              {
                color:
                  isDarkMode
                    ? '#9CA3AF'
                    : '#6B7280',
              },
            ]}
          >
            @{profile?.username}
          </Text>

          {/* Bio */}
          {!!profile?.bio && (
            <Text
              style={[
                styles.bio,
                {
                  color:
                    isDarkMode
                      ? '#D1D5DB'
                      : '#374151',
                },
              ]}
            >
              {profile?.bio}
            </Text>
          )}

          {/* Meta */}
          <View style={styles.metaRow}>
            <View
              style={styles.metaItem}
            >
              <Text
                style={[
                  styles.metaValue,
                  {
                    color:
                      isDarkMode
                        ? '#F9FAFB'
                        : '#111827',
                  },
                ]}
              >
                {profile?.postsCount}
              </Text>

              <Text
                style={[
                  styles.metaLabel,
                  {
                    color:
                      isDarkMode
                        ? '#9CA3AF'
                        : '#6B7280',
                  },
                ]}
              >
                Posts
              </Text>
            </View>

            <View
              style={styles.metaItem}
            >
              <Text
                style={[
                  styles.metaValue,
                  {
                    color:
                      isDarkMode
                        ? '#F9FAFB'
                        : '#111827',
                  },
                ]}
              >
                {profile?.followersCount}
              </Text>

              <Text
                style={[
                  styles.metaLabel,
                  {
                    color:
                      isDarkMode
                        ? '#9CA3AF'
                        : '#6B7280',
                  },
                ]}
              >
                Followers
              </Text>
            </View>

            <View
              style={styles.metaItem}
            >
              <Text
                style={[
                  styles.metaValue,
                  {
                    color:
                      isDarkMode
                        ? '#F9FAFB'
                        : '#111827',
                  },
                ]}
              >
                {profile?.likesCount}
              </Text>

              <Text
                style={[
                  styles.metaLabel,
                  {
                    color:
                      isDarkMode
                        ? '#9CA3AF'
                        : '#6B7280',
                  },
                ]}
              >
                Likes
              </Text>
            </View>
          </View>
        </View>

        {/* ACCOUNT INFO */}
        <View
          style={{
            paddingHorizontal: 18,
            marginTop: 28,
          }}
        >
          <Text style={styles.heading}>
            Account
          </Text>

          <View
            style={[
              styles.infoCard,
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
            <InfoRow
              label="Country"
              value={
                profile?.country ||
                'Not specified'
              }
              isDarkMode={isDarkMode}
            />

            <InfoRow
              label="Language"
              value={
                profile?.languageIsoCode?.toUpperCase()
              }
              isDarkMode={isDarkMode}
            />

            <InfoRow
              label="Joined"
              value={profile?.createdAt}
              isDarkMode={isDarkMode}
            />
          </View>
        </View>

        {/* ACTIONS */}
        <View
          style={{
            paddingHorizontal: 18,
            marginTop: 28,
          }}
        >
          <Text style={styles.heading}>
            Actions
          </Text>

          <TouchableOpacity
            style={[
              styles.actionCard,
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
            onPress={() => onSyncBookmarks()}
            activeOpacity={0.8}
          >
            <View
              style={styles.actionLeft}
            >
              <Ionicons
                name="sync-outline"
                size={22}
                color="#1E7F5C"
              />

              <Text
                style={[
                  styles.actionText,
                  {
                    color:
                      isDarkMode
                        ? '#F9FAFB'
                        : '#111827',
                  },
                ]}
              >
                Sync Bookmarks
              </Text>
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

          <TouchableOpacity
            style={[
              styles.actionCard,
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
            onPress={onLogout}
            activeOpacity={0.8}
          >
            <View
              style={styles.actionLeft}
            >
              <Ionicons
                name="log-out-outline"
                size={22}
                color="#DC2626"
              />

              <Text
                style={[
                  styles.actionText,
                  {
                    color:
                      isDarkMode
                        ? '#F9FAFB'
                        : '#111827',
                  },
                ]}
              >
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {isLoading && (<View style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#1E7F5C" size="small" />
      </View>)}
    </View>
  );
}

function InfoRow({
  label,
  value,
  isDarkMode,
}: any) {
  return (
    <View style={styles.infoRow}>
      <Text
        style={[
          styles.infoLabel,
          {
            color: isDarkMode
              ? '#9CA3AF'
              : '#6B7280',
          },
        ]}
      >
        {label}
      </Text>

      <Text
        style={[
          styles.infoValue,
          {
            color: isDarkMode
              ? '#F9FAFB'
              : '#111827',
          },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  heroCard: {
    marginTop: 24,
    marginHorizontal: 18,
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  placeholderAvatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },

  name: {
    fontSize: 24,
    fontWeight: '700',
  },

  username: {
    marginTop: 6,
    fontSize: 15,
  },

  bio: {
    marginTop: 14,
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 15,
  },

  metaRow: {
    flexDirection: 'row',
    marginTop: 28,
  },

  metaItem: {
    alignItems: 'center',
    marginHorizontal: 18,
  },

  metaValue: {
    fontSize: 18,
    fontWeight: '700',
  },

  metaLabel: {
    marginTop: 4,
    fontSize: 13,
  },

  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1E7F5C',
  },

  infoCard: {
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
  },

  infoRow: {
    marginBottom: 18,
  },

  infoLabel: {
    fontSize: 13,
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },

  actionCard: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,

    borderWidth: 1,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionText: {
    marginLeft: 14,
    fontSize: 16,
    fontWeight: '500',
  },
});
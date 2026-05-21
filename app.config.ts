const env = process.env;

export default {
  expo: {
    name: "IqraVerse",
    slug: "iqraverse",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "iqraverse",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    assetBundlePatterns: ["assets/**/*"],
    // splash: {
    //     image: "./assets/images/splash-icon.png",
    //     resizeMode: "contain"
    // },
    androidStatusBar: {
        translucent: true
    },
    ios: {
        bundleIdentifier: "app.iqraverse",
        supportsTablet: true
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/images/icon.png",
            backgroundColor: "#0f1511"
        },
        package: "app.iqraverse",
        edgeToEdgeEnabled: true,
        softwareKeyboardLayoutMode: "resize",
        predictiveBackGestureEnabled: false,
        permissions: [
            "android.permission.RECORD_AUDIO",
            "android.permission.MODIFY_AUDIO_SETTINGS",
            "android.permission.RECORD_AUDIO",
            "android.permission.MODIFY_AUDIO_SETTINGS"
        ],
        intentFilters: [
            {
                action: "VIEW",
                autoVerify: true,
                data: [
                    {
                        scheme: "iqraverse",
                        host: "auth-success"
                    }
                ],
                category: [
                    "BROWSABLE",
                    "DEFAULT"
                ]
            }
        ]
    },
    web: {
        output: "static",
        favicon: "./assets/images/icon.png"
    },
    plugins: [
        "expo-router",
        [
        "expo-splash-screen",
        {
            image: "./assets/images/splash-icon.png",
            imageWidth: 200,
            resizeMode: "contain",
            backgroundColor: "#F7F9F8",
            dark: {
                image: "./assets/images/splash-icon.png",
                backgroundColor: "#0f1511"
            }
        }
        ],
        "expo-sqlite",
        "expo-asset",
        "expo-font",
        "expo-secure-store",
        [
        "expo-audio",
        {
            microphonePermission: "Allow IqraVerse to access your microphone.",
            enableBackgroundPlayback: true,
            enableBackgroundRecording: false
        }
        ]
    ],
    experiments: {
        typedRoutes: true,
        reactCompiler: true
    },
    extra: {
        router: {},
        eas: {
            projectId: "92cb2e6c-27ac-4575-8cdf-e2fd00119819"
        },

        API_BASE_URL: env.API_BASE_URL,
        CONTENT_LOGIN_ENDPOINT: env.CONTENT_LOGIN_ENDPOINT,
        USER_LOGIN_ENDPOINT: env.USER_LOGIN_ENDPOINT,
        USER_PROFILE_ENDPOINT: env.USER_PROFILE_ENDPOINT,
        DEEP_LINK: env.DEEP_LINK,
        APPLICATION_ID: env.APPLICATION_ID,
        QURAN_LOGOUT_URL: env.QURAN_LOGOUT_URL,
        TOKEN_REFRESH_ENDPOINT: env.TOKEN_REFRESH_ENDPOINT,
        BOOKMARKS_ENDPOINT: env.BOOKMARKS_ENDPOINT,
        BOOKMARKS_SYNC_ENDPOINT: env.BOOKMARKS_SYNC_ENDPOINT
    },
    owner: "junaidak93",
    runtimeVersion: {
        policy: "appVersion"
    },
    updates: {
        url: "https://u.expo.dev/92cb2e6c-27ac-4575-8cdf-e2fd00119819"
    }
    }
};

const env = process.env;

export default {
  expo: {
    name: "IqraVerse",
    slug: "iqraverse",
    version: "1.0.0",
    orientation: "default",
    icon: "./assets/images/icon.png",
    scheme: "iqraverse",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
        image: "./assets/images/splash-icon.png",
        resizeMode: "contain"
    },
    androidStatusBar: {
        barStyle: "dark-content",
        translucent: true,
        backgroundColor: "#000000"
    },
    ios: {
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
            backgroundColor: "#000000",
            dark: {
            backgroundColor: "#ffffff"
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

        //# Application Settings
        PORT: env.PORT,
        NODE_ENV: env.NODE_ENV,

        //# Database Configuration
        DATABASE_NAME: env.DATABASE_NAME,
        DB_USER: env.DB_USER,
        DB_PASS: env.DB_PASS,

        //# Table Names
        TABLE_PARAH: env.TABLE_PARAH,
        TABLE_SURAH: env.TABLE_SURAH,
        TABLE_AYAH: env.TABLE_AYAH,

        //# Column Names
        PARAH_ID: env.PARAH_ID,
        SURAH_ID: env.SURAH_ID,
        AYAH_ID: env.AYAH_ID,
        PARAH_ID_PLURAL: env.PARAH_ID_PLURAL,
        ARABIC_NAME: env.ARABIC_NAME,
        ENGLISH_NAME: env.ENGLISH_NAME,
        NUMBER_OF_AYAH: env.NUMBER_OF_AYAH,
        NUMBER_OF_RAKU: env.NUMBER_OF_RAKU,

        //# URL
        EXPO_PUBLIC_QURAN_API_CONTENT_BASE_URL: env.EXPO_PUBLIC_QURAN_API_CONTENT_BASE_URL,
        EXPO_PUBLIC_QURAN_API_OAUTH_BASE_URL: env.EXPO_PUBLIC_QURAN_API_OAUTH_BASE_URL,
        EXPO_PUBLIC_QURAN_VERSES_URL: env.EXPO_PUBLIC_QURAN_VERSES_URL,

        //# API Props
        EXPO_PUBLIC_KEY_CLIENT_ID: env.EXPO_PUBLIC_KEY_CLIENT_ID,
        EXPO_PUBLIC_KEY_GRANT_TYPE: env.EXPO_PUBLIC_KEY_GRANT_TYPE,
        EXPO_PUBLIC_KEY_SCOPE: env.EXPO_PUBLIC_KEY_SCOPE,
        EXPO_PUBLIC_VALUE_GRANT_TYPE: env.EXPO_PUBLIC_VALUE_GRANT_TYPE,
        EXPO_PUBLIC_VALUE_SCOPE: env.EXPO_PUBLIC_VALUE_SCOPE,

        //# API Keys
        EXPO_PUBLIC_QURAN_API_CLIENT_ID: env.EXPO_PUBLIC_QURAN_API_CLIENT_ID,
        EXPO_PUBLIC_QURAN_API_CLIENT_SECRET: env.EXPO_PUBLIC_QURAN_API_CLIENT_SECRET
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
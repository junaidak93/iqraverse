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
    splash: {
        image: "./assets/images/splash-icon.png",
        resizeMode: "contain"
    },
    androidStatusBar: {
        translucent: true
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
            backgroundColor: "#F7F9F8",
            dark: {
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
        LOGIN_ENDPOINT: env.LOGIN_ENDPOINT,
        APPLICATION_ID: env.APPLICATION_ID,
        SALT: env.SALT
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
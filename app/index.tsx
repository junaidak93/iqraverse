import { Redirect } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { getTranslationResources } from "@/services/quran-api/translation-service";
import { getTafsirResources } from "@/services/quran-api/tafsir-service";
import { getAccessToken } from "@/services/quran-api/oauth-service";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function Index() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        async function fetchResources() {
            try {
                await getAccessToken();

                await Promise.all([
                    getTranslationResources(), 
                    getTafsirResources()
                ]);
            } catch (e) {
                console.warn(e);
            } finally {
                setIsReady(true);
            }
        }

        fetchResources();
    }, []);

    useEffect(() => {
        if (isReady) {
            SplashScreen.hide();
        }
    }, [isReady]);

    if (!isReady) {
        return null;
    }

    return <Redirect href="/(tabs)/surahs" />;
}
import { Redirect } from "expo-router";
// import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { getTranslationResources } from "@/services/quran-api/translation-service";
import { getTafsirResources } from "@/services/quran-api/tafsir-service";
import { getAccessToken } from "@/services/quran-api/content-oauth-service";
import Splash from "@/components/splash";

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

export default function Index() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const startTime = Date.now();

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
                const elapsed = Date.now() - startTime;
                const minimumSplashTime = 2000; // Minimum time to show splash screen (in milliseconds)
                const timeToWait = Math.max(0, minimumSplashTime - elapsed);
                setTimeout(() => {
                    setIsReady(true);
                }, timeToWait);
            }
        }

        fetchResources();
    }, []);

    // useEffect(() => {
    //     if (isReady) {
    //         SplashScreen.hide();
    //     }
    // }, [isReady]);

    if (!isReady) {
        return <Splash />;
    }

    return <Redirect href="/(tabs)/surahs" />;
}
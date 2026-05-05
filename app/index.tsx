import { ColorScheme } from "@/helper/color-scheme-helper";
import { Redirect } from "expo-router";
import { useColorScheme } from 'react-native';

export default function Index() {
    ColorScheme.isDarkMode = useColorScheme() === "dark";
    return <Redirect href="/(tabs)/surahs" />;
}
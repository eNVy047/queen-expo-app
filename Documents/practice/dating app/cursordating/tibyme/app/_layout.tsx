import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { LogBox } from "react-native";
import "@/global.css";

import { AuthProvider } from "@/context/AuthContext";

SplashScreen.preventAutoHideAsync(); // 👈 Keep splash screen up

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}

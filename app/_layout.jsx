import { StyleSheet, Text, View } from "react-native";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import GlobalProvider from "../context/GlobalProvider";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "AveriaSerifLibre-Bold": require("../assets/fonts/AveriaSerifLibre-Bold.ttf"),
    "AveriaSerifLibre-BoldItalic": require("../assets/fonts/AveriaSerifLibre-BoldItalic.ttf"),
    "AveriaSerifLibre-Italic": require("../assets/fonts/AveriaSerifLibre-Italic.ttf"),
    "AveriaSerifLibre-Light": require("../assets/fonts/AveriaSerifLibre-Light.ttf"),
    "AveriaSerifLibre-LightItalic": require("../assets/fonts/AveriaSerifLibre-LightItalic.ttf"),
    "AveriaSerifLibre-Regular": require("../assets/fonts/AveriaSerifLibre-Regular.ttf"),
    "YesevaOne-Regular": require("../assets/fonts/YesevaOne-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/*<Stack.Screen name="/search/[query]" options={{ headerShown: false }} />*/}
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;

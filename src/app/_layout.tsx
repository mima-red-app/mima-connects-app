import { Stack } from "expo-router";
import { HeroUINativeProvider } from "heroui-native/provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Loader from "@/components/Loader";
import "../global.css";

export default function RootLayout() {
  const { user, isLoading } = useAuth();
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular: require("../../assets/fonts/Poppins_400Regular.ttf"),
    Poppins_500Medium: require("../../assets/fonts/Poppins_500Medium.ttf"),
    Poppins_600SemiBold: require("../../assets/fonts/Poppins_600SemiBold.ttf"),
    Poppins_700Bold: require("../../assets/fonts/Poppins_700Bold.ttf"),
    Poppins_800ExtraBold: require("../../assets/fonts/Poppins_800ExtraBold.ttf"),
  });

  if (fontError) {
    console.warn("[RootLayout] font load failed:", fontError);
  }

  if (!fontsLoaded && !fontError) {
    return <Loader />;
  }

  const providers = (children: React.ReactNode) => (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <HeroUINativeProvider>{children}</HeroUINativeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );

  if (isLoading) {
    return providers(<Loader />);
  }

  return providers(
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(tab)" />
        <Stack.Screen name="professional/[id]" />
      </Stack.Protected>
    </Stack>
  );
}
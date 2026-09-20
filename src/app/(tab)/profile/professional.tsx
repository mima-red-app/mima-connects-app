import { ActivityIndicator, Alert, Linking, Pressable, ScrollView, View } from "react-native";
import { router } from "expo-router";
import { Avatar, Button } from "heroui-native";
import { MapPin, MessageCircle, Pencil, Phone, Star, Users } from "lucide-react-native";
import { useThemeColor } from "heroui-native/hooks";
import Header from "@/components/Header";
import AppText from "@/components/Text";
import ImageCarousel from "@/components/ImageCarousel";
import { useProfessional } from "@/features/professional/hooks/useProfessional";
import { useCurrentUser } from "@/features/profile/hooks/useCurrentUser";
import { useTypeScale } from "@/util/responsive";

export default function MyProfessionalScreen() {
  const t = useTypeScale();
  const accent = useThemeColor("accent");
  const { email } = useCurrentUser();

  // We need to find the professional profile for the current user
  // For now, we'll use the same useProfessional hook but need the profile ID
  // This will be resolved when we have a proper "my professional profile" endpoint

  return (
    <View className="flex-1 bg-background">
      <Header title="Mi perfil profesional" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          gap: 20,
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center gap-4 py-4">
          <AppText
            className="text-center text-gray-500 dark:text-[#9ca3af]"
            style={{ fontSize: t.body }}
          >
            Tu perfil profesional está activo.
          </AppText>
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onPress={() => router.push("/become-professional")}
          >
            <View className="flex-row items-center gap-2">
              <Pencil size={16} color="#ffffff" />
              <AppText className="font-bold text-white" style={{ fontSize: t.body }}>
                Editar perfil profesional
              </AppText>
            </View>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

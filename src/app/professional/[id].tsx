import { Alert, ScrollView, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Avatar, Button } from "heroui-native";
import { MapPin, Star, Users } from "lucide-react-native";
import Header from "@/components/Header";
import AppText from "@/components/Text";
import ReviewList from "@/components/review/ReviewList";
import { PROFESSIONALS } from "@/features/professional/data/professionals";
import { useTypeScale } from "@/util/responsive";

export default function ProfessionalProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const t = useTypeScale();
  const professional = PROFESSIONALS.find((p) => p.id === id);

  if (!professional) {
    return (
      <View className="flex-1 bg-background">
        <Header title="Perfil" />
        <View className="flex-1 items-center justify-center gap-4 px-8">
          <AppText
            className="text-center font-semibold"
            style={{ fontSize: t.title }}
          >
            Profesional no encontrado
          </AppText>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onPress={() => router.back()}
          >
            Volver
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <Header title="Perfil profesional" />
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
        <View className="items-center gap-1">
          <Avatar size="lg" style={{ width: 96, height: 96 }}>
            <Avatar.Fallback>{professional.initials}</Avatar.Fallback>
          </Avatar>
          <AppText
            className="font-bold text-foreground"
            style={{ fontSize: t.sectionTitle }}
          >
            {professional.name}
          </AppText>
          <AppText
            className="text-blue-600 dark:text-[#6ea8fe]"
            style={{ fontSize: t.body }}
          >
            {professional.profession}
          </AppText>
          <View className="flex-row items-center gap-1.5">
            <MapPin size={16} color="#9ca3af" />
            <AppText
              className="text-gray-500 dark:text-[#9ca3af]"
              style={{ fontSize: t.body }}
            >
              {professional.location}
            </AppText>
          </View>
        </View>

        <View className="flex-row items-center justify-around rounded-3xl bg-blue-100 px-4 py-4 dark:bg-[#1b2f4b]">
          <View className="items-center gap-0.5">
            <View className="flex-row items-center gap-1">
              <Star size={16} color="#f5a524" fill="#f5a524" />
              <AppText
                className="font-bold text-foreground"
                style={{ fontSize: t.title }}
              >
                {professional.rating.toFixed(1)}
              </AppText>
            </View>
            <AppText
              className="text-gray-500 dark:text-[#9ca3af]"
              style={{ fontSize: t.caption }}
            >
              Valoración
            </AppText>
          </View>
          <View className="items-center gap-0.5">
            <View className="flex-row items-center gap-1">
              <Users size={16} color="#1d4ed8" />
              <AppText
                className="font-bold text-foreground"
                style={{ fontSize: t.title }}
              >
                {professional.recommendations}
              </AppText>
            </View>
            <AppText
              className="text-gray-500 dark:text-[#9ca3af]"
              style={{ fontSize: t.caption }}
            >
              Recomendaciones
            </AppText>
          </View>
          <View className="items-center gap-0.5">
            <AppText
              className="font-bold text-foreground"
              style={{ fontSize: t.title }}
            >
              {professional.reviewsCount}
            </AppText>
            <AppText
              className="text-gray-500 dark:text-[#9ca3af]"
              style={{ fontSize: t.caption }}
            >
              Reseñas
            </AppText>
          </View>
        </View>

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onPress={() =>
            Alert.alert(
              "Contactar",
              `Aquí irá el contacto de ${professional.name}.`
            )
          }
        >
          Contactar
        </Button>

        <View className="gap-2">
          <AppText
            className="font-bold text-foreground"
            style={{ fontSize: t.sectionTitle }}
          >
            Reseñas
          </AppText>
          <ReviewList />
        </View>
      </ScrollView>
    </View>
  );
}

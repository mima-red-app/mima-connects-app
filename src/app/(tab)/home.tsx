import Category from "@/features/category/components/Category";
import { CATEGORIES } from "@/features/category/components/categories";
import ReviewList from "@/features/professional/components/ReviewList";
import AppText from "@/components/Text";
import ProfessionalList from "@/features/professional/components/ProfessionalList";
import { useTypeScale } from "@/util/responsive";
import { useThemeColor } from "heroui-native/hooks";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Pressable, ScrollView, View } from "react-native";

const HomeScreen = () => {
  const t = useTypeScale();
  const accent = useThemeColor("accent");

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          gap: 20,
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <AppText
              className="font-bold text-foreground"
              style={{ fontSize: t.sectionTitle }}
            >
              Categorías
            </AppText>
            <Pressable
              onPress={() => router.push("/explore")}
              className="flex-row items-center"
              accessibilityRole="button"
              accessibilityLabel="Ver todas las categorías"
            >
              <AppText
                className="font-medium text-blue-600 dark:text-[#6ea8fe]"
                style={{ fontSize: t.body }}
              >
                Ver todas
              </AppText>
              <ChevronRight size={16} color={accent} />
            </Pressable>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {CATEGORIES.slice(0, 6).map((category) => (
              <Category
                key={category.title}
                title={category.title}
                icon={category.icon}
                onPress={() =>
                  router.push({
                    pathname: "/explore",
                    params: { category: category.query },
                  })
                }
              />
            ))}
          </View>
        </View>

        <View className="gap-2">
          <AppText
            className="font-bold text-foreground"
            style={{ fontSize: t.sectionTitle }}
          >
            Profesionales destacados
          </AppText>
          <ProfessionalList />
        </View>

        <View className="gap-2">
          <AppText
            className="font-bold text-foreground"
            style={{ fontSize: t.sectionTitle }}
          >
            Recomendados por la comunidad
          </AppText>
          <ReviewList />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

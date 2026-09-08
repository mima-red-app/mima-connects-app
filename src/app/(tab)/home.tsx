import Category from "@/components/category/Category";
import ReviewList from "@/components/review/ReviewList";
import AppText from "@/components/Text";
import ProfessionalList from "@/features/professional/components/ProfessionalList";
import { useTypeScale } from "@/util/responsive";
import { Scissors } from "lucide-react-native";
import { ScrollView, View } from "react-native";

const HomeScreen = () => {
  const t = useTypeScale();

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
              className="font-bold"
              style={{ fontSize: t.sectionTitle }}
            >
              Explorar servicios
            </AppText>
            <AppText
              className="font-medium text-blue-600 dark:text-[#6ea8fe]"
              style={{ fontSize: t.body }}
            >
              Ver todos
            </AppText>
          </View>
          <View className="flex-row gap-2">
            <Category title="Categoría 1" icon={Scissors} />
            <Category title="Categoría 2" icon={Scissors} />
            <Category title="Categoría 3" icon={Scissors} />
            <Category title="Categoría 4" icon={Scissors} />
          </View>
        </View>

        <View className="gap-2">
          <AppText
            className="font-bold"
            style={{ fontSize: t.sectionTitle }}
          >
            Profesionales destacados
          </AppText>
          <ProfessionalList />
        </View>

        <View className="gap-2">
          <AppText
            className="font-bold"
            style={{ fontSize: t.sectionTitle }}
          >
            Reseñas recientes
          </AppText>
          <ReviewList />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

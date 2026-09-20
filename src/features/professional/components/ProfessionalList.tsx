import { ActivityIndicator, FlatList, View } from "react-native";
import ProfessionalCard from "./ProfessionalCard";
import { useProfessionals } from "@/features/professional/hooks/useProfessionals";
import { Link } from "expo-router";
import AppText from "@/components/Text";

export default function ProfessionalList() {
  const { data, isLoading, isError } = useProfessionals();

  if (isLoading) {
    return (
      <View className="items-center py-6">
        <ActivityIndicator size="small" />
      </View>
    );
  }

  if (isError) {
    return (
      <AppText className="py-4 text-center text-sm text-gray-500">
        No se pudieron cargar los profesionales
      </AppText>
    );
  }

  if (!data || data.length === 0) {
    return (
      <AppText className="py-4 text-center text-sm text-gray-500">
        Aún no hay profesionales registrados
      </AppText>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={300}
      decelerationRate="fast"
      contentContainerStyle={{
        gap: 12,
        paddingVertical: 10,
        paddingRight: 16,
      }}
      renderItem={({ item }) => (
        <Link
          href={{
            pathname: "/professional/[id]",
            params: { id: item.id },
          }}
        >
          <ProfessionalCard professional={item} />
        </Link>
      )}
    />
  );
}

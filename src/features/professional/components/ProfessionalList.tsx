import { FlatList } from "react-native";
import ProfessionalCard from "./ProfessionalCard";
import { PROFESSIONALS } from "@/features/professional/data/professionals";
import { Link } from "expo-router";

export default function ProfessionalList() {
  return (
    <FlatList
      data={PROFESSIONALS}
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
          href={{ pathname: "/professional/[id]", params: { id: item.id } }}
        >
          <ProfessionalCard professional={item} />
        </Link>
      )}
    />
  );
}

import { ActivityIndicator, FlatList, View } from "react-native";
import Header from "@/components/Header";
import AppText from "@/components/Text";
import ProfileReviewCard from "@/features/professional/components/ProfileReviewCard";
import { useMyReviews } from "@/features/professional/hooks/useMyReviews";
import { useCurrentUser } from "@/features/profile/hooks/useCurrentUser";
import { useTypeScale } from "@/util/responsive";

export default function MyReviewsScreen() {
  const t = useTypeScale();
  const { email } = useCurrentUser();
  const { data: reviews, isLoading } = useMyReviews(email);

  return (
    <View className="flex-1 bg-background">
      <Header title="Mis reseñas" />
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : !reviews || reviews.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <AppText
            className="text-center text-gray-500 dark:text-[#9ca3af]"
            style={{ fontSize: t.body }}
          >
            Aún no tienes reseñas de tus clientes.
          </AppText>
        </View>
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            gap: 12,
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 24,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <ProfileReviewCard review={item} />}
        />
      )}
    </View>
  );
}

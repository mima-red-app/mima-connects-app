import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, View } from "react-native";
import AppText from "@/components/Text";
import { fetchRecommendationsUI } from "../services/queries";
import ReviewCard from "./ReviewCard";

const ReviewList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["recommendations"],
    queryFn: fetchRecommendationsUI,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <View className="items-center py-6">
        <ActivityIndicator size="small" />
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <AppText className="py-4 text-center text-sm text-gray-500">
        Aún no hay recomendaciones
      </AppText>
    );
  }

  return (
    <View className="gap-3">
      {data.map((review) => (
        <ReviewCard key={review.id} {...review} />
      ))}
    </View>
  );
};

export default ReviewList;

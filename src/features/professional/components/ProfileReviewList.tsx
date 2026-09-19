import { View } from "react-native";
import ProfileReviewCard from "./ProfileReviewCard";
import type { ProfileReview } from "@/features/professional/types/review-types";

interface ProfileReviewListProps {
  reviews: ProfileReview[];
}

export default function ProfileReviewList({ reviews }: ProfileReviewListProps) {
  return (
    <View className="gap-4">
      {reviews.map((review) => (
        <ProfileReviewCard key={review.id} review={review} />
      ))}
    </View>
  );
}

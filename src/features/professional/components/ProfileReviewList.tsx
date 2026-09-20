import { View } from "react-native";
import ProfileReviewCard from "./ProfileReviewCard";
import type { ReviewUI } from "../types";

interface ProfileReviewListProps {
  reviews: ReviewUI[];
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

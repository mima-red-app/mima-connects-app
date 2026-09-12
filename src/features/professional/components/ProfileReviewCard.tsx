import { useState } from "react";
import { Pressable, View } from "react-native";
import { Avatar, Card } from "heroui-native";
import { Star } from "lucide-react-native";
import AppText from "@/components/Text";
import { useTypeScale } from "@/util/responsive";
import { timeAgo } from "@/util/time-ago";
import type { ProfileReview } from "@/features/professional/types/review-types";

const COLLAPSED_LINES = 3;
const EXPAND_THRESHOLD = 120;

interface ProfileReviewCardProps {
  review: ProfileReview;
}

export default function ProfileReviewCard({ review }: ProfileReviewCardProps) {
  const t = useTypeScale();
  const [expanded, setExpanded] = useState(false);
  const isLong = review.comment.length > EXPAND_THRESHOLD;

  return (
    <Card className="gap-3 rounded-3xl p-4">
      <View className="flex-row items-center gap-3">
        <Avatar size="md">
          <Avatar.Fallback>{review.reviewerInitials}</Avatar.Fallback>
        </Avatar>
        <View className="flex-1">
          <AppText
            className="font-bold text-foreground"
            style={{ fontSize: t.body }}
            numberOfLines={1}
          >
            {review.reviewerName}
          </AppText>
          <AppText
            className="text-gray-500 dark:text-[#9ca3af]"
            style={{ fontSize: t.caption }}
          >
            {timeAgo(review.createdAt)}
          </AppText>
        </View>
        <View className="flex-row items-center gap-1">
          <Star size={14} color="#f5a524" fill="#f5a524" />
          <AppText
            className="font-bold text-foreground"
            style={{ fontSize: t.body }}
          >
            {review.rating.toFixed(1)}
          </AppText>
        </View>
      </View>

      <View className="gap-1">
        <AppText
          className="text-foreground"
          style={{ fontSize: t.body }}
          numberOfLines={expanded ? undefined : COLLAPSED_LINES}
        >
          {review.comment}
        </AppText>
        {isLong ? (
          <Pressable onPress={() => setExpanded((prev) => !prev)}>
            <AppText
              className="font-semibold text-blue-600 dark:text-[#6ea8fe]"
              style={{ fontSize: t.caption }}
            >
              {expanded ? "ver menos" : "ver más"}
            </AppText>
          </Pressable>
        ) : null}
      </View>
    </Card>
  );
}

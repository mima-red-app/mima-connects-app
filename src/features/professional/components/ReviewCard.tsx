import { View } from "react-native";
import AppText from "@/components/Text";
import { Avatar, Card } from "heroui-native";
import { Star } from "lucide-react-native";
import { useTypeScale } from "@/util/responsive";

interface ReviewCardProps {
  name: string;
  initials: string;
  profession: string;
  rating: number;
  recommender: string;
  recommenderInitials: string;
  comment: string;
}

export default function ReviewCard({
  name,
  initials,
  profession,
  rating,
  recommender,
  recommenderInitials,
  comment,
}: ReviewCardProps) {
  const t = useTypeScale();

  return (
    <Card className="gap-3 rounded-3xl p-4">
      <View className="flex-row items-center gap-3">
        <Avatar size="md">
          <Avatar.Fallback>{initials}</Avatar.Fallback>
        </Avatar>
        <View className="flex-1">
          <AppText
            className="font-bold text-foreground"
            style={{ fontSize: t.title }}
            numberOfLines={1}
          >
            {name}
          </AppText>
          <AppText
            className="text-blue-600 dark:text-[#6ea8fe]"
            style={{ fontSize: t.body }}
            numberOfLines={1}
          >
            {profession}
          </AppText>
        </View>
        <View className="flex-row gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              color={i < rating ? "#f5a524" : "#d1d5db"}
              fill={i < rating ? "#f5a524" : "#d1d5db"}
            />
          ))}
        </View>
      </View>

      <View className="gap-2 rounded-2xl bg-surface-secondary p-3">
        <View className="flex-row items-center gap-2">
          <Avatar size="sm">
            <Avatar.Fallback>{recommenderInitials}</Avatar.Fallback>
          </Avatar>
          <AppText style={{ fontSize: t.caption }} numberOfLines={1}>
            <AppText
              className="font-bold text-foreground"
              style={{ fontSize: t.caption }}
            >
              {recommender}
            </AppText>
            <AppText
              className="text-gray-500 dark:text-[#9ca3af]"
              style={{ fontSize: t.caption }}
            >
              {" "}
              recomienda
            </AppText>
          </AppText>
        </View>
        <AppText
          className="text-foreground"
          style={{ fontSize: t.body }}
        >
          {comment}
        </AppText>
      </View>
    </Card>
  );
}

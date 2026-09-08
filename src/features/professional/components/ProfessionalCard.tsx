import { View, useColorScheme } from "react-native";
import { Avatar, Card } from "heroui-native";
import { MapPin, Star, Users } from "lucide-react-native";
import AppText from "@/components/Text";
import type { Professional } from "@/features/professional/types/professional-types";
import { useTypeScale } from "@/util/responsive";

interface ProfessionalCardProps {
  professional: Professional;
}

export default function ProfessionalCard({
  professional,
}: ProfessionalCardProps) {
  const t = useTypeScale();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const infoBlue = isDark ? "#6ea8fe" : "#1d4ed8";
  const muted = isDark ? "#9ca3af" : "#6b7280";

  return (
    <Card
      className="w-72 gap-4 rounded-3xl p-5"
      style={{ borderRadius: 24 }}
    >
      <View className="flex-row items-center gap-3">
        <Avatar size="lg" style={{ width: 64, height: 64 }}>
          <Avatar.Fallback>{professional.initials}</Avatar.Fallback>
        </Avatar>
        <View className="flex-1">
          <AppText
            className="font-bold text-foreground"
            style={{ fontSize: t.title }}
            numberOfLines={1}
          >
            {professional.name}
          </AppText>
          <AppText
            className="text-blue-600 dark:text-[#6ea8fe]"
            style={{ fontSize: t.body }}
            numberOfLines={1}
          >
            {professional.profession}
          </AppText>
        </View>
      </View>

      <View className="flex-row items-center gap-1.5">
        <Star size={18} color="#f5a524" fill="#f5a524" />
        <AppText
          className="font-bold text-foreground"
          style={{ fontSize: t.body }}
        >
          {professional.rating.toFixed(1)}
        </AppText>
        <AppText
          className="text-gray-500 dark:text-[#9ca3af]"
          style={{ fontSize: t.body }}
        >
          ({professional.reviewsCount} valoraciones)
        </AppText>
      </View>

      <View className="flex-row items-center gap-1.5 self-start rounded-full bg-blue-100 px-3 py-1.5 dark:bg-[#1b2f4b]">
        <Users size={16} color={infoBlue} />
        <AppText
          className="font-semibold text-blue-700 dark:text-[#6ea8fe]"
          style={{ fontSize: t.caption }}
        >
          {professional.recommendations} recomendaciones
        </AppText>
      </View>

      <View className="flex-row items-center gap-1.5">
        <MapPin size={16} color={muted} />
        <AppText
          className="text-gray-500 dark:text-[#9ca3af]"
          style={{ fontSize: t.caption }}
          numberOfLines={1}
        >
          {professional.location}
        </AppText>
      </View>
    </Card>
  );
}

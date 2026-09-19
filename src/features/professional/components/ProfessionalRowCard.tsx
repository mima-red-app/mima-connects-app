import { View, useColorScheme } from "react-native";
import { Avatar } from "heroui-native";
import { MapPin, Star } from "lucide-react-native";
import AppText from "@/components/Text";
import type { Professional } from "@/features/professional/types/professional-types";
import { useTypeScale } from "@/util/responsive";

interface ProfessionalRowCardProps {
  professional: Professional;
}

export default function ProfessionalRowCard({
  professional,
}: ProfessionalRowCardProps) {
  const t = useTypeScale();
  const isDark = useColorScheme() === "dark";
  const muted = isDark ? "#9ca3af" : "#6b7280";

  return (
    <View
      className="flex-row items-center gap-3 rounded-3xl bg-surface p-3"
      style={{
        borderWidth: 1,
        borderColor: isDark ? "#3a3a3c" : "#d1d5db",
        borderCurve: "continuous",
      }}
    >
      <Avatar size="md">
        <Avatar.Fallback>{professional.initials}</Avatar.Fallback>
      </Avatar>
      <View className="flex-1 gap-0.5">
        <AppText
          className="font-bold text-foreground"
          style={{ fontSize: t.body }}
          numberOfLines={1}
        >
          {professional.name}
        </AppText>
        <AppText
          className="text-blue-600 dark:text-[#6ea8fe]"
          style={{ fontSize: t.caption }}
          numberOfLines={1}
        >
          {professional.profession}
        </AppText>
        <View className="flex-row items-center gap-1">
          <MapPin size={12} color={muted} />
          <AppText
            className="text-gray-500 dark:text-[#9ca3af]"
            style={{ fontSize: t.caption }}
            numberOfLines={1}
          >
            {professional.location}
          </AppText>
        </View>
      </View>
      <View className="flex-row items-center gap-1">
        <Star size={12} color="#f5a524" fill="#f5a524" />
        <AppText
          className="font-bold text-foreground"
          style={{ fontSize: t.caption }}
        >
          {professional.rating.toFixed(1)}
        </AppText>
      </View>
    </View>
  );
}

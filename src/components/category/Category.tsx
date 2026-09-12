import { Pressable } from "react-native";
import { LucideIcon } from "lucide-react-native";
import { useThemeColor } from "heroui-native/hooks";
import AppText from "@/components/Text";
import { useTypeScale } from "@/util/responsive";

interface CategoryProps {
  title: string;
  icon: LucideIcon;
  selected?: boolean;
  onPress?: () => void;
}

export default function Category({
  title,
  icon: Icon,
  selected = false,
  onPress,
}: CategoryProps) {
  const t = useTypeScale();
  const accent = useThemeColor("accent");

  return (
    <Pressable
      onPress={onPress}
      className={
        selected
          ? "flex-row items-center gap-2 rounded-full border border-blue-600 bg-blue-600 px-4 py-2.5"
          : "flex-row items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5"
      }
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Icon size={18} color={selected ? "#ffffff" : accent} />
      <AppText
        className={selected ? "font-medium text-white" : "font-medium"}
        style={{ fontSize: t.body }}
      >
        {title}
      </AppText>
    </Pressable>
  );
}

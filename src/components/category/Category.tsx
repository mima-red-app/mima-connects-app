import { View } from "react-native";
import { LucideIcon } from "lucide-react-native";
import AppText from "@/components/Text";
import { rs, useAppScale, useTypeScale } from "@/util/responsive";

interface CategoryProps {
  title: string;
  icon: LucideIcon;
}

export default function Category({ title, icon: Icon }: CategoryProps) {
  const s = useAppScale();
  const t = useTypeScale();

  return (
    <View className="flex-1 items-center gap-1.5 p-1">
      <View
        className="rounded-2xl bg-amber-300"
        style={{ padding: rs(14, s) }}
      >
        <Icon size={rs(20, s)} color="#333" />
      </View>
      <AppText
        className="text-center font-medium"
        style={{ fontSize: t.caption }}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.75}
      >
        {title}
      </AppText>
    </View>
  );
}

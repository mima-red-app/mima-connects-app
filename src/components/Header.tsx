import React from "react";
import type { ReactNode } from "react";
import {
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import AppText from "@/components/Text";

interface HeaderProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  logo?: ReactNode;
  actions?: ReactNode;
  showBack?: boolean;
  onBack?: () => void;
  includeSafeArea?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
  titleClassName?: string;
}

export default function Header({
  title,
  subtitle,
  logo,
  actions,
  showBack,
  onBack,
  includeSafeArea = true,
  className = "bg-white",
  style,
  titleClassName = "text-lg font-bold text-foreground",
}: HeaderProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const state = navigation.getState();
  const nestedState = state?.routes?.[state?.index ?? 0]?.state as
    | { index?: number }
    | undefined;
  const hasNestedHistory =
    typeof nestedState?.index === "number" && nestedState.index > 0;
  const canGoBack = showBack ?? (
    hasNestedHistory || navigation.canGoBack()
  );

  const handleBack = () => {
    if (onBack) return onBack();
    if (navigation.canGoBack()) navigation.goBack();
  };

  const titleNode = title;
  const subtitleNode = subtitle;

  return (
    <View
      style={[includeSafeArea ? { paddingTop: insets.top } : null, style]}
      className={className}
    >
      <View className="flex-row items-center border-b border-gray-200 px-4 py-3">
        {canGoBack ? (
          <Pressable
            onPress={handleBack}
            hitSlop={10}
            className="mr-2 rounded-full bg-gray-100 p-2"
          >
            <ArrowLeft size={20} color="#111827" />
          </Pressable>
        ) : null}

        {logo ? (
          <View className="mr-2">{logo}</View>
        ) : null}

        <View className="flex-1">
          {titleNode ? (
            typeof titleNode === "string" ? (
              <AppText className={titleClassName} numberOfLines={1}>
                {titleNode}
              </AppText>
            ) : (
              titleNode
            )
          ) : null}
          {subtitleNode ? (
            typeof subtitleNode === "string" ? (
              <AppText className="text-sm text-[#9CA3AF]" numberOfLines={1}>
                {subtitleNode}
              </AppText>
            ) : (
              subtitleNode
            )
          ) : null}
        </View>

        {actions ? (
          <View className="flex-row items-center gap-1">{actions}</View>
        ) : null}
      </View>
    </View>
  );
}
import React from "react";
import type { TextProps, TextStyle } from "react-native";
import { Text as RNText } from "react-native";

type AppTextProps = TextProps & {
  className?: string;
};

export default function AppText({ style, className, ...props }: AppTextProps) {
  return (
    <RNText
      {...props}
      className={className}
      style={[{ fontFamily: "Poppins_400Regular" }, style]}
    />
  );
}
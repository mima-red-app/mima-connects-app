import React from "react";
import { Dimensions, View } from "react-native";
import { Image } from "expo-image";
import AuthForm from "@/features/auth/components/AuthForm";

const { height: SCREEN } = Dimensions.get("window");
const HEADER_H = Math.min(240, Math.round(SCREEN * 0.26));

const RegisterScreen = () => {
  return (
    <View className="flex-1 bg-blue-500">
      <View
        className="items-center justify-center px-8 pb-6 pt-6"
        style={{ height: HEADER_H }}
      >
        <Image
          source={require("@/assets/images/logo-mima-red-2.png")}
          contentFit="contain"
          style={{ width: 160, height: 130, borderRadius: 24 }}
          className="rounded-4xl"
        />
      </View>
      <View className="flex-1 overflow-hidden rounded-t-4xl bg-white">
        <AuthForm mode="register" />
      </View>
    </View>
  );
};

export default RegisterScreen;

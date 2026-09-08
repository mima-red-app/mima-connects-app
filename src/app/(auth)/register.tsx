import React from "react";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import AuthForm from "@/features/auth/components/AuthForm";

const RegisterScreen = () => {
  return (
    <View className="flex-1 bg-blue-500">
      <View className="items-center justify-center gap-2 h-80 px-8 pb-8 pt-8">
        <Image
          source={require("@/assets/images/logo-mima-red-2.png")}
          contentFit="contain"
          style={{ width: 176, height: 144, borderRadius: 24 }}
          className=" rounded-4xl"
        />
        {/*<Text className="text-center text-base text-white/90">
          Crea tu cuenta para empezar
        </Text>*/}
      </View>
      <View className="flex-1 overflow-hidden rounded-t-4xl bg-white">
        <AuthForm mode="register" />
      </View>
    </View>
  );
};

export default RegisterScreen;

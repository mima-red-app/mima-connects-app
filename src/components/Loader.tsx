import { ActivityIndicator, View } from "react-native";
import { Image } from "expo-image";
import AppText from "@/components/Text";

interface LoaderProps {
  title?: string;
}

export default function Loader({ title }: LoaderProps) {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image
        source={require("../../assets/images/logo-mima-red-2.png")}
        style={{ width: 176, height: 144, borderRadius: 24 }}
        contentFit="contain"
      />
      <ActivityIndicator size="large" className="mt-8" />
      {title ? (
        <AppText className="mt-4 text-sm font-medium text-[#9CA3AF]">
          {title}
        </AppText>
      ) : null}
    </View>
  );
}
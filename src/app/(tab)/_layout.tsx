import React from "react";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Search, HomeIcon } from "lucide-react-native";
import Header from "@/components/Header";

const TabLayout = () => {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: true,
          header: ({ options }) => (
            <Header
              title={"MimaConnect"}
              logo={
                <Image
                  source={require("../../../assets/images/logo-mima-red-2.png")}
                  style={{ width: 40, height: 40, borderRadius: 10 }}
                  contentFit="contain"
                />
              }
              includeSafeArea={false}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Inicio",
            tabBarIcon: ({ size, color }) => (
              <HomeIcon size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explorar",
            tabBarIcon: ({ size, color }) => (
              <Search size={size} color={color} />
            ),
          }}
        />
        {/*<Tabs.Screen name="" options={{ title: "" }} />*/}
      </Tabs>
    </SafeAreaView>
  );
};

export default TabLayout;

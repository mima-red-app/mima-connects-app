import { Button } from "heroui-native/button";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      className="flex-1 items-center justify-center bg-background"
    >
      <Button className="mb-6 mx-5" onPress={() => console.log("Pressed!")}>
        Get Started
      </Button>
    </SafeAreaView>
  );
}

import { View } from "react-native";
import AppText from "../Text";
import { Avatar, Card } from "heroui-native";
import { useTypeScale } from "@/util/responsive";

const Review = () => {
  const t = useTypeScale();

  return (
    <Card className="gap-3 rounded-2xl">
      <View className="flex-row items-center gap-3">
        <Avatar size="sm">
          {/*<Avatar.Image source={""} />*/}
          <Avatar.Fallback />
        </Avatar>
        <AppText
          className="font-semibold capitalize"
          style={{ fontSize: t.body }}
          numberOfLines={1}
        >
          estarlin german
        </AppText>
      </View>
      <View>
        <AppText style={{ fontSize: t.body }}>
          Esta es mi rese;a acerda de este perfil, una persona muy responsable y
          carimstaica, soluciono mi problema de una maenra muy bien
        </AppText>
      </View>
    </Card>
  );
};

export default Review;

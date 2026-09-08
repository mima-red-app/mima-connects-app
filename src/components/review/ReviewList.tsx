import { View, Text } from "react-native";
import React from "react";
import Review from "./Review";

const ReviewList = () => {
  return (
    <View className="gap-4">
      <Review />
      <Review />
      <Review />
      <Review />
      <Review />
    </View>
  );
};

export default ReviewList;

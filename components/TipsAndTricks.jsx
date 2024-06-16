import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import icons from "../constants/icons";

const TipsAndTricks = ({
  iconSource,
  title,
  subtitle,
  onButtonPress,
  height,
  width,
}) => (
  <View className="bg-white border-[0.3px] border-secondary rounded-full flex-row items-center justify-center my-5 mr-4 p-4">
    <Image
      source={iconSource}
      style={{ height: height, width: width }}
      className="mr-4 p-2"
    />
    <View>
      <Text className="font-avlightitalic text-base text-secondary text-center">
        {title}
      </Text>
      <Text className="font-yesregular text-3xl text-secondary text-center mt-[-7px]">
        {subtitle}
      </Text>
    </View>
    <TouchableOpacity onPress={onButtonPress}>
      <Image
        source={icons.arrowdown}
        className="ml-5 h-[14px] w-[14px] p-[9.5px]"
      />
    </TouchableOpacity>
  </View>
);

export default TipsAndTricks;

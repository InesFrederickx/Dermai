import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import icons from "../constants/icons";

const Chemical = ({ source, title, text, onPress }) => {
  const renderIcon = () => {
    if (title === "Benzylperoxide") {
      return (
        <Image
          source={icons.pinkstar}
          className="absolute left-5 top-8 w-8 h-8"
        />
      );
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View className="relative rounded-full overflow-hidden mt-5">
        <ImageBackground
          source={source}
          className="rounded-full flex-row items-center justify-center p-4 h-24"
          resizeMode="cover"
        >
          {renderIcon()}
          <View className="flex-row items-center justify-center">
            <View>
              <Text className="font-avregular text-2xl text-secondary text-center">
                {title}
              </Text>
              <Text className="font-avlightitalic text-lg text-secondary text-center mt-[-7px]">
                {text}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default Chemical;

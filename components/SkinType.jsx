import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import icons from "../constants/icons";

const SkinType = ({ source, title }) => {
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
    <TouchableOpacity>
      <View className="relative rounded-full overflow-hidden mt-5">
        <ImageBackground
          source={source}
          className="rounded-full flex-row items-center justify-center p-4 h-24"
          resizeMode="cover"
        >
          {renderIcon()}
          <View className="flex-row items-center justify-center">
            <View>
              <Text className="font-avlightitalic text-lg text-secondary text-center">
                Skin Type
              </Text>
              <Text className="font-yesregular text-2xl text-secondary text-center mt-[-3px]">
                {title}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default SkinType;

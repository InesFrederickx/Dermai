import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import icons from "../constants/icons";
import {
  isIngredientFavourite,
  removeIngredientFromFavourites,
} from "../library/appwrite";

const Chemical = ({
  source,
  title,
  text,
  onPress,
  currentUser,
  selectedIngredient,
  updateData,
}) => {
  const [isStarSelected, setIsStarSelected] = useState(false);

  useEffect(() => {
    const checkIfFavourite = async () => {
      const isFavourite = await isIngredientFavourite(
        currentUser?.$id,
        selectedIngredient.name
      );
      setIsStarSelected(isFavourite);
    };

    if (currentUser && selectedIngredient) {
      checkIfFavourite();
    }
  }, [currentUser, selectedIngredient]);

  const renderIcon = () => {
    if (!isStarSelected) return null;

    return (
      <TouchableOpacity onPress={removeIngredientFromFavourites}>
        <Image
          source={icons.pinkStar}
          style={{ marginRight: 5, width: 33, height: 32 }} // Adjusted to React Native style object
        />
      </TouchableOpacity>
    );
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="relative rounded-full overflow-hidden mt-5 flex-row items-center justify-center">
        <ImageBackground
          source={source}
          className="rounded-full flex-1 items-center justify-center p-4 h-24"
          resizeMode="cover"
        >
          <View className="flex-row items-center justify-center">
            <View className="absolute left-0">{renderIcon()}</View>
            <View className="flex-1 items-center justify-center">
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

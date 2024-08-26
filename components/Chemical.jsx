import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import icons from "../constants/icons";
import {
  isIngredientFavourite,
  removeIngredientFromFavourites,
} from "../library/appwrite";

const Chemical = ({
  title,
  text,
  onPress,
  currentUser,
  selectedIngredient,
  updateData,
  index,
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

  const ingredientColors = ["#fdf7f4", "#fcfcea", "#f4fcf3"];

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className="relative rounded-full overflow-hidden mt-5 flex-row items-center justify-center"
        style={{
          backgroundColor: ingredientColors[index % ingredientColors.length],
          padding: 16,
          height: 96,
        }}
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
      </View>
    </TouchableOpacity>
  );
};

export default Chemical;

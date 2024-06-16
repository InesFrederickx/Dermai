import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import icons from "../constants/icons";

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
    if (currentUser && currentUser.favourites) {
      setIsStarSelected(
        currentUser.favourites.includes(selectedIngredient.name)
      );
    }
  }, [currentUser]);

  const renderIcon = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setIsStarSelected(!isStarSelected);
          if (!isStarSelected && currentUser) {
            const newFavourites = currentUser.favourites
              ? [...currentUser.favourites, selectedIngredient.name]
              : [selectedIngredient.name];
            updateData(currentUser.$id, {
              favourites: newFavourites,
            });
          }
        }}
      >
        <Image
          source={isStarSelected ? icons.pinkstar : icons.emptypinkstar}
          className="mr-[5px] w-[33px] h-8 bottom-0.5 right-0.5"
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

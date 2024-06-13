import { TouchableOpacity, Text } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  isSelected,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-primary min-h-[62px] min-w-[300px] rounded-[100px] justify-center items-center border-2 ${
        isSelected ? "border-orange" : "border-secondary" // Modify this line
      } ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
      disables={isLoading}
    >
      <Text className={`text-secondary font-avbold text-[26px] ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

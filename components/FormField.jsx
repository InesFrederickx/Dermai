import { View, Text, TextInput } from "react-native";
import { useState } from "react";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-secondary font-avregular">{title}</Text>
      <View className=" border-2 border-secondary w-full h-16 px-4 bg-primary rounded-[100px] focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-secondary font-avbold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          {...props}
        />
      </View>
    </View>
  );
};

export default FormField;

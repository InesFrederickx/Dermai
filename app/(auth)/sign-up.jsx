import {
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";

const SignUp = () => {
  return (
    <ImageBackground source={images.gradientBackground} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="h-full">
          <View className="w-full min-height-[85vh] flex: 1 justify-around px-4 my-6"></View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default SignUp;

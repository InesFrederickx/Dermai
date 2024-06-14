import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons, icons_animated } from "../../constants";
import * as ImagePicker from "expo-image-picker";

const Scan = () => {
  return (
    <ScrollView className="bg-primary">
      <SafeAreaView className="h-full">
        <View className="flex-grow min-h-[83vh] px-7 my-5 bg-primary">
          <View className="absolute right-[-20] top-[-100]"></View>
          <View className="mt-10">
            <View className="items-center">
              <Text className="font-yesregular text-5xl text-secondary text-center">
                Gallery
              </Text>
            </View>
            <View className="items-center">
              <Text className="font-avlightitalic text-base text-secondary mt-1 text-center">
                Upload photos of your face and track your skin health
              </Text>
            </View>
          </View>
          <View className="flex justify-center items-center h-[75%]">
            <TouchableOpacity
              onPress={async () => {
                let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.All,
                  allowsEditing: true,
                  aspect: [4, 3],
                  quality: 1,
                });

                if (!result.cancelled) {
                  // Handle the selected image
                }
              }}
            >
              <Text className="font-avbolditalic text-lg text-secondary mb-20 text-center">
                Choose a picture out of your library
              </Text>
            </TouchableOpacity>
            <View className="border-b border-secondary w-full my-2" />
            <TouchableOpacity
              onPress={async () => {
                let result = await ImagePicker.launchCameraAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.All,
                  allowsEditing: true,
                  aspect: [4, 3],
                  quality: 1,
                });

                if (!result.cancelled) {
                  // Handle the taken picture
                }
              }}
            >
              <Text className="font-avbolditalic text-lg text-secondary mt-20 text-center">
                Take a picture now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Scan;

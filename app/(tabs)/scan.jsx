import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useGlobalContext } from "../../context/GlobalProvider";
import { images } from "../../constants";

const Scan = () => {
  const navigation = useNavigation();
  const { setSelectedImage } = useGlobalContext();
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");

  const imageList = [
    { id: "1", source: images.ine },
    { id: "2", source: images.ine },
    { id: "3", source: images.ine },
  ];

  return (
    <SafeAreaView className="h-full bg-primary">
      <View className="flex-grow min-h-[83vh] px-7 my-5 bg-primary">
        <View className="mt-10">
          <View className="items-center">
            <Text className="font-yesregular text-5xl text-secondary text-center mb-[30px]">
              Gallery
            </Text>
            <FlatList
              data={imageList}
              renderItem={({ item }) => (
                <View
                  style={{
                    width: "48%", // Adjust width as needed
                    marginBottom: 10, // Adjust vertical spacing
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    source={item.source}
                    style={{ width: "100%", height: 150, borderRadius: 10 }}
                    resizeMode="cover"
                  />
                </View>
              )}
              // Setting numColumns to 2 for a two-column grid
              numColumns={2}
              keyExtractor={(item) => item.id}
              // Adjust contentContainerStyle for spacing
              contentContainerStyle={{
                paddingHorizontal: 15, // Adjusts horizontal padding
                paddingBottom: 20, // Adjusts bottom padding
              }}
              columnWrapperStyle={{
                justifyContent: "space-between", // Ensures space between columns
              }}
            />
          </View>
          <Image
            source={images.circleOrange}
            className="w-[200px] h-[200px] ml-[300px]"
          ></Image>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Scan;

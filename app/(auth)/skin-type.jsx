import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import skinTypes from "../../resources/skinTypes.json";

const SkinType = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="h-full bg-primary flex-1">
      <View className="w-full flex: 1 justify-around px-3">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={icons.leftArrow}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              tintColor: "#2B4735",
              width: 40,
              height: 40,
            }}
          />
        </TouchableOpacity>
      </View>

      <View className="w-full min-height-[83vh] flex: 1 justify-around px-7 mt-[70px]">
        <View className="items-center ">
          <Text className="text-[38px] font-yesregular text-secondary mt-10 text-center">
            Hi! What is your ...
          </Text>
        </View>

        <View className="h-[18vh] justify-center">
          <Text className="text-[30px] font-avregular text-secondary mt-10">
            Skin Type
          </Text>
          <Text className="text-[18px] font-avlightitalic text-secondary">
            You can combine (some) answers
          </Text>
        </View>

        <View className="h-[18vh] relative">
          {skinTypes.map((item, index) => (
            <Text
              key={index}
              className="text-[18px] font-avregular text-secondary absolute"
              style={{
                // Step 7: Use the positions to position the elements in the view
                top: `${positions[index].top}%`,
                left: `${positions[index].left}%`,
              }}
            >
              {item.name}
            </Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SkinType;

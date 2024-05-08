import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image, ImageBackground } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../constants";
import CustomButton from "../components/CustomButton";
import { images } from "../constants";

export default function App() {
  return (
    <ImageBackground source={images.gradientBackground} style={{ flex: 1 }}>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "transparent", height: 100 }}
      >
        <View className="w-full justify-between h-full px-8">
          <View className="items-center mt-20">
            <Image
              source={icons.logo}
              className="w-[140px] h-[100px]"
              resizeMode="contain"
            />

            <View className="relative mt-5">
              <Text className="text-5xl text-secondary font-avbold text-center mb-20">
                Dermai
              </Text>
            </View>
          </View>

          <View className="w-full pl-8 mb-[200]">
            <View className="flex-row items-center">
              <View className="w-2 h-2 bg-secondary rounded-full mr-2 mt-7" />
              <Text className="text-xl font-avlight text-secondary mt-7 text-center">
                Analyse your skin
              </Text>
            </View>

            <View className="flex-row items-center">
              <View className="w-2 h-2 bg-secondary rounded-full mr-2 mt-7" />
              <Text className="text-xl font-avlight text-secondary mt-7 text-center">
                Find the right products
              </Text>
            </View>

            <View className="flex-row items-center">
              <View className="w-2 h-2 bg-secondary rounded-full mr-2" />
              <Text className="text-xl font-avlight text-secondary mt-7 text-left">
                Learn how to take care of your skin
              </Text>
            </View>
          </View>

          <View className="mb-10">
            <CustomButton
              title="Next"
              handlePress={() => {}}
              containerStyles="w-full mt-7 flex-end"
            />
          </View>
        </View>

        <StatusBar backgroundColor="#161622" style="light" />
      </SafeAreaView>
    </ImageBackground>
  );
}

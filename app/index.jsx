import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image, Dimensions } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../constants";
import CustomButton from "../components/CustomButton";
import images from "../constants/images";
import logo from "../assets/icons/logo.png";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4EEE4", height: 100 }}>
      <View className="w-full justify-around min-h-[85vh] px-8">
        <View className="items-center mt-20">
          <Image
            source={icons.logo_titel}
            style={{ width: 140, height: 140, overflow: "visible" }}
          />
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
            handlePress={() => {
              router.push("/user-information");
            }}
            containerStyles="w-full mt-7 flex-end"
          />
        </View>
      </View>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}

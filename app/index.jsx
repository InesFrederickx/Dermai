import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Redirect, router, Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../constants";
import CustomButton from "../components/CustomButton";
import logo from "../assets/icons/logo.png";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;
  return (
    <ImageBackground source={images.plant} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, height: 100 }}>
        <View className="w-full justify-around min-h-[85vh] px-8">
          <View className="items-center mt-20">
            <Image
              source={icons.logo_titel}
              style={{ width: 140, height: 140, overflow: "visible" }}
            />
          </View>

          <View className="w-full pl-8 mb-[70]">
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

          <View className="mb-100">
            <CustomButton
              title="Get started"
              handlePress={() => {
                router.push("/skin-type");
              }}
              containerStyles="w-full mt-7 flex-end"
            />

            <View className="justify-center flex-row mt-[10px]">
              <Text className="text-lg text-secondary font-avlight">
                <Text className="text-primary">Have an</Text> account already?{" "}
                <Link
                  href={"/sign-in"}
                  className="font-avbolditalic text-lg text-secondary"
                >
                  Sign In
                </Link>
              </Text>
            </View>
          </View>
        </View>

        <StatusBar backgroundColor="#161622" style="light" />
      </SafeAreaView>
    </ImageBackground>
  );
}

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
import { getUsername } from "../../library/appwrite";
import { Player } from "@lordicon/react";
import Chemical from "../../components/Chemical";

const Home = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      const name = await getUsername();
      console.log("Returned from getUsername:", name);
      setUsername(name);
    };

    fetchUsername();
  }, []);

  const logo = icons_animated.logo;

  const playerRef = useRef(null);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

  return (
    <ScrollView className="bg-primary">
      <SafeAreaView className="h-full">
        <View className="flex-grow min-h-[83vh] px-7 my-5 bg-primary">
          <View className="absolute right-[-20] top-[-100]">
            <ImageBackground
              source={images.neckkkk}
              className="w-[250px] h-[350px]"
            ></ImageBackground>
          </View>
          <View className="mt-10">
            <View className="flex-row items-center">
              <Text className="font-yesregular text-4xl text-secondary">
                Hey {username},
              </Text>
              <View className="ml-[10px]">
                <Player ref={playerRef} icon={logo} />
              </View>
            </View>
            <View>
              <Text className="font-avlightitalic text-base text-secondary mt-1">
                Let's explore your skin together
              </Text>
            </View>
          </View>
          <View className="bg-white rounded-[50px] mt-[100px] p-4 border-[0.3px] border-secondary">
            <ImageBackground
              className="absolute w-[100px] h-[100px] left-[-55px] top-[-50px]"
              source={images.leftmediumleaf}
            ></ImageBackground>
            <Text className="font-yesregular text-3xl text-secondary text-center">
              Tips & Tricks
            </Text>
            <Text className="font-avlightitalic text-base text-secondary text-center mt-[-5px]">
              Swipe for more
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View className="bg-white border-[0.3px] border-secondary rounded-full flex-row items-center justify-center my-5 mr-4 p-4">
                <Image
                  source={icons.sunny}
                  className="h-[51px] w-[51px] mr-4 p-2"
                />
                <View>
                  <Text className="font-avlightitalic text-base text-secondary text-center">
                    How to apply
                  </Text>
                  <Text className="font-yesregular text-3xl text-secondary text-center mt-[-7px]">
                    Sunscreen
                  </Text>
                </View>
                <TouchableOpacity onPress={() => console.log("Button pressed")}>
                  <Image
                    source={icons.arrowdown}
                    className="ml-5 h-[14px] w-[14px] p-[9.5px]"
                  />
                </TouchableOpacity>
              </View>

              <View className="bg-white border-[0.3px] border-secondary rounded-full flex-row items-center justify-center my-5 mr-4 p-4">
                <Image
                  source={icons.sunny}
                  className="h-[51px] w-[51px] mr-4 p-2"
                />
                <View>
                  <Text className="font-avlightitalic text-base text-secondary text-center">
                    How to apply
                  </Text>
                  <Text className="font-yesregular text-3xl text-secondary text-center mt-[-7px]">
                    Sunscreen
                  </Text>
                </View>
                <TouchableOpacity onPress={() => console.log("Button pressed")}>
                  <Image
                    source={icons.arrowdown}
                    className="ml-5 h-[14px] w-[14px] p-[9.5px]"
                  />
                </TouchableOpacity>
              </View>

              <View className="bg-white border-[0.3px] border-secondary rounded-full flex-row items-center justify-center my-5 mr-4 p-4">
                <Image
                  source={icons.sunny}
                  className="h-[51px] w-[51px] mr-4 p-2"
                />
                <View>
                  <Text className="font-avlightitalic text-base text-secondary text-center">
                    How to apply
                  </Text>
                  <Text className="font-yesregular text-3xl text-secondary text-center mt-[-7px]">
                    Sunscreen
                  </Text>
                </View>
                <TouchableOpacity onPress={() => console.log("Button pressed")}>
                  <Image
                    source={icons.arrowdown}
                    className="ml-5 h-[14px] w-[14px] p-[9.5px]"
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
          <View className="bg-white rounded-[50px] mt-[30px] p-4 border-[0.3px] border-secondary">
            <Text className="font-yesregular text-2xl text-secondary text-center mt-3">
              Recommended for you
            </Text>
            <Text className="font-avlightitalic text-base text-secondary text-center mt-[-5px]">
              Combination skin type
            </Text>
            <Chemical
              source={images.dryness}
              title="Benzylperoxide"
              text="Dryness"
            />
            <Chemical
              source={images.exfoliation}
              title="Hydrogynperoxide"
              text="Exfoliation"
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;

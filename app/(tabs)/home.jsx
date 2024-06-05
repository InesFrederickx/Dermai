import { View, Text, ScrollView, Image, StatusBar } from "react-native";
import { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons, icons_animated } from "../../constants";
import { getUsername } from "../../library/appwrite";
import { Player } from "@lordicon/react";

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
    <ScrollView>
      <StatusBar hidden />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: -5,
        }}
      >
        <Image
          source={images.facee}
          resizeMode="contain"
          style={{
            width: "100%",
            marginTop: 0,
            paddingTop: 0,
            marginTop: -110,
            width: "110%",
            marginLeft: -30,
          }}
        />
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <View className="w-full min-h-[83vh] flex: 1 px-7 my-6 mt-[250px] bg-primary">
          <View className="flex-row items-center">
            <Text className="font-yesregular text-4xl text-secondary">
              Hi, {username}
            </Text>
            <View className="ml-[10px]">
              <Player ref={playerRef} icon={logo} />
            </View>
          </View>

          <View>
            <Text className="font-avbold text-xl text-secondary mt-7">
              Recommended for you
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;

import { View, Text, ScrollView, Image } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { icons } from "../../constants";

const Home = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetchUsername().then((fetchedUsername) => {
      setUsername(fetchedUsername);
    });
  }, []);

  return (
    <SafeAreaView
      className="h-full"
      style={{ flex: 1, backgroundColor: "#F4EEE4", height: 100 }}
    >
      <ScrollView>
        <View className="w-full min-h-[83vh] flex: 1 px-7 my-6 mt-[70px]">
          <View className="justify-center h-[100px]">
            <Image source={images.face} resizeMode="contain" />
          </View>

          <View>
            <Image />

            <Text>Hi {username}</Text>
          </View>

          <View></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

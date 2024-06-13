import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut, getUsername, getCurrentUser } from "../../library/appwrite";
import { icons } from "../../constants";
import images from "../../constants/images";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";
import SkinType from "../../components/SkinType";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getCurrentUser();
      console.log("Returned from getCurrentUser:", userDetails);
      setUsername(userDetails.username);
      setEmail(userDetails.email);
    };

    fetchUserDetails();
  }, []);

  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }

    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  const handleChange = () => {
    console.log("Change button pressed");
  };

  return (
    <ScrollView className="bg-primary">
      <SafeAreaView className="h-full">
        <View className="flex-grow min-h-[83vh] px-7 pb-10   bg-primary">
          <View className="items-center">
            <View className="w-full flex: 1 mt-6">
              <TouchableOpacity
                onPress={logout}
                className="flex w-full items-end"
              >
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </TouchableOpacity>
            </View>
            <View className="items-center">
              <Text className="font-yesregular text-5xl text-secondary text-center">
                Profile
              </Text>
            </View>
            <ImageBackground
              className="absolute w-[140px] h-[140px] left-[-70px] top-[50px]"
              source={images.leftmediumleaf}
            ></ImageBackground>
            <View className="w-[150px] h-[150px] bg-white rounded-full flex items-center justify-center mt-5">
              <Text className="text-orange-500 text-8xl mt-5 font-avregular">
                {username.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text className="font-avbold text-4xl text-secondary text-center mt-3">
              {username}
            </Text>
          </View>
          <View className="bg-white rounded-[50px] mt-[35px] p-4 border-[0.3px] border-secondary">
            <Text className="font-yesregular text-3xl text-secondary text-center py-4 px-9">
              Adjust your profile details
            </Text>
            <View className="flex flex-row justify-between items-center mt-4 px-4">
              <Text className="font-avbolditalic text-lg text-secondary">
                {email}
              </Text>
              <TouchableOpacity
                onPress={handleChange}
                className="rounded-full border-[1px] border-secondary p-1"
              >
                <Text className="font-avlight text-lg text-secondary px-4">
                  Change
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-row justify-between items-center mt-4 px-4 pb-10">
              <Text className="font-avbolditalic text-lg text-secondary">
                Password
              </Text>
              <TouchableOpacity
                onPress={handleChange}
                className="rounded-full border-[1px] border-secondary p-1"
              >
                <Text className="font-avlight text-lg text-secondary px-4">
                  Change
                </Text>
              </TouchableOpacity>
            </View>
            <ImageBackground
              className="absolute w-[110px] h-[110px] right-[-62px] top-[220px]"
              source={images.rightmediumleaf}
            ></ImageBackground>
          </View>
          <View className="bg-white rounded-[50px] mt-[35px] p-4 border-[0.3px] border-secondary">
            <Text className="font-yesregular text-3xl text-secondary text-center py-4 px-9">
              Adjust your skin details
            </Text>
            <SkinType source={images.dryness} title="Combination" />
            <ImageBackground
              className="absolute w-[110px] h-[110px] left-[-70px] top-[190px]"
              source={images.leftmediumleaf}
            ></ImageBackground>
            <View className="bg-white rounded-[50px] mt-[35px] p-4 border-[0.3px] border-secondary mb-4">
              <Text className="font-avlightitalic text-xl text-secondary text-center py-4 px-9">
                Skin Concern(s)
              </Text>
              <View className="mt-[-15px]">
                <Text className="font-yesregular text-xl text-secondary text-center">
                  qsdqsqs
                </Text>
                <Text className="font-yesregular text-xl text-secondary text-center ">
                  qsdqsqs
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile;

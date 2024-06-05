import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "../../library/appwrite";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

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
  return (
    <ScrollView className="bg-primary">
      <SafeAreaView style={{ flex: 1 }}>
        <View className="w-full min-h-[83vh] flex: 1 px-7 my-6">
          <TouchableOpacity
            onPress={logout}
            className="flex w-full items-end mb-10"
          >
            <Image
              source={icons.logout}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({});

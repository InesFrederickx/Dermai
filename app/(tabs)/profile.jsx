import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Modal,
  TextInput,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  signOut,
  getCurrentUser,
  updateUserEmail,
  updateUserPassword,
} from "../../library/appwrite";
import { icons } from "../../constants";
import images from "../../constants/images";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";
import SkinType from "../../components/SkinType";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [skinType, setSkinType] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getCurrentUser();
      console.log("Returned from getCurrentUser:", userDetails);
      setUsername(userDetails.username);
      setEmail(userDetails.email);
      setSkinType(userDetails.skinType);
      setUserDetails(userDetails);
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
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      if (newEmail && password) {
        // Ensure password is also considered
        const updatedAccount = await updateUserEmail(newEmail, password);
        if (updatedAccount) {
          // Check if the update was successful
          setEmail(newEmail); // Update the email state
          setModalVisible(false); // Close the modal
          // Optionally, you can add a success message or perform other actions here
        }
      } else {
        // Optionally, handle the case where email or password is not provided
        console.error("Email or password is missing.");
      }
    } catch (error) {
      console.error("Failed to update user email:", error);
      // Optionally, you can add error handling UI logic here
    }
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
              <Text className="font-yesregular mt-2 text-5xl text-secondary text-center">
                Profile
              </Text>
            </View>
            <ImageBackground
              style={{ transform: [{ scaleX: -1 }] }}
              className="absolute w-[140px] h-[140px] left-[-70px] top-[50px]"
              source={images.animatedblad}
            ></ImageBackground>
            <View className="w-[150px] h-[150px] bg-white rounded-full flex items-center justify-center mt-5">
              <Text className="text-orange-500 text-8xl mt-5 font-avregular">
                {username ? username.charAt(0).toUpperCase() : ""}
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
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                >
                  <View
                    style={{
                      margin: 20,
                      backgroundColor: "white",
                      borderRadius: 30,
                      padding: 35,
                      alignItems: "center",
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      elevation: 5,
                      width: "86%",
                    }}
                  >
                    <Text className="font-avbold text-2xl text-secondary mb-5">
                      New Email
                    </Text>
                    <TextInput
                      placeholder="Enter new email"
                      placeholderTextColor="#787878"
                      value={newEmail}
                      onChangeText={setNewEmail}
                      keyboardType="email-address"
                      className="font-avlight text-secondary bg-primary"
                      style={{
                        height: 50,
                        borderRadius: 90,
                        width: "100%",
                        marginBottom: 20,
                        paddingHorizontal: 10,
                      }}
                    />
                    {/* Add TextInput for password */}
                    <TextInput
                      placeholder="Enter your password"
                      placeholderTextColor="#787878"
                      secureTextEntry={true}
                      value={password}
                      onChangeText={setPassword}
                      className="font-avlight text-secondary bg-primary"
                      style={{
                        height: 50,
                        borderRadius: 90,
                        width: "100%",
                        marginBottom: 20,
                        paddingHorizontal: 10,
                      }}
                    />
                    <View
                      className="font-avregular text-secondary"
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Button title="Save Email" onPress={handleSubmit} />
                      <Button
                        title="Cancel"
                        onPress={() => setModalVisible(false)}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
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
              source={images.animatedblad}
            ></ImageBackground>
          </View>
          <View className="bg-white rounded-[50px] mt-[35px] p-4 border-[0.3px] border-secondary">
            <Text className="font-yesregular text-3xl text-secondary text-center py-4 px-9">
              Adjust your skin details
            </Text>
            <SkinType
              source={images.dryness}
              title={
                skinType
                  ? skinType.charAt(0).toUpperCase() + skinType.slice(1)
                  : ""
              }
            />
            <ImageBackground
              style={{ transform: [{ scaleX: -1 }] }}
              className="absolute w-[110px] h-[110px] left-[-70px] top-[190px]"
              source={images.animatedblad}
            ></ImageBackground>
            <View className="bg-white rounded-[50px] mt-[35px] p-4 border-[0.3px] border-secondary mb-4">
              <Text className="font-avlightitalic text-xl text-secondary text-center pb-4 px-9">
                Skin Concern(s)
              </Text>
              <View className="mt-[-15px]">
                {userDetails &&
                  userDetails.skinConcerns.map((concern, index) => (
                    <Text
                      key={index}
                      className="font-yesregular text-xl text-secondary text-center"
                    >
                      {concern
                        ? concern.charAt(0).toUpperCase() + concern.slice(1)
                        : ""}
                    </Text>
                  ))}
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile;

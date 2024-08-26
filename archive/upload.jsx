import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  Platform,
  TextInput,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ResizeMode } from "expo-av";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { icons } from "../constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { createImage } from "../library/appwrite";
import { useGlobalContext } from "../context/GlobalProvider";

const Upload = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    description: "",
    image: null,
  });

  const openPicker = async (selectType) => {
    if (selectType === "image") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setForm({
          ...form,
          image: { uri: result.assets[0].uri },
        });
        console.log(result.assets[0].uri);
      } else {
        setForm({
          ...form,
          image: null,
        });
      }
    }
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      cameraType: "front",
    });

    console.log(result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setForm({
        ...form,
        image: { uri: result.assets[0].uri },
      });
      console.log(result.assets[0].uri);
    } else {
      setForm({
        ...form,
        image: null,
      });
    }
  };

  const submit = async () => {
    if (!form.image || !form.description) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select an image and fill in the description",
        type: "customToast",
        position: "top",
      });
      return;
    }
    setUploading(true);

    try {
      await createImage({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Image uploaded successfully");
      router.push("/scan");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        description: "",
        image: null,
      });
      setUploading(false);
    }
  };

  const toastConfig = {
    customToast: ({ text1, text2 }) => (
      <View className="h-full w-full bg-secondary p-5 mt-1 rounded-b-[15px]">
        <Text className="text-white font-yesregular">{text1}</Text>
        <Text className="text-white font-avregular">{text2}</Text>
      </View>
    ),
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="font-yesregular text-5xl text-secondary text-center">
          Upload your photo
        </Text>
        <View className="mt-7 space-y-2">
          <Text className="text-secondary font-avregular text-base">
            Upload Photo
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.image ? (
              <Image
                source={{ uri: form.image.uri }}
                className="w-full h-64 rounded-[27px]"
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-40 px-4 bg-white rounded-[27px] justify-center items-center flex-row">
                <View className="flex-1 justify-center items-center">
                  <TouchableOpacity
                    className="items-center"
                    onPress={openCamera}
                  >
                    <Image source={icons.camera} className="w-6 h-6" />
                    <Text className="font-avitalic text-[18px] text-center">
                      Take a picture
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="flex-1 justify-center items-center">
                  <TouchableOpacity
                    className="items-center"
                    onPress={() => openPicker("image")}
                  >
                    <Image source={icons.upload} className="w-6 h-6" />
                    <Text className="font-avitalic text-[18px] text-center">
                      Choose from your photos
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <Text className="flex-1 text-secondary font-avbold text-base mt-[20px]">
          Description
        </Text>
        <View className="w-full px-4 bg-white rounded-[27px] mt-[7px]">
          <TextInput
            title="Description"
            value={form.description}
            placeholder="Give some extra info..."
            otherStyles="mt-10"
            onChangeText={(e) =>
              setForm((prevForm) => ({ ...prevForm, description: e }))
            }
            className="mt-[7px] w-full h-[200px] text-secondary font-avbold text-base"
            multiline={true}
            textAlignVertical="top"
          />
        </View>

        <CustomButton
          title="Submit"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

export default Upload;

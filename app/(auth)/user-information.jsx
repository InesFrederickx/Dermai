import {
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";
import { Picker } from "@react-native-picker/picker";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

const UserInformation = () => {
  const [form, setForm] = useState({
    name: "",
    birthday: "",
    gender: "",
  });

  const navigateTo = () => {
    if (form.name && form.birthday && form.gender) {
      const userInfo = {
        ...userInfo,
        name: form.name,
        birthday: form.birthday,
        gender: form.gender,
      };
      setUserInfo(updatedUserInfo);

      navigation.navigate("sign-up", {
        name: userInfo.name,
        birthday: userInfo.birthday,
        gender: userInfo.gender,
      });
    } else {
      alert("Please fill in all fields. :)");
    }
  };

  const submit = () => {};

  return (
    <ImageBackground source={images.gradientBackground} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="h-full">
          <View className="w-full min-height-[85vh] flex: 1 justify-around px-4 my-6">
            <Text className="text-5xl text-secondary font-yesregular text-center">
              Hi! What is your
            </Text>

            <FormField
              title="Name"
              value={form.name}
              handleChangeText={(e) => setForm({ ...form, name: e })}
              otherStyles="mt-7"
            />

            <FormField
              title="Birthday"
              value={form.birthday}
              handleChangeText={(e) => setForm({ ...form, birthday: e })}
              otherStyles="mt-7"
              keyboardType="birthdate-full"
            />

            <View style={{ marginTop: 7 }}>
              <Text className="text-base text-secondary font-avregular">
                Gender
              </Text>
              <Picker
                selectedValue={form.gender}
                onValueChange={(itemValue) =>
                  setForm({ ...form, gender: itemValue })
                }
              >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Non-Binary" value="non-binary" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>

            <CustomButton
              title="Next"
              handlePress={navigateTo}
              conrainerStyles="mt-7"
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default UserInformation;

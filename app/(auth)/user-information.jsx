import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { images } from "../../constants";
import icons from "../../constants/icons";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import DateTimePicker from "@react-native-community/datetimepicker";

const UserInformation = () => {
  const [form, setForm] = useState({
    name: "",
    birthday: "",
    gender: "",
  });

  const [dateOfBirth, setDateOfBirth] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setDateOfBirth(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };

  const confirmIOSDate = () => {
    setDateOfBirth(date.toDateString());
    toggleDatePicker();
  };

  // const navigateTo = () => {
  //   if (form.name && form.birthday && form.gender) {
  //     const userInfo = {
  //       ...userInfo,
  //       name: form.name,
  //       birthday: form.birthday,
  //       gender: form.gender,
  //     };
  //     setUserInfo(updatedUserInfo);

  //     navigation.navigate("sign-up", {
  //       name: userInfo.name,
  //       birthday: userInfo.birthday,
  //       gender: userInfo.gender,
  //     });
  //   } else {
  //     alert("Please fill in all fields. :)");
  //   }
  // };

  // const submit = () => {};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        className="h-full"
        style={{ flex: 1, height: 100, backgroundColor: "#F4EEE4" }}
      >
        <View className="w-full min-height-[85vh] flex: 1 justify-around px-8 mt-[70px]">
          <Text className="text-[35px] text-secondary font-yesregular text-center">
            Hi! What is your ...
          </Text>

          <FormField
            title="Name"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mt-7"
            placeholder={"Jane Doe"}
            placeholderTextColor="#A0A3BD"
          />

          <View>
            <Text className="text-base text-secondary font-avregular mt-[7px]">
              Birthday
            </Text>

            {showPicker ? (
              <>
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={date}
                  onChange={onChange}
                  style={{ height: 120, marginTop: -10 }}
                  maximumDate={new Date()}
                  minimumDate={new Date(1930, 1, 1)}
                />

                {Platform.OS === "ios" && (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <TouchableOpacity
                      style={{ paddingHorizontal: 20 }}
                      onPress={toggleDatePicker}
                    >
                      <Text
                        styles={{
                          fontSize: 14,
                          fontWeight: "500",
                          color: "secondary",
                        }}
                      >
                        Cancel
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ paddingHorizontal: 20 }}
                      onPress={confirmIOSDate}
                    >
                      <Text
                        styles={{
                          fontSize: 14,
                          fontWeight: "500",
                          color: "secondary",
                        }}
                      >
                        Confirm
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            ) : (
              <Pressable onPress={toggleDatePicker}>
                <FormField
                  value={dateOfBirth}
                  handleChangeText={(e) => setForm({ ...form, dateOfBirth: e })}
                  otherStyles="mt-7"
                  placeholder="MM/DD/YYYY"
                  placeholderTextColor="#A0A3BD"
                  editable={false}
                  onPressIn={toggleDatePicker}
                  onChangeText={setDateOfBirth}
                />
              </Pressable>
            )}
          </View>

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
            handlePress={() => {
              router.push("/sign-up");
            }}
            containerStyles="mt-7"
          />
        </View>
        <Image
          source={icons.logo}
          className="w-[300px] h-[300px] rotate-45 opacity-50 mb-[10px]"
          resizeMode="contain"
          z-index={-1}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default UserInformation;

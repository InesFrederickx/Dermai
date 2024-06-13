import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../library/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { skinType, skinConcerns } = useGlobalContext();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (
      !form.email ||
      !form.password ||
      !form.username ||
      !skinType ||
      !skinConcerns
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(
        form.email,
        form.password,
        form.username,
        skinType,
        skinConcerns
      );

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        className="h-full"
        style={{ flex: 1, backgroundColor: "#F4EEE4", height: 100 }}
      >
        <View className="w-full min-h-[83vh] flex: 1 px-4 my-6 mt-[70px]">
          <Text className="text-[35px] text-secondary font-yesregular text-center">
            Let's finish making your account now!
          </Text>

          <View>
            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles="mt-10"
              placeholder={"Jane"}
              placeholderTextColor="#c0c4c2"
            />
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              placeholder={"Jane.Doe@gmail.com"}
              placeholderTextColor="#c0c4c2"
              keyboardType="email-address"
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
              placeholder={"..."}
              placeholderTextColor="#c0c4c2"
            />
          </View>

          <CustomButton
            title="Make Account"
            containerStyles="mt-7"
            handlePress={submit}
            disabled={!form.email || !form.password}
            isLoading={isSubmitting}
          />

          <View className="justify-center flex-row mt-[10px]">
            <Text className="text-lg text-secondary font-avlight">
              Have an account already?{" "}
              <Link
                href={"/sign-in"}
                className="font-avbolditalic text-lg text-secondary"
              >
                Sign In
              </Link>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../library/appwrite";
import { signIn } from "../../library/appwrite";
import clsx from "clsx";
import Toast from "react-native-toast-message";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all fields",
        type: "customToast",
        position: "top",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      router.replace("/home");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
        type: "customToast",
        position: "top",
      });
    } finally {
      setIsSubmitting(false);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <SafeAreaView
          className="h-full"
          style={{ flex: 1, backgroundColor: "#F4EEE4", height: 100 }}
        >
          <View className="w-full min-h-[83vh] flex: 1 px-7 my-6 mt-[70px]">
            <Text className="text-[35px] text-secondary font-yesregular text-center">
              Sign in to Dermai
            </Text>

            <View>
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

            <View className="">
              <CustomButton
                title="Sign In"
                containerStyles="mt-7"
                handlePress={submit}
                disabled={!form.email || !form.password}
                isLoading={isSubmitting}
                className={clsx(
                  "mt-7",
                  form.email && form.password
                    ? "border-orange"
                    : "border-secondary"
                )}
              />

              <View className="justify-center flex-row mt-[20px]">
                <Text className="text-lg text-secondary font-avlight">
                  Have no account yet?{" "}
                  <Link
                    href={"/skin-type"}
                    className="font-avbolditalic text-lg text-secondary"
                  >
                    Sign Up
                  </Link>
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
        <Toast config={toastConfig} />
      </>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;

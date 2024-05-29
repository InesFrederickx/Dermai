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

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);

      //set it to global state...

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              placeholderTextColor="#A0A3BD"
              keyboardType="email-address"
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
              placeholder={"..."}
              placeholderTextColor="#A0A3BD"
            />
          </View>

          <View className="">
            <CustomButton
              title="Sign In"
              containerStyles="mt-7"
              handlePress={submit}
              disabled={!form.email || !form.password}
              isLoading={isSubmitting}
            />

            <View className="justify-center flex-row mt-[20px]">
              <Text className="text-lg text-secondary font-avlight">
                I already have an account.{" "}
                <Link
                  href={"/sign-up"}
                  className="font-avbolditalic text-lg text-secondary"
                >
                  Sign Up
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;

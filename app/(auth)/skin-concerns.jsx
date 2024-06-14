import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import skinConcerns from "../../resources/skinConcerns.json";
import oily from "../../assets/images/skin_types/oily.png";
import normal from "../../assets/images/skin_types/normal.png";
import dry from "../../assets/images/skin_types/dry.png";
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";
import Toast from "react-native-toast-message";

const SkinConcerns = () => {
  const navigation = useNavigation();
  const { setSkinConcerns } = useGlobalContext();

  const skinConcernsImages = {
    oily,
    normal,
    dry,
  };

  const [selectedSkinConcerns, setSelectedSkinConcerns] = useState([]);

  const handleSkinConcernSelection = (concern) => {
    setSelectedSkinConcerns((prevConcerns) =>
      prevConcerns.includes(concern)
        ? prevConcerns.filter((c) => c !== concern)
        : [...prevConcerns, concern]
    );
  };

  const navigateToNextPage = () => {
    if (selectedSkinConcerns.length > 0) {
      setSkinConcerns(selectedSkinConcerns);
      navigation.navigate("sign-up", {
        selectedSkinConcerns,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select your skin concern(s)",
        type: "customToast",
        position: "top",
      });
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
    <SafeAreaView className="h-full bg-primary flex-1">
      <View className="w-full flex: 1 justify-around px-3">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={icons.leftArrow}
            style={{
              position: "absolute",
              top: 10,
              left: 0,
              tintColor: "#2B4735",
              width: 40,
              height: 40,
            }}
          />
        </TouchableOpacity>
      </View>

      <View className="w-full min-height-[83vh] flex: 1 justify-around px-7 mt-[70px]">
        <View className="items-center ">
          <Text className="text-[38px] font-yesregular text-secondary mt-10 text-center">
            Hi! What is your ...
          </Text>
        </View>

        <View className="h-[18vh] justify-center">
          <Text className="text-[30px] font-avregular text-secondary mt-10">
            Skin Concerns
          </Text>
          <Text className="text-[18px] font-avlightitalic text-secondary">
            You can combine (some) answers
          </Text>
        </View>

        <View className="h-[40vh] relative">
          {skinConcerns.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSkinConcernSelection(item.name)}
              style={{
                position: "absolute",
                top: `${item.position.top}%`,
                left: `${item.position.left}%`,
                width: 110,
                height: 110,
              }}
            >
              <ImageBackground
                source={skinConcernsImages[item.image]}
                style={[
                  {
                    width: "100%",
                    height: "100%",
                    overflow: "visible",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: selectedSkinConcerns.includes(item.name) ? 1 : 0.7, // Adjust opacity based on selection
                  },
                  selectedSkinConcerns.includes(item.name) // Check if the item is selected
                    ? {
                        shadowColor: "black",
                        shadowOffset: { width: 2, height: 2 },
                        shadowOpacity: 0.4,
                        shadowRadius: 3.84,
                        elevation: 5,
                      }
                    : {},
                ]}
              >
                <Text
                  className={`text-[18px] ${
                    selectedSkinConcerns.includes(item.name) // Check if the item is selected
                      ? "font-avbold text-orange-500" // Add orange color when selected
                      : "font-avregular text-secondary"
                  }`}
                >
                  {item.name}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </View>

        <View>
          <CustomButton
            title="Next"
            containerStyles="mt-7"
            handlePress={navigateToNextPage}
            isSelected={selectedSkinConcerns !== null}
          />
        </View>
      </View>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

export default SkinConcerns;

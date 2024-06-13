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
import skinTypes from "../../resources/skinTypes.json";
import oily from "../../assets/images/skin_types/oily.png";
import normal from "../../assets/images/skin_types/normal.png";
import dry from "../../assets/images/skin_types/dry.png";
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";

const SkinType = () => {
  const navigation = useNavigation();
  const { setSkinType } = useGlobalContext();

  const skinTypeImages = {
    oily,
    normal,
    dry,
  };

  const [selectedSkinType, setSelectedSkinType] = useState(null);

  const navigateToNextPage = () => {
    if (selectedSkinType) {
      setSkinType(selectedSkinType);
      navigation.navigate("skin-concerns", {
        selectedSkinType,
      });
    } else {
      alert("Please select your skin type");
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary flex-1">
      <View className="w-full flex: 1 justify-around px-3">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={icons.leftArrow}
            style={{
              position: "absolute",
              top: 0,
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
            Skin Type
          </Text>
          <Text className="text-[18px] font-avlightitalic text-secondary">
            You can combine (some) answers
          </Text>
        </View>

        <View className="h-[40vh] relative">
          {skinTypes.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedSkinType(item.name)}
              style={{
                position: "absolute",
                top: `${item.position.top}%`,
                left: `${item.position.left}%`,
                width: 110,
                height: 110,
              }}
            >
              <ImageBackground
                source={skinTypeImages[item.image]}
                style={[
                  {
                    width: "100%",
                    height: "100%",
                    overflow: "visible",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: 0.7,
                  },
                  item.name === selectedSkinType
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
                    item.name === selectedSkinType
                      ? "font-avbold"
                      : "font-avregular"
                  } text-secondary`}
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
            isSelected={selectedSkinType !== null}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SkinType;

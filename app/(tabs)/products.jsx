import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import Modal from "react-native-modal";
import { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons, icons_animated } from "../../constants";
import { getUsername } from "../../library/appwrite";
import { Player } from "@lordicon/react";
import Chemical from "../../components/Chemical";

const Products = () => {
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isStarSelected, setIsStarSelected] = useState(false);

  const handleChemicalPress = () => {
    setModalVisible(true);
  };

  return (
    <ScrollView className="bg-primary">
      <SafeAreaView className="h-full">
        <View className="flex-grow min-h-[83vh] px-7 my-5 bg-primary">
          <View className="mt-2">
            <View className="items-center">
              <Text className="font-yesregular text-5xl mt-7 text-secondary text-center">
                Ingredients
              </Text>
            </View>
            <View className="flex-row items-center bg-white rounded-full p-2 h-12 mt-4">
              <Image
                source={icons.search}
                className="ml-2 w-5 h-5"
                tintColor={"#2B4735"}
              />
              <TextInput
                className="flex-grow ml-3 font-avlight"
                onChangeText={(text) => setSearch(text)}
                value={search}
                placeholder="What are you searching for?"
              />
            </View>
            <View className="px-2 mt-5">
              <View className="flex-row justify-between">
                <TouchableOpacity
                  className="rounded-full border-[1px] border-secondary p-2 flex-grow mr-2"
                  onPress={() => {}}
                >
                  <Text className="text-center font-avregular">Legend</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="rounded-full border-[1px] border-secondary p-2 flex-grow ml-2"
                  onPress={() => {}}
                >
                  <Text className="text-center font-avregular">Filter</Text>
                </TouchableOpacity>
              </View>
              <Text className="text-center font-avlightitalic mt-4 text-base">
                Press on an ingredient to see more details
              </Text>
            </View>
            <Chemical
              source={images.exfoliation}
              title="Hydrogynperoxide"
              text="Exfoliation"
              onPress={handleChemicalPress}
            />
            <Chemical
              source={images.acnetexture}
              title="Niacinamide"
              text="Acne, Texture"
            />
            <Chemical
              source={images.dryness}
              title="Benzylperoxide"
              text="Dryness"
            />
            <Chemical
              source={images.exfoliation}
              title="Hydrogynperoxide"
              text="Exfoliation"
            />
            <Chemical
              source={images.acnetexture}
              title="Niacinamide"
              text="Acne, Texture"
            />
            <Chemical
              source={images.dryness}
              title="Benzylperoxide"
              text="Dryness"
            />
          </View>
        </View>
      </SafeAreaView>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        className="justify-end m-0"
        swipeDirection="down"
        swipeThreshold={100}
        onSwipeComplete={() => setModalVisible(false)}
        backdropOpacity={0}
      >
        <View className="h-[97%] bg-white rounded-t-[60px] border-[0.6px] border-secondary">
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex justify-center mt-2 items-center">
              <Image source={icons.arrowtop} className="w-7 h-4 p-2 mt-2" />
            </View>
            <View className="items-center border-b-[1px] border-secondary pb-7">
              <Image
                source={images.CHNiacinamide}
                className="w-[190px] h-[150px] mt-12"
              />
              <View className="flex-row items-center justify-center mt-5">
                <TouchableOpacity
                  onPress={() => setIsStarSelected(!isStarSelected)}
                >
                  <Image
                    source={
                      isStarSelected ? icons.pinkstar : icons.emptypinkstar
                    }
                    className="mr-2 w-[33px] h-8 bottom-0.5 right-0.5"
                  />
                </TouchableOpacity>
                <Text className="font-yesregular text-3xl text-secondary text-center">
                  Niacinamide
                </Text>
              </View>
            </View>
            <View className="items-center border-b-[1px] border-secondary pb-7">
              <Text className="font-yesregular text-2xl text-secondary text-center mt-2">
                Best for
              </Text>
              <View className="flex-row justify-between w-full px-7">
                <Text className="font-avlightitalic text-lg text-secondary text-center mt-[-5px]">
                  Skin Type
                </Text>
                <Text className="font-avlightitalic text-lg text-secondary text-center mt-[-5px]">
                  Skin Concern(s)
                </Text>
              </View>
              <View className="flex-row justify-between w-full px-7 mt-4">
                <Text className="font-avlightitalic text-lg text-secondary text-center mt-[-5px]">
                  Oily, Combination
                </Text>
                <Text className="font-avlightitalic text-lg text-secondary text-center mt-[-5px]">
                  Acne, Redness
                </Text>
              </View>
            </View>
            <View className="items-center border-b-[1px] border-secondary pb-7">
              <Text className="font-yesregular text-2xl text-secondary text-center mt-2">
                Not good for
              </Text>
              <View className="flex-row justify-between w-full px-7">
                <Text className="font-avlightitalic text-lg text-secondary text-center mt-[-5px]">
                  Skin Type
                </Text>
                <Text className="font-avlightitalic text-lg text-secondary text-center mt-[-5px]">
                  Skin Concern(s)
                </Text>
              </View>
              <View className="flex-row justify-between w-full px-7 mt-4">
                <Text className="font-avlightitalic text-lg text-secondary text-center mt-[-5px]">
                  Oily, Combination
                </Text>
                <Text className="font-avlightitalic text-lg text-secondary text-center mt-[-5px]">
                  Acne, Redness
                </Text>
              </View>
            </View>
            <View className="items-center w-full">
              <Text className="font-avlight text-sm text-secondary mt-4 text-left px-6 ">
                Niacinamide can help your skin appear smoother, softer, and more
                radiant. Although research is still ongoing, studies have also
                found that niacinamide may help balance your skin's oil
                production, which can make it a useful ingredient for those with
                oily skin and clogged pores.
              </Text>
            </View>
            <View className="items-center w-full overflow-hidden">
              <ImageBackground
                source={images.infoellipse}
                className="h-[250px] w-[250px] flex justify-center mt-5"
              >
                <Text className="text-center text-xl text-secondary mb-[175px] font-avbold">
                  More info
                </Text>
              </ImageBackground>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Products;

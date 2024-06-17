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
import {
  getCurrentUser,
  addIngredientToFavourites,
  removeIngredientFromFavourites,
  isIngredientFavourite,
} from "../../library/appwrite";
import { Player } from "@lordicon/react";
import Chemical from "../../components/Chemical";
import ingredients from "../../resources/ingredients.json";

const Products = () => {
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [legendModalVisible, setLegendModalVisible] = useState(false);
  const [isStarSelected, setIsStarSelected] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedSkinType, setSelectedSkinType] = useState(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedSkinTypes, setSelectedSkinTypes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConcerns, setIsOpenConcerns] = useState(false);
  const [selectedSkinConcerns, setSelectedSkinConcerns] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [isOpenProperties, setIsOpenProperties] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getCurrentUser();
      setCurrentUser(userData);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const checkIngredientFavourite = async () => {
      if (selectedIngredient && currentUser && currentUser.$id) {
        try {
          const ingredientIsFavourite = await isIngredientFavourite(
            currentUser.$id,
            selectedIngredient.name
          );
          setIsStarSelected(ingredientIsFavourite);
        } catch (error) {
          console.error("Error checking if ingredient is favourite:", error);
          setIsStarSelected(false);
        }
      } else {
        setIsStarSelected(false);
      }
    };

    checkIngredientFavourite();
  }, [selectedIngredient, currentUser]);

  const skinConcerns = [
    "Acne",
    "Eczema",
    "Dark spots",
    "Rosacea",
    "Dryness",
    "Greasiness",
    "Texture",
  ];
  const skinTypes = [
    "Normal",
    "Oily",
    "Dry",
    "Sensitive",
    "Combination",
    "Dehydrated",
    "Acne-prone",
  ];

  const properties = [
    "Exfoliating",
    "Unclogging",
    "Anti-aging",
    "Repairing",
    "Hydrating",
    "Anti-acne",
    "Lightening",
    "Moisturizing",
    "Smoothing",
  ];
  const handleChemicalPress = (ingredient) => {
    setSelectedIngredient(ingredient);
    setModalVisible(true);
  };

  const handleSkinTypeSelect = (skinTypes) => {
    setSelectedSkinTypes((prevSelectedSkinTypes) => {
      // Create a new array that includes all previously selected skin types
      let newSelectedSkinTypes = [...prevSelectedSkinTypes];

      // For each skin type that we want to select
      for (let skinType of skinTypes) {
        if (prevSelectedSkinTypes.includes(skinType)) {
          // If the skin type is already selected, deselect it
          newSelectedSkinTypes = newSelectedSkinTypes.filter(
            (type) => type !== skinType
          );
        } else {
          // If the skin type is not selected, select it
          newSelectedSkinTypes.push(skinType);
        }
      }

      return newSelectedSkinTypes;
    });
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const toggleLegendModal = () => {
    setLegendModalVisible(!legendModalVisible);
  };

  return (
    <>
      <Modal
        isVisible={legendModalVisible}
        className="align-start justify-start"
        animationIn="slideInDown"
        animationOut="slideOutUp"
        hasBackdrop={true}
        swipeDirection="up"
        onSwipeComplete={toggleLegendModal}
      >
        <View className="bg-secondary p-4 h-[40%] rounded-b-[30px] w-[50%] mt-[-20px]">
          <View className="flex-1 justify-center items-start">
            <View className="flex-row justify-between items-center mb-2">
              <View>
                <Text
                  className={`text-right font-avbolditalic ${
                    selectedSkinTypes.includes("Normal")
                      ? "text-orange"
                      : "text-white"
                  }`}
                >
                  Normal
                </Text>
                <Text
                  className={`text-right font-avbolditalic ${
                    selectedSkinTypes.includes("Combination")
                      ? "text-orange"
                      : "text-white"
                  }`}
                >
                  Combination
                </Text>
                <Text
                  className={`text-right font-avbolditalic ${
                    selectedSkinTypes.includes("Sensitive")
                      ? "text-orange"
                      : "text-white"
                  }`}
                >
                  Sensitive
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  handleSkinTypeSelect(["Normal", "Combination", "Sensitive"]);
                }}
              >
                <Image
                  source={images.normal}
                  className="w-14 h-14 ml-3 items-end"
                />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center mb-2">
              <View>
                <Text
                  className={`text-right font-avbolditalic ${
                    selectedSkinTypes.includes("Acne-prone")
                      ? "text-orange"
                      : "text-white"
                  }`}
                >
                  Acne-prone
                </Text>
                <Text
                  className={`text-right font-avbolditalic ${
                    selectedSkinTypes.includes("Oily")
                      ? "text-orange"
                      : "text-white"
                  }`}
                >
                  Oily
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  handleSkinTypeSelect(["Acne-prone", "Oily"]);
                }}
              >
                <Image source={images.oily} className="w-14 h-14 ml-5" />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center mb-2">
              <View>
                <Text
                  className={`text-right font-avbolditalic ${
                    selectedSkinTypes.includes("Dry")
                      ? "text-orange"
                      : "text-white"
                  }`}
                >
                  Dry
                </Text>
                <Text
                  className={`text-right font-avbolditalic ${
                    selectedSkinTypes.includes("Dehydrated")
                      ? "text-orange"
                      : "text-white"
                  }`}
                >
                  Dehydrated
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  handleSkinTypeSelect(["Dry", "Dehydrated"]);
                }}
              >
                <Image source={images.dry} className="w-14 h-14 ml-5" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="mt-2 items-center justify-end">
            <TouchableOpacity onPress={() => setLegendModalVisible(false)}>
              <Image
                source={icons.arrowtop}
                className="w-7 h-4 p-2 mt-2"
                tintColor={"#FFFFFF"}
                style={{ transform: [{ rotate: "180deg" }] }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={filterModalVisible}
        className="justify-start"
        animationIn="slideInDown"
        animationOut="slideOutUp"
        hasBackdrop={true}
        swipeDirection="up"
        onSwipeComplete={() => setFilterModalVisible(false)}
        style={{ alignItems: "flex-end" }}
      >
        <View
          className={`bg-secondary p-4 rounded-b-[30px] w-[60%] mt-[-20px] ${
            isOpen && isOpenConcerns && isOpenProperties
              ? "h-[95%]"
              : (isOpen && isOpenConcerns) ||
                (isOpen && isOpenProperties) ||
                (isOpenConcerns && isOpenProperties)
              ? "h-[75%]"
              : isOpen || isOpenConcerns || isOpenProperties
              ? "h-[51%]"
              : "h-[30%]"
          }`}
        >
          <View className="flex-1 justify-start items-start">
            <TouchableOpacity
              className="border-b border-white"
              onPress={() => setIsOpen(!isOpen)}
            >
              <View className="flex-row justify-between items-center mb-2 mt-10">
                <Text className="text-white text-left font-avbolditalic">
                  Skin Type
                </Text>
                <Text className="text-white text-right font-avbolditalic ml-28">
                  All
                </Text>
              </View>
            </TouchableOpacity>
            {isOpen && (
              <View className="flex-row flex-wrap mt-2">
                {skinTypes.map((type, index) => (
                  <TouchableOpacity
                    key={index}
                    className="w-1/2"
                    onPress={() => {
                      if (selectedSkinTypes.includes(type)) {
                        setSelectedSkinTypes(
                          selectedSkinTypes.filter((t) => t !== type)
                        );
                      } else {
                        setSelectedSkinTypes([...selectedSkinTypes, type]);
                      }
                    }}
                  >
                    <Text
                      className={`text-${
                        selectedSkinTypes.includes(type) ? "secondary" : "white"
                      } text-xs mr-1 text-left font-avbolditalic mt-2 border-[0.5px] border-white p-2 rounded-full ${
                        selectedSkinTypes.includes(type) ? "bg-white" : ""
                      }`}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <TouchableOpacity
              className="border-b border-white"
              onPress={() => setIsOpenConcerns(!isOpenConcerns)}
            >
              <View className="flex-row justify-between items-center mb-2 mt-5">
                <Text className="text-white text-left font-avbolditalic">
                  Skin Concern(s)
                </Text>
                <Text className="text-white text-right font-avbolditalic ml-[75px]">
                  All
                </Text>
              </View>
            </TouchableOpacity>
            {isOpenConcerns && (
              <View className="flex-row flex-wrap mt-2">
                {skinConcerns.map((concern, index) => (
                  <TouchableOpacity
                    key={index}
                    className="w-1/2"
                    onPress={() => {
                      if (selectedSkinConcerns.includes(concern)) {
                        setSelectedSkinConcerns(
                          selectedSkinConcerns.filter((c) => c !== concern)
                        );
                      } else {
                        setSelectedSkinConcerns([
                          ...selectedSkinConcerns,
                          concern,
                        ]);
                      }
                    }}
                  >
                    <Text
                      className={`text-${
                        selectedSkinConcerns.includes(concern)
                          ? "secondary"
                          : "white"
                      } text-xs mr-1 text-left font-avbolditalic mt-2 border-[0.5px] border-white p-2 rounded-full ${
                        selectedSkinConcerns.includes(concern) ? "bg-white" : ""
                      }`}
                    >
                      {concern}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <TouchableOpacity
              style={{ borderBottomWidth: 1, borderColor: "#fff" }}
              onPress={() => setIsOpenProperties(!isOpenProperties)}
            >
              <View className="flex-row justify-between items-center mb-2 mt-5">
                <Text className="text-white text-left font-avbolditalic">
                  Properties
                </Text>
                <Text className="text-white text-right font-avbolditalic ml-[110px]">
                  All
                </Text>
              </View>
            </TouchableOpacity>
            {isOpenProperties && (
              <View className="flex-row flex-wrap mt-2">
                {properties.map((property, index) => (
                  <TouchableOpacity
                    key={index}
                    className="w-1/2"
                    onPress={() => {
                      if (selectedProperties.includes(property)) {
                        setSelectedProperties(
                          selectedProperties.filter((p) => p !== property)
                        );
                      } else {
                        setSelectedProperties([
                          ...selectedProperties,
                          property,
                        ]);
                      }
                    }}
                  >
                    <Text
                      className={`text-${
                        selectedProperties.includes(property)
                          ? "secondary"
                          : "white"
                      } text-xs mr-1 text-left font-avbolditalic mt-2 border-[0.5px] border-white p-2 rounded-full ${
                        selectedProperties.includes(property) ? "bg-white" : ""
                      }`}
                    >
                      {property}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <View className="mt-2 items-center justify-end">
            <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
              <Image
                source={icons.arrowtop}
                className="w-7 h-4 p-2 mt-2"
                tintColor={"#FFFFFF"}
                style={{ transform: [{ rotate: "180deg" }] }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
                <View className="flex flex-row justify-between">
                  <TouchableOpacity
                    className="rounded-full border-[1px] border-secondary p-2 w-1/2 mr-1"
                    onPress={toggleLegendModal}
                  >
                    <Text className="text-center font-avregular">Legend</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="rounded-full border-[1px] border-secondary p-2 w-1/2 ml-1"
                    onPress={() => setFilterModalVisible(!filterModalVisible)}
                  >
                    <Text className="text-center font-avregular">Filter</Text>
                  </TouchableOpacity>
                </View>
                <Text className="text-center font-avlightitalic mt-4 text-base">
                  Press on an ingredient to see more details
                </Text>
              </View>
              {(selectedSkinTypes.length === 0 &&
              selectedSkinConcerns.length === 0 &&
              selectedProperties.length === 0
                ? ingredients
                : ingredients
                    .filter((ingredient) =>
                      selectedSkinTypes.length > 0
                        ? selectedSkinTypes.every((type) =>
                            ingredient.skinTypes.includes(type)
                          ) &&
                          !selectedSkinTypes.some((type) =>
                            ingredient.skinTypesBad.includes(type)
                          )
                        : true
                    )
                    .filter((ingredient) =>
                      selectedSkinConcerns.length > 0
                        ? selectedSkinConcerns.every((concern) =>
                            ingredient.skinConcerns.includes(concern)
                          ) &&
                          !selectedSkinConcerns.some((concern) =>
                            ingredient.skinConcernsBad.includes(concern)
                          )
                        : true
                    )
                    .filter((ingredient) =>
                      selectedProperties.length > 0
                        ? selectedProperties.every((property) =>
                            ingredient.properties.includes(property)
                          )
                        : true
                    )
                    .filter((ingredient) =>
                      search.length > 0
                        ? ingredient.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        : true
                    )
              ).map((ingredient) => (
                <Chemical
                  key={ingredient.name}
                  source={images[ingredient.image]}
                  title={ingredient.name}
                  text={ingredient.properties}
                  onPress={() => handleChemicalPress(ingredient)}
                />
              ))}
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
                  source={
                    selectedIngredient
                      ? images[selectedIngredient.imageComposition]
                      : null
                  }
                  className="w-[250px] h-[200px] mt-[10px]"
                />
                <View className="flex-row items-center justify-center mt-5">
                  <TouchableOpacity
                    onPress={() => {
                      const ingredientName = selectedIngredient.name;
                      if (isStarSelected && currentUser) {
                        // If it's already a favourite, remove it from favourites
                        removeIngredientFromFavourites(
                          currentUser.$id,
                          ingredientName
                        );
                      } else if (!isStarSelected && currentUser) {
                        // If it's not a favourite, add it to favourites
                        addIngredientToFavourites(
                          currentUser.$id,
                          ingredientName
                        );
                      }
                      // Toggle the star selection state
                      setIsStarSelected(!isStarSelected);
                    }}
                  >
                    <Image
                      source={
                        isStarSelected ? icons.pinkstar : icons.emptypinkstar
                      }
                      className="mr-2 w-[33px] h-8 bottom-0.5 right-0.5"
                    />
                  </TouchableOpacity>
                  <Text className="font-yesregular text-3xl text-secondary text-center">
                    {selectedIngredient && (
                      <Text className="font-yesregular text-2xl text-secondary text-center">
                        {selectedIngredient.name}
                      </Text>
                    )}
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
                  {selectedIngredient && (
                    <Text className="font-avlightitalic text-base text-secondary text-left mt-[-5px] w-[100px] ">
                      {selectedIngredient.skinTypes.join(", ")}
                    </Text>
                  )}
                  {selectedIngredient && (
                    <Text className="font-avlightitalic text-base text-secondary text-right mt-[-5px] w-[100px] ">
                      {selectedIngredient.skinConcerns.join(", ")}
                    </Text>
                  )}
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
                  {selectedIngredient && (
                    <Text className="font-avlightitalic text-base text-secondary text-left mt-[-5px] w-[100px] ">
                      {selectedIngredient.skinTypesBad.join(", ")}
                    </Text>
                  )}
                  {selectedIngredient && (
                    <Text className="font-avlightitalic text-base text-secondary text-right mt-[-5px] w-[100px] ">
                      {selectedIngredient.skinConcernsBad.join(", ")}
                    </Text>
                  )}
                </View>
              </View>
              <View className="items-center w-full">
                {selectedIngredient && (
                  <Text className="font-avlight text-sm text-secondary mt-4 text-left px-6 ">
                    {selectedIngredient.effects}
                  </Text>
                )}
              </View>
            </ScrollView>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
};

export default Products;

import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import { getCurrentUser } from "../../library/appwrite";
import products from "../../resources/products.json";
import images from "../../constants/images";

const Catalog = () => {
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getCurrentUser();
      setCurrentUser(userData);
    };

    fetchUserData();
  }, []);

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const productColors = ["#fdf7f4", "#fcfcea", "#f4fcf3"];

  const filteredProducts = products.filter((product) => {
    const searchLower = search.toLowerCase();
    return (
      product.title.toLowerCase().includes(searchLower) ||
      product.key_ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchLower)
      )
    );
  });

  return (
    <>
      <ScrollView className="bg-primary">
        <SafeAreaView className="h-full">
          <View className="flex-grow min-h-[83vh] px-7 my-5 bg-primary">
            <View className="mt-2">
              <View className="items-center">
                <Text className="font-yesregular text-5xl mt-7 text-secondary text-center">
                  Catalog
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
                <Text className="text-center font-avlightitalic mt-4 text-base">
                  Press on a product to see more details
                </Text>
              </View>
              <View className="px-2 mt-5">
                {filteredProducts.map((product, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleProductPress(product)}
                    className="flex-row items-center rounded-7xl p-4 mb-4"
                    style={{
                      backgroundColor:
                        productColors[index % productColors.length],
                      borderRadius: 30, // Increased border radius
                      flexDirection: index % 2 === 0 ? "row" : "row-reverse", // Switch sides
                    }}
                  >
                    <Image
                      source={images[product.image.split(".")[0]]} // Use the image from the product
                      className="w-12 h-40"
                    />
                    <View className="flex-1 pl-5">
                      <Text className="font-yesregular text-lg text-secondary">
                        {product.title}
                      </Text>
                      <Text className="font-avlight text-sm text-secondary mt-2">
                        <Text className="font-bold">Key Ingredients: </Text>
                        {product.key_ingredients.join(", ")}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
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
                    selectedProduct
                      ? images[selectedProduct.image.split(".")[0]]
                      : null
                  }
                  className="w-[75px] h-[250px] mt-[10px]"
                />
                <View className="flex-row items-center justify-center mt-5">
                  <Text className="font-yesregular text-3xl text-secondary text-center">
                    {selectedProduct && (
                      <Text className="font-yesregular text-2xl text-secondary text-center">
                        {selectedProduct.title}
                      </Text>
                    )}
                  </Text>
                </View>
              </View>
              <View className="items-center w-full">
                {selectedProduct && (
                  <Text className="font-avlight text-sm text-secondary mt-4 text-left px-6 ">
                    {selectedProduct.description}
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

export default Catalog;

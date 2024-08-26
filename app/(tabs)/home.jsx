import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons, icons_animated } from "../../constants";
import { signOut, getUsername, getCurrentUser } from "../../library/appwrite";
import { Player } from "@lordicon/react";
import Chemical from "../../components/Chemical";
import Modal from "react-native-modal";
import TipsAndTricks from "../../components/TipsAndTricks";
import ingredients from "../../resources/ingredients.json";
import Chatbot from "../../services/chatbotService";

const Home = () => {
  const [userDetails, setUserDetails] = useState({});
  const [displayCount, setDisplayCount] = useState(3);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSecondModalVisible, setSecondModalVisible] = useState(false);
  const [isThirdModalVisible, setThirdModalVisible] = useState(false);
  const [isFourthModalVisible, setFourthModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const data = await getCurrentUser();
      console.log("Returned from getCurrentUser:", data);
      setUserDetails(data);
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openSecondModal = () => {
    setSecondModalVisible(true);
  };

  const closeSecondModal = () => {
    setSecondModalVisible(false);
  };

  const openThirdModal = () => {
    setThirdModalVisible(true);
  };

  const closeThirdModal = () => {
    setThirdModalVisible(false);
  };

  const openFourthModal = () => {
    setFourthModalVisible(true);
  };

  const closeFourthModal = () => {
    setFourthModalVisible(false);
  };
  const logo = icons_animated.logo;

  const playerRef = useRef(null);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

  return (
    <ScrollView className="bg-primary">
      <Modal
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={closeModal}
        className="justify-end m-0"
        onBackdropPress={() => setModalVisible(false)}
        swipeThreshold={100}
        backdropOpacity={0}
      >
        <View className="h-[97%] bg-white rounded-t-[60px] border-[0.6px] border-secondary">
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex justify-center mt-2 items-center">
              <Image source={icons.arrowtop} className="w-7 h-4 p-2 mt-2" />
            </View>
            <View className="items-center pb-7">
              <ImageBackground
                className="absolute w-[90px] h-[90px] left-[-40px] top-[15px]"
                source={images.circleOrange}
              ></ImageBackground>
              <View className="flex items-center justify-center mt-5">
                <Text className="font-avlightitalic text-2xl text-secondary text-center">
                  How to apply
                </Text>
                <Text className="font-yesregular text-4xl text-secondary text-center">
                  Sunscreen
                </Text>
                <Image
                  source={icons.sunny}
                  className="w-[65px] h-[65px] mt-3"
                />
              </View>
            </View>
            <View className="items-start ml-7  pb-3 w-[88%]">
              <Text className="font-avregular text-2xl text-secondary text-left mt-2">
                1. Wash your face with cold water
              </Text>
              <Text className="font-avlight text-sm text-secondary text-left mt-2">
                This way your face already depuffs and you are sure to not
                irritate your skin
              </Text>
            </View>
            <View className="items-start ml-7  pb-3 w-[88%]">
              <Text className="font-avregular text-2xl text-secondary text-left mt-2">
                2. Moisturize your face
              </Text>
              <Text className="font-avlight text-sm text-secondary text-left mt-2">
                The best moment to moisturize is when your face is still damp
                (not wet!). This way the moisture can be locked in.
              </Text>
            </View>
            <ImageBackground
              className="absolute w-[150px] h-[150px] right-[-100px] top-[300px]"
              source={images.circleOrange}
            ></ImageBackground>
            <View className="items-start ml-7  pb-3 w-[88%]">
              <Text className="font-avregular text-2xl text-secondary text-left mt-2">
                3. Apply sunscreen
              </Text>
              <Text className="font-avlight text-sm text-secondary text-left mt-2">
                Wait a bit for your moisturizer to sink in your skin (+- 2 min).
                Apply a good amount on your face, otherwise it will not protect
                your skin.
              </Text>
            </View>
            <View className="items-start ml-7  pb-3 w-[88%]">
              <Text className="font-avregular text-base text-black text-left mt-10">
                Use an SPF between 30 and 50, depending on the UV-index that
                day. Any SPF below will not protect your skin. Use SPF every
                morning on your face.
              </Text>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <Modal
        isVisible={isSecondModalVisible}
        swipeDirection="down"
        onSwipeComplete={closeModal}
        className="justify-end m-0"
        onBackdropPress={() => setModalVisible(false)}
        swipeThreshold={50}
        backdropOpacity={0}
      >
        <View className="h-[97%] bg-white rounded-t-[60px] border-[0.6px] border-secondary">
          <ScrollView>
            <View className="flex justify-center mt-2 items-center">
              <TouchableOpacity onPress={closeSecondModal}>
                <Image source={icons.arrowtop} className="w-7 h-4 p-2 mt-2" />
              </TouchableOpacity>
            </View>
            <View className="items-center pb-7">
              <ImageBackground
                className="absolute w-[90px] h-[90px] left-[-40px] top-[15px]"
                source={images.circleOrange}
              ></ImageBackground>
              <View className="flex items-center justify-center mt-5">
                <Text className="font-avlightitalic text-2xl text-secondary text-center">
                  Correct order for
                </Text>
                <Text className="font-yesregular text-4xl text-secondary text-center">
                  Your Routine
                </Text>
                <Text className="font-avlightitalic text-sm text-secondary ml-[150px] mt-[-5px]">
                  Night Edition
                </Text>
                <Image
                  source={icons.routineface}
                  className="w-[65px] h-[80px] mt-1"
                />
              </View>
            </View>
            <View className="items-start ml-7  pb-3 w-[88%]">
              <Text className="font-avregular text-2xl text-secondary text-left mt-2">
                1. Cleanser
              </Text>
              <Text className="font-avlight text-sm text-secondary text-left mt-2">
                First always wash your hands! Clean your skin by using cold
                water and a good cleanser. Don't forget to rinse thoroughly.
              </Text>
            </View>
            <View className="items-start ml-7  pb-3 w-[88%]">
              <Text className="font-avregular text-2xl text-secondary text-left mt-2">
                2. Toner
              </Text>
              <Text className="font-avlight text-sm text-secondary text-left mt-2">
                Apply it with a clean cotton pad or your clean hands. Don't rub
                too much, you can dab it on.
              </Text>
            </View>
            <ImageBackground
              className="absolute w-[150px] h-[150px] right-[-110px] top-[500px]"
              source={images.circleOrange}
            ></ImageBackground>
            <View className="items-start ml-7  pb-3 w-[88%]">
              <Text className="font-avregular text-2xl text-secondary text-left mt-2">
                3. Serum
              </Text>
              <Text className="font-avlight text-sm text-secondary text-left mt-2">
                Apply the serum with your hand. Don't rub to hard, be gentle.
                Apply it on a damp face (damp from the toner).
              </Text>
            </View>
            <View className="items-start ml-7  pb-3 w-[88%]">
              <Text className="font-avregular text-2xl text-secondary text-left mt-2">
                4. Retinol
              </Text>
              <Text className="font-avlight text-sm text-secondary text-left mt-2">
                Wait until your face is COMPLETELY dry. If it isn't, you will
                have irritation. Apply it very sparingly. Wait until it has
                worked in before moisturizing.
              </Text>
            </View>
            <View className="items-start ml-7  pb-3 w-[88%]">
              <Text className="font-avregular text-2xl text-secondary text-left mt-2">
                5. Eye Cream
              </Text>
              <Text className="font-avlight text-sm text-secondary text-left mt-2">
                Apply on your under eyes and on your eyelids (around your eyes).
                Don't get to close to your eye, it will sting. Don't rub to
                hard, the skin around your eyes is very delicate.
              </Text>
            </View>
            <View className="items-start ml-7  pb-3 w-[88%]">
              <Text className="font-avregular text-2xl text-secondary text-left mt-2">
                6. Moisturizer
              </Text>
              <Text className="font-avlight text-sm text-secondary text-left mt-2">
                Moisturize your entire face (except eye-area). Use a sufficient
                amount. Work it in by gently rubbing your face.
              </Text>
            </View>
            <View className="items-start ml-7  pb-3 w-[88%]">
              <Text className="font-avregular text-2xl text-secondary text-left mt-2">
                7. Oil
              </Text>
              <Text className="font-avlight text-sm text-secondary text-left mt-2">
                Apply any face-safe oils. Don't use too much, you will clog your
                pores by doing so.
              </Text>
            </View>
            <View className="items-start ml-7  pb-3 w-[88%]">
              <Text className="font-avregular text-base text-black text-left mt-10">
                No need to get overwhelmed! You don't need all of these
                products. In fact, using too many products is not good for your
                skin. It needs to absorb everything, so less is more in most
                situations! Here you can just find what general order a complete
                skin care routine has. Take out what you don't use and you have
                the right order for what you do use! This counts as a night time
                routine. Some of these products are not suppose to be used in
                the morning because they are sensitive to daylight or don't go
                well with sunscreen.
              </Text>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <Modal
        isVisible={isThirdModalVisible}
        swipeDirection="down"
        onSwipeComplete={closeThirdModal}
        className="justify-end m-0"
        onBackdropPress={() => setThirdModalVisible(false)}
        swipeThreshold={50}
        backdropOpacity={0}
      >
        <View className="h-[97%] bg-white rounded-t-[60px] border-[0.6px] border-secondary">
          <ScrollView>
            <View className="flex justify-center mt-2 items-center">
              <TouchableOpacity onPress={closeThirdModal}>
                <Image source={icons.arrowtop} className="w-7 h-4 p-2 mt-2" />
              </TouchableOpacity>
            </View>
            <View className="items-center pb-7">
              <ImageBackground
                className="absolute w-[90px] h-[90px] left-[-40px] top-[15px]"
                source={images.circleOrange}
              ></ImageBackground>
              <View className="flex items-center justify-center mt-5">
                <Text className="font-avlightitalic text-2xl text-secondary text-center">
                  Which ingredients
                </Text>
                <Text className="font-yesregular text-4xl text-secondary text-center">
                  Don't Match
                </Text>
                <Image
                  source={icons.nomatch}
                  className="w-[65px] h-[80px] mt-1"
                />
              </View>
            </View>
            <View className="items-start ml-7  pb-3 w-[88%]">
              <Text className="font-avregular text-2xl text-secondary text-left mt-2">
                AHA/BHA & Retinol
              </Text>
              <Text className="font-avlight text-sm text-secondary text-left mt-2">
                Combining these two will result in irritation, redness,
                inflammation, peeling and/or dryness.
              </Text>
            </View>
            <View className="items-start ml-7  pb-3 w-[88%]">
              <Text className="font-avregular text-2xl text-secondary text-left mt-2">
                BHA & Benzoyl peroxide
              </Text>
              <Text className="font-avlight text-sm text-secondary text-left mt-2">
                Combining these two will result in irritation, redness,
                inflammation, peeling and/or dryness.
              </Text>
            </View>
            <ImageBackground
              className="absolute w-[150px] h-[150px] right-[-110px] top-[500px]"
              source={images.circleOrange}
            ></ImageBackground>
            <View className="items-start ml-7  pb-3 w-[88%]">
              <Text className="font-avregular text-2xl text-secondary text-left mt-2">
                AHA/BHA & Vitamin C
              </Text>
              <Text className="font-avlight text-sm text-secondary text-left mt-2">
                Combining these two will result in irritation, redness,
                inflammation, peeling and/or dryness.
              </Text>
            </View>
            <View className="items-start ml-7  pb-3 w-[88%]">
              <Text className="font-avregular text-2xl text-secondary text-left mt-2">
                Niacinimide & Vitamin C
              </Text>
              <Text className="font-avlight text-sm text-secondary text-left mt-2">
                Combining these two will result in irritation.
              </Text>
            </View>

            <View className="items-start ml-7  pb-3 w-[88%]">
              <Text className="font-avregular text-base text-black text-left mt-10">
                It is important to pay attention to what active ingredients you
                are using. Active ingredients are ingredients that targets a
                specific skin concern. They are stronger than regular
                ingredients. Some don't go together and will irritate your skin
                of you do use them together. The active ingredients that are
                present on this app are:
              </Text>
              <Text className="font-avbold text-base text-black text-left mt-2">
                AHA - BHA - PHA - Retinol - Hyaluronic acid - Salicylic acid -
                Glycolic acid - Niacinamide - Vitamin C - Vitamin E - Panthenol
                - Clay (some) - Benzoyl peroxide
              </Text>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <Modal
        isVisible={isFourthModalVisible}
        swipeDirection="down"
        onSwipeComplete={closeFourthModal}
        className="justify-end m-0"
        onBackdropPress={() => setFourthModalVisible(false)}
        swipeThreshold={50}
        backdropOpacity={0}
      >
        <View className="h-[97%] bg-white rounded-t-[60px] border-[0.6px] border-secondary">
          <ScrollView>
            <View className="flex justify-center mt-2 items-center">
              <TouchableOpacity onPress={closeFourthModal}>
                <Image source={icons.arrowtop} className="w-7 h-4 p-2 mt-2" />
              </TouchableOpacity>
            </View>
            <View className="items-center pb-7">
              <ImageBackground
                className="absolute w-[90px] h-[90px] left-[-40px] top-[15px]"
                source={images.circleOrange}
              ></ImageBackground>
              <View className="flex items-center justify-center mt-5">
                <Text className="font-avlightitalic text-2xl text-secondary text-center">
                  Difference
                </Text>
                <Text className="font-yesregular text-4xl text-secondary text-center">
                  AHA, BHA & PHA
                </Text>
                <Image
                  source={icons.difference}
                  className="w-[65px] h-[80px] mt-1"
                />
              </View>
            </View>
            <View className="items-start ml-7  pb-3 w-[88%]">
              <Text className="font-avregular text-2xl text-secondary text-left mt-2">
                AHA (Alpha Hydroxy Acid)
              </Text>
              <Text className="font-avbold text-sm text-secondary text-left mt-2">
                Examples: Glycolic acid, Lactic acid
              </Text>
              <Text className="font-avlight text-sm text-secondary text-left">
                AHA's are better for skin that has texture and an uneven skin
                tone. This is the strongest exfoliator out of the three. It
                works best on less congested skin.
              </Text>
            </View>
            <View className="items-start ml-7  pb-3 w-[88%]">
              <Text className="font-avregular text-2xl text-secondary text-left mt-2">
                BHA (Beta Hydroxy Acid)
              </Text>
              <Text className="font-avbold text-sm text-secondary text-left mt-2">
                Examples: Salicylic acid
              </Text>
              <Text className="font-avlight text-sm text-secondary text-left">
                BHA's are more aggressive exfoliators. They work well on acne
                and an oilier skin type. If used on dry skin, it can very well
                be irritating.
              </Text>
            </View>
            <ImageBackground
              className="absolute w-[150px] h-[150px] right-[-110px] top-[500px]"
              source={images.circleOrange}
            ></ImageBackground>
            <View className="items-start ml-7  pb-3 w-[88%]">
              <Text className="font-avregular text-2xl text-secondary text-left mt-2">
                PHA (Poly Hydroxy Acid)
              </Text>
              <Text className="font-avbold text-sm text-secondary text-left mt-2">
                Examples: Gluconolactone
              </Text>
              <Text className="font-avlight text-sm text-secondary text-left">
                PHA's are the softest exfoliator of the three. They are best
                suitable for sensitive skin.
              </Text>
            </View>

            <View className="items-start ml-7  pb-3 w-[88%]">
              <Text className="font-avregular text-base text-black text-left mt-5">
                Now you can choose which acid you want to use for your skin. Be
                careful not to use too much or multiple together, it will dry
                out your skin. Never apply these on wet skin, it will irritate.
              </Text>
              <Text className="font-avbold text-base text-black text-left mt-2">
                It is also recommended to use these acids not more than 2x per
                week. Keep the strength of the exfoliator in mind, the stronger
                it is, the more sparingly you want to use it.
              </Text>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <SafeAreaView className="h-full">
        <View className="flex-grow min-h-[83vh] px-7 my-5 bg-primary">
          <View className="absolute right-[-20] top-[-100]">
            <ImageBackground
              source={images.neckkkk}
              className="w-[250px] h-[350px]"
            ></ImageBackground>
          </View>
          <View className="mt-10">
            <View className="flex-row items-center">
              <Text className="font-yesregular text-4xl text-secondary">
                Hey {userDetails.username},
              </Text>
            </View>
            <View>
              <Text className="font-avlightitalic text-base text-secondary mt-1">
                Let's explore your skin together
              </Text>
            </View>
          </View>
          <View className="bg-white rounded-[50px] mt-[100px] p-4 border-[0.3px] border-secondary">
            <ImageBackground
              style={{ transform: [{ scaleX: -1 }] }}
              className="absolute w-[100px] h-[100px] left-[-65px] top-[-50px]"
              source={images.animatedblad}
            ></ImageBackground>
            <Text className="font-yesregular text-3xl text-secondary text-center">
              Tips & Tricks
            </Text>
            <Text className="font-avlightitalic text-base text-secondary text-center mt-[-5px]">
              Swipe for more
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TipsAndTricks
                iconSource={icons.sunny}
                title="How to apply"
                subtitle="Sunscreen"
                onButtonPress={openModal}
                height={42}
                width={42}
              />

              <TipsAndTricks
                iconSource={icons.routineface}
                title="Correct order for"
                subtitle="Your Routines"
                onButtonPress={openSecondModal}
                height={42}
                width={35}
              />
              <TipsAndTricks
                iconSource={icons.nomatch}
                title="Which ingredients"
                subtitle="Don't Match"
                onButtonPress={openThirdModal}
                height={42}
                width={35}
              />
              <TipsAndTricks
                iconSource={icons.difference}
                title="Difference"
                subtitle="AHA, BHA..."
                onButtonPress={openFourthModal}
                height={42}
                width={35}
              />
            </ScrollView>
          </View>
          <View className="bg-white rounded-[50px] mt-[30px] p-4 border-[0.3px] border-secondary">
            <Text className="font-yesregular text-2xl text-secondary text-center mt-3">
              Recommended for you
            </Text>
            <Text className="font-avlightitalic text-base text-secondary text-center mt-[-5px]">
              {userDetails.skinType
                ? userDetails.skinType.charAt(0).toUpperCase() +
                  userDetails.skinType.slice(1) +
                  " skin type"
                : "Loading skin type..."}
            </Text>
            {ingredients.slice(0, displayCount).map((ingredient, index) => {
              if (
                userDetails.skinType &&
                ingredient.skinTypes
                  .map((type) => type.toLowerCase())
                  .includes(userDetails.skinType.toLowerCase())
              ) {
                return (
                  <Chemical
                    key={index}
                    index={index}
                    title={ingredient.name}
                    text={ingredient.properties}
                  />
                );
              }
              return null;
            })}
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {displayCount < ingredients.length ? (
                <TouchableOpacity
                  onPress={() => {
                    console.log("See More clicked");
                    setDisplayCount(ingredients.length);
                  }}
                  className="rounded-full"
                >
                  <Text className="font-avlightitalic text-base text-white text-center mt-3 cursor-pointer bg-secondary w-[100px] rounded-full py-2">
                    See More
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    console.log("See Less clicked");
                    setDisplayCount(2);
                  }}
                  className="rounded-full"
                >
                  <Text className="font-avlightitalic text-base text-white text-center mt-3 cursor-pointer bg-secondary w-[100px] rounded-full py-2">
                    See Less
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;

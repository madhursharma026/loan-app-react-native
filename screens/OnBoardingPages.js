import { useEffect } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const slides = [
  {
    title: "Detailed Credit Report",
    text: "Lorem ipsum dolor sit amet consecte tuer adipsing elit sed diam monum my nibh eusimod eltor",
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: "Get Improvement Tips",
    text: "Lorem ipsum dolor sit amet consecte tuer adipsing elit sed diam monum my nibh eusimod eltor",
    image: 'https://images.unsplash.com/photo-1589666564459-93cdd3ab856a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: "100% Safe & Secure",
    text: "Lorem ipsum dolor sit amet consecte tuer adipsing elit sed diam monum my nibh eusimod eltor",
    image: 'https://plus.unsplash.com/premium_photo-1680721444847-33e37f1bd4d1?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const OnBoardingPages = ({ navigation }) => {

  useEffect(() => {
    async function fetchLoginData() {
      const value = await AsyncStorage.getItem('AUTH_TOKEN');
      if (value !== null) {
        navigation.navigate('Home Page')
      } else {
        console.log("No Login Detail Found")
      }
    }
    fetchLoginData();
  }, [1]);

  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar />
        <Image style={{ resizeMode: "cover", height: "70%", width: "100%", }} source={{ uri: item.image, }} />
        <Text style={{ paddingTop: 15, paddingBottom: 5, fontSize: 24, fontWeight: "bold", color: "#21465b", alignSelf: "center", }}>
          {item.title}
        </Text>
        <Text style={{ textAlign: "center", color: "#b5b5b5", fontSize: 15, paddingHorizontal: 15 }}>
          {item.text}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Authentication')}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Sign in</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      activeDotStyle={{
        backgroundColor: "#21465b",
        width: 30
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  btn: {
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 6,
    marginVertical: 10,
    alignItems: 'center',
    borderColor: 'black',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    lineHeight: 20,
    fontWeight: '600',
  },
});

export default OnBoardingPages;


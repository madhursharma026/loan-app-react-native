import React from "react";
import { LogBox } from "react-native";
import HomePage from "./screens/HomePage";
import DetailedPage from "./screens/DetailedPage";
import VideoCallPage from "./screens/VideoCallPage";
import Authentication from "./screens/Authentication";
import OnBoardingPages from "./screens/OnBoardingPages";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ApolloClient, InMemoryCache, ApolloProvider, } from '@apollo/client';

LogBox.ignoreAllLogs();
const Stack = createStackNavigator();

export default function App() {
  const client = new ApolloClient({
    uri: 'http://192.168.0.105:8000/graphql',
    cache: new InMemoryCache(),
    fetchOptions: {
      mode: 'no-cors',
    },
  });

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="OnBoardingPages" component={OnBoardingPages} options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name="Home Page" component={HomePage} options={{ headerShown: true }}></Stack.Screen>
          <Stack.Screen name="Detailed Page" component={DetailedPage} options={{ headerShown: true }}></Stack.Screen>
          <Stack.Screen name="VideoCallPage" component={VideoCallPage} options={{ headerShown: true }}></Stack.Screen>
          <Stack.Screen name="Authentication" component={Authentication} options={{ headerShown: true }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}


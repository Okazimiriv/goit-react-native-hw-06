import 'react-native-gesture-handler';

import React from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Registration from './screens/RegistrationScreen.jsx';
import Login from './screens/LoginScreen.jsx';
import Post from './screens/PostsScreen.jsx';
import Home from './screens/Home.jsx';
import Comments from './screens/CommentsScreen.jsx';
import Map from './screens/MapScreen.jsx';

import { Feather } from '@expo/vector-icons';

const MainStack = createStackNavigator(); // вказує на групу навігаторів

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="Registration"
        screenOptions={{
          headerShown: false,
        }}
      >
        <MainStack.Screen
          name="Registration"
          component={Registration}
          screenOptions={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Login"
          component={Login}
          screenOptions={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{
            // title: 'Home',
            headerStyle: {
              backgroundColor: '#FF6C00',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
        />
        <MainStack.Screen
          name="Post"
          component={Post}
          options={{
            title: 'Публікації',
            headerShown: true,
          }}
        />
        <MainStack.Screen
          name="Comments"
          component={Comments}
          options={{
            title: 'Коментарі',
            headerShown: true,
            headerStyle: {
              borderBottomWidth: 1,
            },
          }}
        />
        <MainStack.Screen
          name="Map"
          component={Map}
          options={{
            title: 'Мапа',
            headerShown: true,
            headerStyle: {
              borderBottomWidth: 1,
            },
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

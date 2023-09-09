import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Post from './PostsScreen.jsx';
import CreatePost from './CreatePostsScreen.jsx';
import Profile from './ProfileScreen.jsx';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import IconLogOut from '@expo/vector-icons/Feather.js';

const Tabs = createBottomTabNavigator();

const Home = () => {
  const navigation = useNavigation();

  return (
    <Tabs.Navigator
      style={styles.container}
      initialRouteName="Post"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Post') {
            iconName = focused ? 'appstore-o' : 'appstore1';
          } else if (route.name === 'CreatePost') {
            iconName = focused ? 'pluscircleo' : 'pluscircle';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
          }
          return (
            <AntDesign name={iconName} size={Number(size)} color={color} />
          );
        },
      })}
    >
      <Tabs.Screen
        name="Post"
        component={Post}
        options={{
          title: 'Публікації',
          headerRight: () => (
            <IconLogOut.Button
              name="log-out"
              color="#BDBDBD"
              size={24}
              backgroundColor="transparent"
              onPress={() => navigation.navigate('Login')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          title: 'Створити публікацію',
          headerShown: true,
          // headerStyle: {
          //   borderBottomWidth: 1,
          // },
          tabBarStyle: { display: 'none' },
          headerLeft: () => (
            <Feather
              name="arrow-left"
              size={24}
              color="#212121CC"
              style={styles.icon}
              onPress={() => navigation.navigate('Home', { screen: 'Post' })}
            />
          ),
        }}
      />
      <Tabs.Screen name="Profile" component={Profile} />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginLeft: 16,
    backgroundColor: 'transparent',
  },
});
export default Home;

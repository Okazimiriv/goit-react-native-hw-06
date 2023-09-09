import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from '@expo/vector-icons/Feather';
import photo1 from '../assets/images/post-1.png';
import photo2 from '../assets/images/post-2.png';
import photo3 from '../assets/images/post-3.png';

const PHOTOS = [
  {
    id: '1',
    title: 'Ліс',
    img: photo1,
    commentsNumber: 8,
    location: 'Ivano-Frankivsk Region, Ukraine',
    region: {
      latitude: 48.36851,
      longitude: 24.39808,
    },
  },
  {
    id: '2',
    title: 'Захід на Чорному морі',
    img: photo2,
    commentsNumber: 3,
    location: 'Crimean Region, Ukraine',
    region: {
      latitude: 44.38843,
      longitude: 33.77988,
    },
  },
  {
    id: '3',
    title: 'Старий будиночок у Венеції',
    img: photo3,
    commentsNumber: 50,
    location: 'Venice, Italy',
    region: {
      latitude: 45.4386,
      longitude: 12.33177,
    },
  },
];

const Post = () => {
  const navigation = useNavigation();
  const [photos, setPhotos] = useState(PHOTOS);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image source={require('../assets/images/ava-natali.png')} />
        <View style={styles.wrapperUserInfo}>
          <Text style={styles.name}>Natali Romanchuk</Text>
          <Text style={styles.email}>email@gmail.com</Text>
        </View>
      </View>

      <SafeAreaView style={styles.containerPhoto}>
        <ScrollView>
          {photos.map(photo => (
            <View key={photo.id} style={styles.containerPhotoItem}>
              <Pressable
                style={styles.postStyle}
                onPress={() =>
                  navigation.navigate('Comments', { img: photo.img })
                }
              >
                <Image source={photo.img} style={{ width: 343, height: 240 }} />
              </Pressable>
              <Text style={styles.postTitle}>{photo.title} </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <Image
                    source={require('../assets/icons/message-circle.png')}
                    style={{ width: 18, height: 18 }}
                  />
                  <Text
                    style={[
                      styles.text,
                      {
                        color: '#BDBDBD',
                      },
                    ]}
                  >
                    {photo.commentsNumber}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  {/* <Image
                      source={require('../assets/icons/map-pin.png')}
                      style={{ width: 18, height: 18 }}
                    /> */}
                  <Pressable
                    style={styles.location}
                    onPress={() =>
                      // console.log({ region: photo.region })
                      navigation.navigate('Map', { region: photo.region })
                    }
                  >
                    <Icon name="map-pin" size={18} color="#BDBDBD" />
                    <Text
                      style={[
                        styles.text,
                        {
                          color: '#212121',
                          textDecorationLine: 'underline',
                        },
                      ]}
                    >
                      {photo.location}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    marginTop: 44,
    paddingBottom: 11,
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
  },
  title: {
    backgroundColor: '#FFFFFF',
    fontSize: 17,
    paddingBottom: 5,
  },
  pressLogoff: {
    alignSelf: 'center',
    marginLeft: 120,
    paddingRight: 10,
  },
  wrapper: {
    flexDirection: 'row',
    marginTop: 32,
    paddingLeft: 16,
    alignItems: 'center',
  },
  wrapperUserInfo: {
    flexDirection: 'column',
    paddingLeft: 8,
  },
  name: {
    fontWeight: 700,
    fontSize: 13,
  },
  email: {
    fontWeight: 400,
    fontSize: 11,
  },
  postStyle: {
    alignSelf: 'center',
    marginTop: 15,
  },
  containerPhoto: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  containerPhotoItem: {
    marginBottom: 40,
  },
  postTitle: {
    marginTop: 8,
    marginBottom: 8,
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    lineHeight: 18.75,
    color: '#212121',
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    lineHeight: 18.75,
  },
  location: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 4,
  },
});

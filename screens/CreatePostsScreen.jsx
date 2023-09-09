import { useEffect, useState } from 'react';
import { Camera } from 'expo-camera';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Platform,
  Alert,
} from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

const CreatePostsScreen = () => {
  const navigation = useNavigation();
  const [isOpenKeyboard, setIsOpenKeyboard] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [convertedCoordinate, setConvertedCoordinate] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [namePost, setNamePost] = useState('');
  const [location, setLocation] = useState(null);
  const [isDisabledPublishBtn, setIsDisabledPublishBtn] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    const disabled =
      capturedPhoto !== null &&
      namePost !== '' &&
      convertedCoordinate !== null &&
      location !== null
        ? false
        : true;
    setIsDisabledPublishBtn(disabled);
  }, [capturedPhoto, namePost, convertedCoordinate, location]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled && result.assets.length > 0) {
      await MediaLibrary.createAssetAsync(result.assets[0].uri);
      setCapturedPhoto(result.assets[0].uri);

      const { coords } = await Location.getCurrentPositionAsync();
      setLocation(coords);

      const address = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      // console.log(address);

      const { region, country } = address[0];
      setConvertedCoordinate({ region, country });
      setType(
        type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
      );
    }
  };

  const openGallery = async () => {
    const galleryResult = await ImagePicker.launchImageLibraryAsync();

    if (!galleryResult.canceled && galleryResult.assets.length > 0) {
      setCapturedPhoto(galleryResult.assets[0].uri);

      const { coords } = await Location.getCurrentPositionAsync();
      setLocation(coords);
      const address = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      const { region, country } = address[0];
      setConvertedCoordinate({ region, country });
    }
  };

  const publishPhoto = () => {
    async () => {
      if (cameraRef) {
        const { uri } = await cameraRef.takePictureAsync();
        await MediaLibrary.createAssetAsync(uri);
      }
    };

    if (location) {
      console.log({
        capturedPhoto,
        namePost,
        location,
        convertedCoordinate,
      });
      setCapturedPhoto(null);
      setNamePost('');
      setLocation(null);
      setConvertedCoordinate(null);
      navigation.navigate('Home', { screen: 'Post' });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
        }}
      >
        <View style={styles.container}>
          <View>
            <View style={styles.photoWrapper}>
              <View style={styles.photoContent}>
                <Pressable style={styles.cameraIcon} onPress={openCamera}>
                  <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
                </Pressable>
              </View>
              {capturedPhoto ? (
                <Image
                  style={styles.previewImage}
                  source={{ uri: capturedPhoto }}
                />
              ) : (
                <Camera style={styles.camera} type={type} ref={setCameraRef} />
              )}
            </View>

            <Pressable onPress={openGallery}>
              <Text style={styles.text}>
                {capturedPhoto ? 'Редагувати фото' : 'Завантажте фото'}
              </Text>
            </Pressable>
            <View>
              <TextInput
                style={[
                  styles.input,
                  { height: 50, fontFamily: 'Roboto-Medium' },
                ]}
                placeholder="Назва..."
                value={namePost.trimStart()}
                onChangeText={setNamePost}
                onFocus={() => setIsOpenKeyboard(true)}
                onBlur={() => setIsOpenKeyboard(false)}
              />

              <View style={styles.location}>
                <Feather name="map-pin" size={24} color="#BDBDBD" />
                <TextInput
                  style={[
                    styles.input,
                    {
                      flex: 1,
                      borderBottomWidth: 0,
                      marginBottom: 0,
                      fontFamily: 'Roboto-Regular',
                    },
                  ]}
                  placeholder="Місцевість..."
                  value={
                    convertedCoordinate
                      ? `${convertedCoordinate.region}, ${convertedCoordinate.country}`
                      : null
                  }
                  onFocus={() => setIsOpenKeyboard(true)}
                  onBlur={() => setIsOpenKeyboard(false)}
                />
              </View>
            </View>
            <Pressable
              style={
                isDisabledPublishBtn
                  ? {
                      ...styles.button,
                      backgroundColor: '#F6F6F6',
                      color: '#BDBDBD',
                    }
                  : { ...styles.button, backgroundColor: '#FF6C00' }
              }
              disabled={isDisabledPublishBtn}
              onPress={publishPhoto}
            >
              <Text
                style={
                  isDisabledPublishBtn
                    ? {
                        ...styles.textBtn,
                        color: '#BDBDBD',
                      }
                    : { ...styles.textBtn, color: '#FFFFFF' }
                }
              >
                {location || !capturedPhoto
                  ? 'Опублікувати'
                  : 'Завантаження...'}
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginBottom: 34,
            }}
          >
            <Pressable
              style={styles.buttonDelete}
              onPress={() => {
                setCapturedPhoto(null);
                setNamePost('');
                setConvertedCoordinate(null);
                Alert.alert('Deleted');
              }}
            >
              <Feather name="trash-2" size={24} color="#BDBDBD" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  photoWrapper: {
    with: '100%',
    height: 240,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContent: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#FFFFFF4D',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
    height: 50,
    marginBottom: 32,
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
    marginBottom: 32,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
    marginBottom: 16,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  button: {
    marginTop: 32,
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: '#F6F6F6',
    // color: '#BDBDBD',
    justifyContent: 'center',
    borderRadius: 100,
  },
  textBtn: {
    fontSize: 16,
    alignSelf: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto-Regular',
    lineHeight: 19,
    // color: '#BDBDBD',
  },
  buttonDelete: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F6F6F6',
  },
});

export default CreatePostsScreen;

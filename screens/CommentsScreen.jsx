import React from 'react';
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';

const Comments = ({ route: { params } }) => {
  const navigation = useNavigation();
  const [isOpenKeyboard, setIsOpenKeyboard] = useState(false);
  const { img } = params;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
        }}
      >
        <View
          style={[
            styles.container,
            {
              paddingBottom: isOpenKeyboard ? 100 : 16,
            },
          ]}
        >
          <View style={styles.wrapper}>
            <Image style={styles.image} resizeMode={'cover'} source={img} />

            <View style={styles.wrapperComent}>
              <Image source={require('../assets/icons/ellipse.png')} />
              <View style={styles.boxTitle}>
                <Text style={styles.title}>
                  Really love your most recent photo. I’ve been trying to
                  capture thesame thing for a few months and would love some
                  tips!
                </Text>
                <Text style={styles.titleData}>"09 червня, 2020 | 08:40"</Text>
              </View>
            </View>
            <View style={styles.wrapperComentUser}>
              <Image source={require('../assets/icons/ellipse-user.png')} />
              <View style={styles.boxTitle}>
                <Text style={styles.title}>
                  A fast 50mm like f1.8 would help with the bokeh. I’ve been
                  using primes as they tend to get a bit sharper images.
                </Text>
                <Text style={[styles.titleData, { textAlign: 'left' }]}>
                  "09 червня, 2020 | 09:20"
                </Text>
              </View>
            </View>
            <View style={[styles.wrapperComent]}>
              <Image source={require('../assets/icons/ellipse.png')} />
              <View style={styles.boxTitle}>
                <Text style={styles.title}>
                  Thank you! That was very helpful!
                </Text>
                <Text style={styles.titleData}>"09 червня, 2020 | 09:20"</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }}></View>

          <View>
            <TextInput
              onFocus={() => setIsOpenKeyboard(true)}
              onBlur={() => setIsOpenKeyboard(false)}
              style={styles.input}
              placeholder="Коментувати..."
            />
            <TouchableOpacity style={styles.btnUp}>
              <AntDesign name="arrowup" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#FFFFFF',
    height: '100%',
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 32,
    justifyContent: 'flex-end',
  },
  wrapper: {
    marginTop: 32,
  },
  wrapperComent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    textAlign: 'right',
    marginBottom: 24,
    gap: 16,
  },
  wrapperComentUser: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    textAlign: 'right',
    marginBottom: 24,
    gap: 16,
  },
  boxTitle: {
    width: '100%',
    backgroundColor: '#00000008',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    padding: 16,
    flexShrink: 1,
  },
  title: {
    marginBottom: 8,
    color: '#212121',
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 18,
  },
  titleData: {
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
    lineHeight: 11.72,
    textAlign: 'right',
    color: '#BDBDBD',
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
    paddingTop: 32,
  },
  btnUp: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FF6C00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 25,
    fontSize: 16,
    lineHeight: 19.36,
  },
});
export default Comments;

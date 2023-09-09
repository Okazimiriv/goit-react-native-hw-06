import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
  Alert,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import BackImage from '../assets/images/photo-bg.png';

const Login = () => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isOpenKeyboard, setIsOpenKeyboard] = useState(false);
  const [isFocusedMail, setIsFocusedMail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const navigation = useNavigation();

  const togglePassword = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ImageBackground source={BackImage} style={styles.image}>
            <View
              style={{
                ...styles.loginWrapper,
                paddingBottom: isOpenKeyboard ? 10 : 78,
                height: isOpenKeyboard ? 350 : 'auto',
              }}
            >
              <Text style={styles.title}>Увійти</Text>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: isFocusedMail ? '#FF6C00' : '#E8E8E8',
                }}
                placeholder="Адреса електронної пошти"
                editable
                numberOfLines={1}
                maxLength={40}
                onChangeText={text => onChangeEmail(text)}
                value={email}
                selectionColor={'#FF6C00'}
                onFocus={() => {
                  setIsOpenKeyboard(true), setIsFocusedMail(true);
                }}
                onBlur={() => {
                  setIsOpenKeyboard(false), setIsFocusedMail(false);
                }}
              />
              <View>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isFocusedPassword ? '#FF6C00' : '#E8E8E8',
                  }}
                  placeholder="Пароль"
                  autoComlete="password"
                  secureTextEntry={secureTextEntry}
                  editable
                  numberOfLines={1}
                  maxLength={40}
                  onChangeText={text => onChangePassword(text)}
                  value={password}
                  selectionColor={'#FF6C00'}
                  onFocus={() => {
                    setIsOpenKeyboard(true), setIsFocusedPassword(true);
                  }}
                  onBlur={() => {
                    setIsOpenKeyboard(false), setIsFocusedPassword(false);
                  }}
                />
                <TouchableOpacity
                  style={{ position: 'absolute', top: 16, right: 16 }}
                  onPress={togglePassword}
                >
                  <Text>{secureTextEntry ? 'Показати' : 'Сховати'}</Text>
                </TouchableOpacity>
              </View>
              <Pressable
                style={styles.buttonLogin}
                onPress={() => {
                  // Alert.alert("Credentials Login", ` ${email} + ${password}`),
                  navigation.navigate('Home');
                }}
              >
                <Text style={styles.textBtnLogin}>Увійти</Text>
              </Pressable>
              <Pressable
                style={styles.buttonRegistration}
                onPress={() => {
                  navigation.navigate('Registration');
                }}
              >
                <Text style={styles.text}>Немає аккаунту? Зареєструватися</Text>
              </Pressable>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  loginWrapper: {
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 111,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#FFFFFF',
  },
  title: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 35.16,
    paddingBottom: 32,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 16,
    paddingLeft: 16,
    height: 50,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E8E8E8',
    // activeBorderColor: "FF6C00",
  },
  buttonLogin: {
    marginTop: 27,
    height: 51,
    backgroundColor: '#FF6C00',
    justifyContent: 'center',
    borderRadius: 100,
  },
  textBtnLogin: {
    fontSize: 16,
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
  },
  buttonRegistration: {
    marginTop: 16,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Roboto-Regular',
    color: '#1B4371',
    textAlign: 'center',
    marginTop: 16,
  },
});
export default Login;

import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import BackImage from "../assets/images/photo-bg.png";
import { useState } from "react";

const Registration = () => {
  const [login, onChangeLogin] = useState("");
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isOpenKeyboard, setIsOpenKeyboard] = useState(false);
  const [isFocusedLogo, setIsFocusedLogo] = useState(false);
  const [isFocusedMail, setIsFocusedMail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const navigation = useNavigation();

  const togglePassword = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ImageBackground source={BackImage} style={styles.image}>
            <View
              style={{
                ...styles.registrationWrapper,
                paddingBottom: isOpenKeyboard ? 0 : 78,
                height: isOpenKeyboard ? 420 : "auto",
              }}
            >
              <Image
                source={require("../assets/images/ava-base.png")}
                style={styles.avatar}
              />
              <Pressable
                style={styles.pressAvatarAdd}
                onPress={() => Alert.alert("Take a picture for avatar!")}
              >
                <Image source={require("../assets/images/ava-add.png")} />
              </Pressable>
              <Text style={styles.title}>Реєстрація</Text>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: isFocusedLogo ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Логін"
                editable
                numberOfLines={1}
                maxLength={40}
                onChangeText={(text) => onChangeLogin(text)}
                value={login}
                selectionColor={"#FF6C00"}
                onFocus={() => {
                  setIsOpenKeyboard(true), setIsFocusedLogo(true);
                }}
                onBlur={() => {
                  setIsOpenKeyboard(false), setIsFocusedLogo(false);
                }}
              />
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: isFocusedMail ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Адреса електронної пошти"
                editable
                numberOfLines={1}
                maxLength={40}
                onChangeText={(text) => onChangeEmail(text)}
                value={email}
                selectionColor={"#FF6C00"}
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
                    borderColor: isFocusedPassword ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Пароль"
                  autoComlete="password"
                  secureTextEntry={secureTextEntry}
                  editable
                  numberOfLines={1}
                  maxLength={40}
                  onChangeText={(text) => onChangePassword(text)}
                  value={password}
                  selectionColor={"#FF6C00"}
                  onFocus={() => {
                    setIsOpenKeyboard(true), setIsFocusedPassword(true);
                  }}
                  onBlur={() => {
                    setIsOpenKeyboard(false), setIsFocusedPassword(false);
                  }}
                />
                <TouchableOpacity
                  style={{ position: "absolute", top: 16, right: 16 }}
                  onPress={togglePassword}
                >
                  <Text>{secureTextEntry ? "Показати" : "Сховати"}</Text>
                </TouchableOpacity>
              </View>
              <Pressable
                style={styles.buttonNewRegistration}
                onPress={() => {
                  //  Alert.alert("Credentials Regisrer", `${login} + ${email} + ${password}`),
                  navigation.navigate("Login");
                }}
              >
                <Text style={styles.textBtnLogin}>Зареєструватися</Text>
              </Pressable>
              <Pressable
                style={styles.buttonAlreadyLogin}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.text}>Вже є аккаунт? Увійти</Text>
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
    justifyContent: "flex-end",
  },
  registrationWrapper: {
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 45,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "stretch",
    backgroundColor: "#FFFFFF",
  },
  avatar: {
    alignSelf: "center",
    marginTop: -50,
    position: "absolute",
  },
  pressAvatarAdd: {
    position: "absolute",
    marginTop: 31,
    marginLeft: 235,
  },
  title: {
    fontFamily: "Roboto-Medium",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 35.16,
    paddingBottom: 25,
    justifyContent: "center",
  },
  input: {
    marginBottom: 16,
    paddingLeft: 16,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E8E8E8",
    // activeBorderColor: "FF6C00",
  },
  buttonNewRegistration: {
    marginTop: 27,
    height: 51,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    borderRadius: 100,
  },
  textBtnLogin: {
    fontSize: 16,
    alignSelf: "center",
    justifyContent: "center",
    color: "#FFFFFF",
  },
  buttonAlreadyLogin: {
    marginTop: 16,
    alignItems: "center",
  },
  text: {
    color: "#1B4371",
    textAlign: "center",
    marginTop: 16,
    fontFamily: "Roboto-Regular",
  },
});
export default Registration;

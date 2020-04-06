import React, { Component, useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage
} from "react-native";
import { Block, Button, Checkbox, Text, theme } from "galio-framework";
import { Input, Icon } from "../components";
const { width, height } = Dimensions.get("screen");
import Images from "../constants/Images";
import argonTheme from "../constants/Theme";
import { GET, POST, GET_AXIOS, PUT_AXIOS, POST_AXIOS } from '../api/caller'
import { GET_TOKEN_ENDPOINT, CREATE_ACCOUNT_ID, GET_CART, UPDATE_ACCOUNT } from "../api/endpoint";
import { gobalStateContext } from "../App";

export default Login = ({ route, navigation }) => {
  const gobalState = useContext(gobalStateContext);
  const [state, setState] = useState({
    uername: "binhtran",
    password: "zaq@123",
    account_Id: null,
    fullname: null,
    device_id: null,
    email: null
  })

  async function Login() {
    var device_id = await AsyncStorage.getItem("device_id");

    if (state.uername !== null || state.password !== null) {
      await POST_AXIOS(GET_TOKEN_ENDPOINT, { username: state.uername, password: state.password }).then(res => {
        if (res.status === 200) {
          if (device_id === res.Device_Id) {
            AsyncStorage.setItem("jwt", res.data.access_token);
            navigation.navigate("RouterTab");
          }
          else {
            AsyncStorage.setItem("jwt", res.data.access_token);
            PUT_AXIOS(UPDATE_ACCOUNT, { fullName: res.name, email: res.email, device_Id: device_id, phoneNumber: null }).then(resq => {
              if (resq.status === 200) {
                navigation.navigate("RouterTab");
              }
            })
          }
        } else {
          alert("Sai username hoặc password")
        }
      })
    } else {
      alert("Vui lòng điền tài khoản và mật khẩu")
    }
  }
  return (
    <Block flex middle>
      <StatusBar hidden />
      <ImageBackground
        source={Images.BACKGROUND}
        style={{ width, height, zIndex: 1 }}
      >
        <Block
          center
          style={{
            width: width,
            height: 150,
            zIndex: 2,
            marginTop: (height * 4) / 10
          }}
        >
          <Block width={width * 0.68} style={{ marginBottom: 8 }}>
            <Input
              borderless
              placeholder="Tài khoản"
              onChangeText={context => {
                setState({ ...state, uername: context })
              }}
            />
          </Block>
          <Block width={width * 0.68} style={{ marginBottom: 15 }}>
            <Input
              borderless
              password
              placeholder=" Mật Khẩu"
              onChangeText={context => {
                setState({ ...state, password: context })
              }}
            />
          </Block>

          <Block middle style={{ zIndex: 3 }}>
            <Button
              style={{ ...styles.button }}
              color={argonTheme.COLORS.SUCCESS}
              onPress={() => { Login() }}
              textStyle={{ color: argonTheme.COLORS.WHITE }}
            >
              ĐĂNG NHẬP
              </Button>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
}
const styles = StyleSheet.create({
  button: {
    width: width - theme.SIZES.BASE * 8,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginTop: 20,
    opacity: 1
  },
  buttonFB: {
    width: width - theme.SIZES.BASE * 8,
    height: theme.SIZES.BASE * 2.5,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginTop: 20,
    opacity: 1
  },
  buttonGG: {
    width: width - theme.SIZES.BASE * 8,
    height: theme.SIZES.BASE * 2.5,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginTop: 20,
    opacity: 1
  }
});

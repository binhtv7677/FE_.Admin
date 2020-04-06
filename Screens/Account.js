import React, { Component } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import { Images, argonTheme } from "../constants";
import { Input, Button } from "../components";
const { width, height } = Dimensions.get("screen");
import NavigationService from "../navigation/navigate";
import RBSheet from "react-native-raw-bottom-sheet";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import DropdownMenu from "react-native-dropdown-menu";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

export default Account = () => {
  const navigation = useNavigation();

  async function logout() {
    await AsyncStorage.removeItem("jwt");
    navigation.navigate("Login")
  }
  return (
    <ScrollView>
      <KeyboardAwareScrollView>
        <Block style={{ width: width, height: height * 1.3 }}>
          <Block
            style={{
              width: width,
              height: height / 25
            }}
          ></Block>
          <Block center style={{ width: width, height: 20 }}>
            <Text bold={true} size={17} color="#00c4cc">
              Thông tin tài khoản
              </Text>
          </Block>
          <Block style={{ ...styles.backgroundBlock, marginTop: 15 }}></Block>
          <Block style={{ ...styles.backgroundBlock }}></Block>
          <Block row style={{ width: width, height: 200 }}>
            <Block style={{ width: width / 4, height: 200 }}>
              <Block
                middle
                style={{
                  width: width / 4,
                  height: 50
                }}
              >
                <Icon name="user" size={25} color="#4267b2" />
              </Block>
              <Block
                middle
                style={{
                  width: width / 4,
                  height: 50
                }}
              >
                <Icon name="info-circle" size={25} color="#4267b2" />
              </Block>
              <Block
                middle
                style={{
                  width: width / 4,
                  height: 50
                }}
              >
                <Icon name="address-card" size={25} color="#4267b2" />
              </Block>
              <Block
                middle
                style={{
                  width: width / 4,
                  height: 50
                }}
              >
                <Icon name="bell" size={25} color="#4267b2" />
              </Block>
            </Block>
            <Block style={{ width: (width * 3) / 4, height: 200 }}>
              <Block
                middle
                left
                style={{
                  width: (width * 3) / 4,
                  height: 50,
                  borderBottomColor: "aliceblue",
                  borderBottomWidth: 2
                }}
              >
                <Text>Chỉnh sửa hồ sơ</Text>
              </Block>
              <Block
                middle
                left
                style={{
                  width: (width * 3) / 4,
                  height: 50,
                  borderBottomColor: "aliceblue",
                  borderBottomWidth: 2
                }}
              >
                <Text>Thông tin liên hệ</Text>
              </Block>
              <Block
                middle
                left
                style={{
                  width: (width * 3) / 4,
                  height: 50,
                  borderBottomColor: "aliceblue",
                  borderBottomWidth: 2
                }}
              >
                <Text> Tình hình kinh doanh</Text>
              </Block>
              <Block
                middle
                left
                style={{
                  width: (width * 3) / 4,
                  height: 50,
                  borderBottomColor: "aliceblue",
                  borderBottomWidth: 1
                }}
              >
                <Text>Thông tin ứng dụng</Text>
              </Block>
            </Block>
          </Block>
          <Block style={{ ...styles.backgroundBlock }}></Block>
          <Block row style={{ width: width, height: 100 }}>
            <Block style={{ width: width / 4, height: 200 }}>
              <Block
                middle
                style={{
                  width: width / 4,
                  height: 50
                }}
              >
                <Icon name="bolt" size={25} color="#4267b2" />
              </Block>
              <Block
                middle
                style={{
                  width: width / 4,
                  height: 50
                }}
              >
                <Icon name="shield" size={25} color="#4267b2" />
              </Block>
            </Block>
            <Block style={{ width: (width * 3) / 4, height: 200 }}>
              <Block
                middle
                left
                style={{
                  width: (width * 3) / 4,
                  height: 50,
                  borderBottomColor: "aliceblue",
                  borderBottomWidth: 2
                }}
              >
                <Text>Chỉnh sửa hồ sơ</Text>
              </Block>
              <Block
                middle
                left
                style={{
                  width: (width * 3) / 4,
                  height: 50,
                  borderBottomColor: "aliceblue",
                  borderBottomWidth: 2
                }}
              >
                <Text>Quy chế hoạt động</Text>
              </Block>
            </Block>
          </Block>
          <Block style={{ ...styles.backgroundBlock }}></Block>
          <Block row center style={{ width: width, height: 50 }}>
            <Block
              middle
              style={{
                width: width / 4,
                height: 50
              }}
            >
              <Icon name="sign-out" size={25} color="#4267b2" />
            </Block>
            <TouchableOpacity
              onPress={() => logout()}
            >
              <Block
                middle
                left
                style={{
                  width: (width * 3) / 4,
                  height: 50,
                  borderBottomColor: "aliceblue",
                  borderBottomWidth: 2
                }}
              >
                <Text>Đăng xuất</Text>
              </Block>
            </TouchableOpacity>
          </Block>
        </Block>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rowIcon: {},
  backgroundBlock: {
    width: width,
    height: 2,
    backgroundColor: "aliceblue"
  },

  BlockStyle: {
    width: width * 0.95
  },
  registerContainer: {
    width: width,
    height: height,
    backgroundColor: "white",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  button: {
    width: width - theme.SIZES.BASE * 8,
    height: theme.SIZES.BASE * 3,
    marginTop: 20,
    opacity: 1,
    zIndex: 3
  },
  title: {
    width: "100%",
    fontSize: 12,
    fontWeight: "bold",
    alignItems: "flex-start"
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    zIndex: 5
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  },
  registerButton: {
    width: width * 0.5,
    backgroundColor: "white",
    opacity: 0
  }
});

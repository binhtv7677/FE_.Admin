import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import { ImageBackground, Image, StatusBar, Dimensions } from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

export default class Background extends Component {
  static navigationOptions = {
    title: "Welcome"
  };
  state = {
    Value: "1"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
          <ImageBackground
            source={Images.Onboarding}
            style={{ height, width, zIndex: 1 }}
          >
            <Block flex space="between" style={{ ...styles.padded }}>
              <Block center style={{ zIndex: 2, marginTop: height / 4 + 10 }}>
                <Block
                  top
                  style={{
                    zIndex: 3
                  }}
                >
                  <Button
                    style={{ ...styles.button }}
                    color={argonTheme.COLORS.SUCCESS}
                    onPress={() => navigate("Register")}
                    textStyle={{ color: argonTheme.COLORS.WHITE }}
                  >
                    TẠO TÀI KHOẢN MỚI
                  </Button>
                </Block>
                <Block
                  top
                  style={{
                    zIndex: 3
                  }}
                >
                  <Button
                    style={{ ...styles.button }}
                    color={argonTheme.COLORS.WHITE}
                    onPress={() =>
                      navigate("Login", {
                        data: this.state
                      })
                    }
                    textStyle={{ color: "#4267b2" }}
                  >
                    ĐĂNG NHẬP
                  </Button>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    // paddingHorizontal: theme.SIZES.BASE * 3,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
    height: 150
  },
  button: {
    width: width - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginTop: 20,
    opacity: 1
  },
  logo: {
    width: 200,
    height: 60,
    zIndex: 2,
    position: "relative",
    marginTop: "-50%"
  },
  title: {
    marginTop: "-5%"
  },
  subTitle: {
    marginTop: 20
  }
});

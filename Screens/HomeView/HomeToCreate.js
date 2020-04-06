import React, { Component } from "react";
import { StyleSheet, ImageBackground, Dimensions } from "react-native";
import { Block, Checkbox, Text, theme, NavBar, Button } from "galio-framework";
import { Images, argonTheme } from "../../constants";
const { width, height } = Dimensions.get("screen");
import NavigationService from "../../navigation/navigate";
export default class HomeToCreate extends Component {
  constructor(props) {
    super(props);
  }
  HomeTitle = `Chưa có shop 
Hôm nay, ngày ${this.today}`;

  state = { username: "", password: "", role: "string" };
  repassword = "";
  static navigationOptions = {
    title: "Welcome"
  };

  _loginPage = async () => {
    if (
      this.state.username.length > 7 ||
      this.state.password.length > 7 ||
      this.repassword.length > 7
    ) {
      if (this.state.password === this.repassword) {
        // NavigationService.navigate("Login");
      } else {
        this.dropDownAlertRef.alertWithType(
          "Warn",
          "FFIXXY Message",
          "Check your password"
        );
      }
    } else {
      this.dropDownAlertRef.alertWithType(
        "Warn",
        "FFIXXY Message",
        "Please fill all input fields and need more 8 charater"
      );
      return;
    }
  };
  render() {
    const {
      back,
      title,
      white,
      transparent,
      bgColor,
      iconColor,
      titleColor,
      navigation,
      ...props
    } = this.props;
    const { routeName } = navigation.state;
    const noShadow = [
      "Search",
      "Categories",
      "Deals",
      "Pro",
      "Profile"
    ].includes(routeName);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: "rgba(0,0,0,0)" } : null
    ];

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor }
    ];
    return (
      <Block flex middle>
        <ImageBackground
          source={Images.HomeView}
          style={{ width, height, zIndex: 1 }}
        >
          <Block center style={{ marginTop: height / 1.7 }}>
            <Button
              style={{ ...styles.button }}
              color={argonTheme.COLORS.GREEN}
              onPress={() => NavigationService.navigate("RegisterStore")}
              textStyle={{ color: argonTheme.COLORS.WHITE }}
            >
              TẠO CỬA HÀNG
            </Button>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.75,
    height: height * 0.65,
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
    shadowRadius: 0,
    shadowOpacity: 0,
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

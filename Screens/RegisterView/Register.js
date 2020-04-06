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
import { Images, argonTheme } from "../../constants";
import { Button, Icon, Input } from "../../components";
import { TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");
import NavigationService from "../../navigation/navigate";
import DropdownAlert from "react-native-dropdownalert";
import * as axios from "axios";
export default class Register extends Component {
  constructor(props) {
    super(props);
  }
  state = { username: "", password: "", role: "string" };
  repassword = "";
  static navigationOptions = {
    title: "Welcome"
  };
  _loginPage = async () => {
    if (
      this.state.username.length > 0 ||
      this.state.password.length > 0 ||
      this.repassword.length > 0
    ) {
      if (this.state.password === this.repassword) {
        NavigationService.navigate("HomeToCreate");
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


    
    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block
            // flex
            center
            style={{ marginTop: height / 4, height: (height * 1) / 4 }}
          >
            <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
            <Block style={{ ...styles.registerContainer, paddingTop: 10 }}>
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={12}>
                    Chào mừng bạn đến với Bonita
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.68} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Username"
                        onChangeText={content =>
                          this.setState({ username: content })
                        }
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.68}>
                      <Input
                        password
                        borderless
                        placeholder="Password"
                        onChangeText={content =>
                          this.setState({ password: content })
                        }
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.68}>
                      <Input
                        password
                        borderless
                        placeholder="Enter the password again"
                        onChangeText={content => {
                          this.repassword = content;
                        }}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block middle>
                      <Button
                        color="primary"
                        style={styles.createButton}
                        onPress={this._loginPage}
                      >
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          Register
                        </Text>
                      </Button>
                    </Block>
                    <Block right>
                      <TouchableOpacity
                        onPress={() => NavigationService.navigate("Login")}
                      >
                        <Text style={{ marginTop: 10 }} size={12} color="blue">
                          Cancel
                        </Text>
                      </TouchableOpacity>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
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

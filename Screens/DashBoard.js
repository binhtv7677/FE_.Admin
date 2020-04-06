import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Image
} from "react-native";
import { createAppContainer } from "react-navigation";
import { BackHandler, Alert } from "react-native";
const { width, height } = Dimensions.get("screen");
import NavigationService from "../navigation/navigate";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

import Login from "../MainScreens/Login";
import MainScreen from "./Calendar";
import Home from "./HomeView/Home";
import ViewCalendar from "./Calendar";
import Account from "./Account";
import History from "./HomeView/History";
import CreateService from "./HomeView/CreateService";

export default class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    // this.state.username = this.props.navigation.state.params.data.username;
    // this.state.password = this.props.navigation.state.params.data.password;
    if (this.state.username === "a" && this.state.password == "b") {
      NavigationService.navigate("HomeToCreate");
    }
  }
  handleBackButton = () => {
    Alert.alert(
      "Exit App",
      "Exiting the application?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => BackHandler.exitApp()
        }
      ],
      {
        cancelable: true
      }
    );
    return true;
  };
  data = {
    username: "",
    password: ""
  };
  componentDidMount() {}
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  render() {
    const TabNavigator = createMaterialBottomTabNavigator(
      {
        Home: {
          screen: Home,
          navigationOptions: {
            tabBarLabel: "Quản lý",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="home" size={20} color="green" />
            )
          }
        },
        Calendar: {
          screen: ViewCalendar,
          navigationOptions: {
            tabBarLabel: "Tạo lich ",
            tabBarIcon: ({ tintColor }) => (
              <Image
                source={require("../assets/imgs/taolich.jpg")}
                style={{ width: 15, height: 15 }}
              ></Image>
            )
          }
        },
        CreateService: {
          screen: CreateService,
          navigationOptions: {
            tabBarLabel: "Dịch vụ",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="history" size={20} color="green" />
            )
          }
        },
        Account: {
          screen: Account,
          navigationOptions: {
            tabBarLabel: "Thông báo",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="bell" size={20} color="green" />
            )
          }
        }
      },
      {
        initialRouteName: "Home",
        activeColor: "#00365d",
        inactiveColor: "#00a294",
        shifting: true,
        barStyle: {
          backgroundColor: "white"
        }
      }
    );

    const AppContainer = createAppContainer(TabNavigator);
    return <AppContainer />;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

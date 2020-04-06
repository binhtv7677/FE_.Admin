import * as React from "react";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  useNavigation,
  DrawerActions
} from "@react-navigation/native";
import { Icon } from "../components";
import Home from "../MainScreens/Home/Home";
import History from "../MainScreens/History/History";
import Account from "../Screens/Account";
import { Block } from "galio-framework";
import DrawerLayout from "react-native-gesture-handler/DrawerLayout";
const { width, height } = Dimensions.get("screen");

export function HistoryScreen() {
  return <History />;
}
export function AccountScreen() {
  return <Account />;
}

const Tab = createBottomTabNavigator();

export default function RouterTab({ route, navigation }) {
  function handleLeftPress() {
    navigation.openDrawer();
  }
  navigation.setOptions({
    headerLeftStyle: {
      marginLeft: 5
    },
    headerLeft: () => (
      <>
        <TouchableOpacity
          onPress={() => {
            handleLeftPress();
          }}
        >
          <Block
            style={{
              width: width * 0.12,
              marginLeft: 10
            }}
          >
            <Icon
              name="bars"
              size={30}
              color="#e8582d"
              family="AntDesign"
            ></Icon>
          </Block>
        </TouchableOpacity>
      </>
    ),
    headerTitle: () => <Text size={20}>Trang chủ</Text>,
    headerRight: () => (
      <>
        <TouchableOpacity
          onPress={() => {
            handleRightPress();
          }}
        >
          <Block
            style={{
              width: width * 0.12
            }}
          >
            <Icon
              name="bell-o"
              size={25}
              color="#e8582d"
              family="FontAwesome"
            ></Icon>
          </Block>
        </TouchableOpacity>
      </>
    ),
    headerStyle: {
      height: 60
    }
  });

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let family;
          if (route.name === "Order") {
            iconName = "ios-list-box";
            family = "Ionicons";
          } else if (route.name === "Account") {
            iconName = "account";
            family = "MaterialCommunityIcons";
          }
          return (
            <Icon family={family} name={iconName} size={25} color={color} />
          );
        }
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray"
      }}
    >
      <Tab.Screen name="Order" component={HistoryScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

import React, { Component } from "react";
import {
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  Button,
  AsyncStorage
} from "react-native";
const { width, height } = Dimensions.get("screen");
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Login from "../MainScreens/Login";
import RouterTab from "../MainScreens/RouterTab";
import { Block } from "galio-framework";
import { Icon } from "../components";
// import Drawerable from "./Drawer";
const Stack = createStackNavigator();

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from "@react-navigation/drawer";
import Categories from "../MainScreens/Categories/Categories";
import ListCategories from "../MainScreens/Categories/ListCategories";
import UpdateCategories from "../MainScreens/Categories/UpdateCategories";
import Order from "../MainScreens/Order/Order";
import DetailOrder from "../MainScreens/Order/DetailOrder";
import ChartComponent from "../MainScreens/Chart/Chart";
const Drawer = createDrawerNavigator();

function Drawerable() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name={"Login"}
        component={Login}
        options={{
          headerShown: false,
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name={"RouterTab"}
        component={RouterTab}
        options={{
          headerLeft: () => (
            <>
              <TouchableOpacity
                onPress={() => {
                }}
              >
                <Block
                  style={{
                    width: width * 0.12
                  }}
                >
                  <Icon
                    name="left"
                    size={30}
                    color="#e8582d"
                    family="AntDesign"
                  ></Icon>
                </Block>
              </TouchableOpacity>
            </>
          ),
          headerTitle: props => (
            <>
              <Text size={35}>Thông tin sản phẩm</Text>
            </>
          ),
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
                    size={30}
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
        }}
      />
      <Stack.Screen
        name={"Chart"}
        component={ChartComponent}
        options={{
          headerLeft: () => (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}
              >
                <Block
                  style={{
                    width: width * 0.12
                  }}
                >
                  <Icon
                    name="left"
                    size={30}
                    color="#e8582d"
                    family="AntDesign"
                  ></Icon>
                </Block>
              </TouchableOpacity>
            </>
          ),
          headerTitle: () => (
            <Text size={35}>Thông tin sản phẩm</Text>
          ),
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
                    size={30}
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
        }}
      />
      <Stack.Screen name={"Categories"} component={Categories} />
      <Stack.Screen name={"ListCategories"} component={ListCategories} />
      <Stack.Screen name={"UpdateCategories"} component={UpdateCategories} />
      <Stack.Screen name={"Order"} component={Order} />
      <Stack.Screen
        name={"DetailOrder"}
        component={DetailOrder}
      />
    </Stack.Navigator>
  );
}
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Tạo sản phẩm mới"
        onPress={() => {
          props.navigation.navigate("Categories", { status: false });
        }}
      />
      <DrawerItem
        label="Danh sách sản phẩm"
        onPress={() => props.navigation.navigate("ListCategories")}
      />
      <DrawerItem
        label="Trang chủ"
        onPress={() => props.navigation.navigate("RouterTab")}
      />
      <DrawerItem
        label="Thống kê"
        onPress={() => props.navigation.navigate("Chart")}
      />
      <DrawerItem
        label="Đăng xuất"
        onPress={() => {
          AsyncStorage.removeItem("jwt");
          props.navigation.navigate("Login")
        }}
      />
    </DrawerContentScrollView>
  );
}
export default function Navigate() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Main"
        drawerContent={props => CustomDrawerContent(props)}
      >
        <Drawer.Screen name="Main" component={Drawerable} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
// export default Navigate;

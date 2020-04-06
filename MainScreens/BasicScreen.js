import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  Picker,
  View,
  Alert,
  Button,
  Platform,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Block, Checkbox, Text, theme, NavBar } from "galio-framework";
import { Images, argonTheme } from "../constants";
const { width, height } = Dimensions.get("screen");
import DatePicker from "react-native-datepicker";

import ScrollableTabView, {
  DefaultTabBar,
  ScrollableTabBar
} from "react-native-scrollable-tab-view-forked";
import { useNavigation } from "@react-navigation/native";

export default BasicScreen = route => {
  const navigation = route.navigation;
  return (
    <Block style={{ ...styles.registerContainer, zIndex: 1 }}>
      {route.content}
    </Block>
  );
};

const styles = StyleSheet.create({
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
  scene: {
    flex: 1,
    backgroundColor: "white"
  },
  tabStyle: {
    // backgroundColor: "blue",
    height: 40
  },
  scrollStyle: {
    backgroundColor: "white"
  },
  tabBarTextStyle: {
    fontSize: 14,
    fontWeight: "normal"
    // justifyContent: "center"
  },
  underlineStyle: {
    height: 3,
    backgroundColor: "red",
    borderRadius: 3,
    width: 80
  }
});

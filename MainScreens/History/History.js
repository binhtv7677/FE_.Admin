import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView
} from "react-native";
import { Block, Button, Checkbox, Text, theme, NavBar } from "galio-framework";
import { Images, argonTheme } from "../../constants";
const { width, height } = Dimensions.get("screen");
import Tabs from "../../components/Tabs";
import { GET_AXIOS } from "../../api/caller";
import { GET_ORDER, GET_ORDER_TYPE } from "../../api/endpoint";
import { Notifications } from "expo";
import { useNavigation } from "@react-navigation/native";

export default History = (route) => {
  const navigation = useNavigation();

  const [value, setValue] = useState("all");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (value === "all") {
      GET_AXIOS(GET_ORDER, {}).then(res => {
        setData(res.data.List)
      })
    } else if (value === "0") {
      setData([]);
      GET_AXIOS(GET_ORDER_TYPE + value, {}).then(res => {
        console.log(res.data)
        setData(res.data.List)
      })
    } else if (value === "1") {
      setData([]);
      GET_AXIOS(GET_ORDER_TYPE + value, {}).then(res => {
        console.log(res.data)
        setData(res.data.List)
      })
    } else if (value === "2") {
      setData([]);
      GET_AXIOS(GET_ORDER_TYPE + value, {}).then(res => {
        console.log(res.data)
        setData(res.data.List)
      })
    } else if (value === "3") {
      setData([]);
      GET_AXIOS(GET_ORDER_TYPE + value, {}).then(res => {
        console.log(res.data)
        setData(res.data.List)
      })
    }
    const focus = navigation.addListener("focus", () => {
      setData([]);
      GET_AXIOS(GET_ORDER, {}).then(res => {
        setData(res.data.List)
      })
    });
    return focus;
  }, [value])

  function renderViewNewItem() {
    return (
      <Block
        style={{
          marginTop: 15,
          width: width
        }}
      >
        <Block center style={{ width: width, height: 50 }}>
          <Text size={25}>Danh Sách Đơn Hàng </Text>
        </Block>
        <FlatList
          data={data}
          keyExtractor={item => item.Id.toString()}
          renderItem={item => {
            return (
              <Block key={item.item.Id}>
                <Product
                  order={true}
                  horizontal
                  product={item.item}
                  style={{ marginRight: theme.SIZES.BASE }}
                />
              </Block>
            );
          }}
        ></FlatList>
      </Block>
    );
  }
  useEffect(() => {
    callNoti();
  });
  function callNoti() {
    var noti = Notifications.addListener(_catchNoti);
  }
  function _catchNoti(noti) {
    setData([]);
    GET_AXIOS(GET_ORDER, {}).then(res => {
      setData(res.data.List)
    })
  }
  return (
    <Block style={{ ...styles.registerContainer, zIndex: 1 }}>
      <Block
        style={{ width: width, height: 2, backgroundColor: "black" }}
      ></Block>
      <Block
        center
        style={{
          marginTop: 5,
          zIndex: 3,
          width: width
        }}
      >
        <Tabs
          initialIndex={"all"}
          editable={true}
          data={[
            { id: "all", title: "Tất cả" },
            { id: "0", title: "Đơn vừa nhận" },
            { id: "1", title: "Đã đang chuyển" },
            { id: "2", title: "Đã hoàn thành" },
            { id: "3", title: "Đã huỷ" },
          ]}
          onChange={value => {
            console.log(1);
            setValue(value);
          }}
        />
      </Block>
      <Block
        style={{ width: width, height: 2, backgroundColor: "black" }}
      ></Block>
      <Block center middle style={{ width: width }}>
        <ScrollView>
          {renderViewNewItem()}
          <Block style={{ width: width, height: 150 }}>

          </Block>
        </ScrollView>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    width: width,
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
});

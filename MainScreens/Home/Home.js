import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Dimensions, FlatList } from "react-native";
import { Block, Checkbox, Text, theme, NavBar } from "galio-framework";
import { Images, argonTheme } from "../../constants";
const { width, height } = Dimensions.get("screen");
import { GET_AXIOS } from "../../api/caller";
import { GET_ORDER_NOT_CONFIRMED } from "../../api/endpoint";

export default Home = () => {
  const [data, setData] = useState([]);

  const [index, setIndex] = useState(1);
  useEffect(() => {
    GET_AXIOS(GET_ORDER_NOT_CONFIRMED + index + "&pageSize=5").then(res => {
      setData(res.data.List)
    })
  }, [])
  function renderItem(item) {
    return (
      <>
        <Block
          row
          center
          style={{ width: width, height: 50, borderWidth: 0.18 }}
        >
          <Block center style={{ width: width * 0.7 }}>
            <Text size={16}>{item.FullName}</Text>
          </Block>
          <Block
            center
            middle
            style={{ width: width * 0.3, backgroundColor: "red", height: 47 }}
          >
            <Text size={16}>{item.status}</Text>
          </Block>
        </Block>
      </>
    );
  }
  function renderData() {
    return (
      <>
        <Block row center style={{ width: width, height: 50 }}>
          <Block center style={{ width: width * 0.7 }}>
            <Text size={16}>Tên Khách</Text>
          </Block>
          <Block center style={{ width: width * 0.3 }}>
            <Text size={16}>Trạng thái</Text>
          </Block>
        </Block>
        <Block
          style={{ width: width, height: 2, backgroundColor: "black" }}
        ></Block>
        <Block style={{ width: width, height: height }}>
          <FlatList
            data={data}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={item => item.Id.toString()}
            extraData={data}
          />
        </Block>
      </>
    );
  }
  return (
    <Block style={{ ...styles.registerContainer, zIndex: 1, }}>
      <Block
        style={{ width: width, height: 2, backgroundColor: "black" }}
      ></Block>
      <Block
        center
        style={{
          ...styles.BlockStyle,
          marginTop: 5,
          zIndex: 3,
          width: width * 0.9
        }}
      >
        {renderData()}
      </Block>
      <Block style={{ width: width, height: (height * 3) / 4 + 15 }}></Block>
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
  }
});

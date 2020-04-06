import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Block, Checkbox, Text, theme, NavBar, Button } from "galio-framework";
import { Images, argonTheme } from "../../constants";
const { width, height } = Dimensions.get("screen");
import { Icon, Product } from "../../components";
import { ScrollView } from "react-native-gesture-handler";
import { GET_AXIOS } from "../../api/caller";
import { GET_ORDER_CONFIRMED } from "../../api/endpoint";

export default Order = ({ route, navigation }) => {

  const [data, setData] = useState();
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
    headerTitle: props => <Text size={18}>Thông tin Order</Text>,
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
  useEffect(() => {
    GET_AXIOS(GET_ORDER_CONFIRMED).then(res => {
      // console.log(res);
    })
  }, [])
  function renderItem() {
    return (
      <Block
        style={{
          marginTop: 15,
          width: width
        }}
      >
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={item => {
            return (
              <Product
                horizontal
                type={true}
                product={item.item}
                style={{ marginRight: theme.SIZES.BASE }}
              />
            );
          }}
        ></FlatList>
      </Block>
    );
  }
  return (
    <Block style={{ ...styles.registerContainer, zIndex: 1 }}>
      <Block
        center
        style={{
          ...styles.BlockStyle,
          width: width,
          height: 90,
          zIndex: 4,
          borderWidth: 0.2,
          marginTop: 10
        }}
      >
        <Block style={{ backgroundColor: "white" }}>
          <Text style={{ top: -9, backgroundColor: "white" }} size={16}>
            Thông tin khách hàng
          </Text>
        </Block>

        <Block row>
          <Block center style={{ width: width / 2 }}>
            <Text size={14}>Tên</Text>
            <Text size={17} color={"red"}>
              Trần Văn Bình
            </Text>
          </Block>
          <Block center style={{ width: width / 2 }}>
            <Text size={14}>Số điện thoại</Text>
            <Text size={17} color="red">
              0907269083
            </Text>
          </Block>
        </Block>
        <Text>Địa chỉ: abc xyz</Text>
      </Block>
      <Block style={{ width: width, height: height * 0.7 }}>
        <ScrollView>
          <Block
            center
            style={{
              marginTop: 5,
              zIndex: 3,
              width: width * 0.9
            }}
          >
            {renderItem()}
          </Block>
          <Block style={{ width: width, height: height * 0.1 }}></Block>
        </ScrollView>
      </Block>

      <Block center middle style={{ width: width, height: 60 }}>
        <Button
          style={{ ...styles.button }}
          color={argonTheme.COLORS.SUCCESS}
          onPress={() => navigate("RouterTab")}
          textStyle={{ color: argonTheme.COLORS.WHITE }}
        >
          Xác nhận đơn hàng
        </Button>
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
  scene: {
    flex: 1,
    backgroundColor: "white"
  }
});

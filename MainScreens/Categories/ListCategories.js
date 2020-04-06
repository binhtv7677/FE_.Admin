import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,

  View
} from "react-native";
import { Block, Checkbox, Text, theme, NavBar } from "galio-framework";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons"; // 6.2.2
import { Images, argonTheme } from "../../constants";
const { width, height } = Dimensions.get("screen");
import Tabs from "../../components/Tabs";
import { FlatList } from "react-native-gesture-handler";
import { POST, GET, PUT_AXIOS, PUT_IMAGES, POST_AXIOS } from "../../api/caller";
import { Header, Left } from "native-base";
import { Input, Button, Product, Icon } from "../../components";
import { GET_PRODUCT, GET_PRODUCT_TAB_ID } from "../../api/endpoint";

export default ListCategories = ({ route, navigation }) => {
  const [tabsData, setTabsData] = useState([]);
  const [tabId, setTabId] = useState("back");
  const [index, setIndex] = useState(1);
  const [pageSize, setPage] = useState(5)

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
    headerTitle: props => <Text size={20}>Danh sách sản phẩm</Text>,
    headerRight: () => (
      <>
        <TouchableOpacity
          onPress={() => {
            // handleRightPress();
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
    getData();

  }, [])

  async function getData() {
    setTabsData([])
    var urlId = GET_PRODUCT.toString() + "?index=" + index + "&pageSize=3";

    await GET(urlId, {}, {}).then(res => {
      var data = [];
      var url = "http://45.119.83.107:9002/api/Product/Images?fileName=";
      for (let i = 0; i < res.List.length; i++) {
        var img = url + res.List[i].MainImage;
        data.push({ ...res.List[i], img: img });
      }
      setTabsData(data)

    })
  }

  async function getItem() {
    if (tabId !== "back") {
      var urlId = GET_PRODUCT_TAB_ID + tabId + "/Products?index=1&pageSize=" + pageSize;
      await GET(urlId, {}, {}).then(res => {
        var data = [];
        for (let i = 0; i < res.List.length; i++) {
          data.push(res.List[i]);
        }
        setTabsData(data)
      })
    } else if (tabId === "back") {
      var urlId = GET_PRODUCT + "?index=1&pageSize=" + pageSize;
      await GET(urlId, {}, {}).then(res => {
        var data = [];
        for (let i = 0; i < res.List.length; i++) {
          data.push(res.List[i]);
        }
        setTabsData(data)
      })
    }
  }
  useEffect(() => {
    setPage(5);
    setTabsData([]);
    getItem()
  }, [tabId])

  useEffect(() => {
    getItem()
    const focus = navigation.addListener("focus", () => {
      getData();
    });

    return focus;
  }, [pageSize])

  function renderViewNewItem() {
    return (
      <Block
        style={{
          marginTop: 15,
          width: width
        }}
      >
        <Block center style={{ width: width, height: 50 }}>
          <Text size={30}>Danh Sách </Text>
        </Block>

        <FlatList
          data={tabsData}
          keyExtractor={item => item.Id.toString()}
          renderItem={item => {
            return (
              <Block key={item.item.Id}>
                <Product
                  horizontal
                  product={item.item}
                  style={{ marginRight: theme.SIZES.BASE }}
                />
              </Block>
            );
          }}
        ></FlatList>
        <Block center>
          <Button
            style={{ ...styles.button }}
            color={argonTheme.COLORS.SUCCESS}
            textStyle={{ color: argonTheme.COLORS.WHITE }}
            onPress={() => {
              // setPage(pre => pre + 5);
              console.log(tabsData)
            }}
          >
            Xem Thêm
          </Button>
        </Block>
      </Block>
    );
  }
  function handleLeftPress() {
    navigation.openDrawer();
  }

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView>
          <Block
            center
            style={{
              marginTop: 5,
              marginBottom: 5,
              width: width * 0.9,
              height: 100,
              borderWidth: 0.18
            }}
          >
            <Text style={{ top: -7, backgroundColor: "white" }}>Danh mục</Text>
            <Tabs
              editable={true}
              data={[
                { id: "back", title: "Xem lại" },
                { id: "420e5124-e7e5-4af2-d45f-08d7bd988d47", title: "Quần dài", img: Images.QUAN_DAI },
                { id: "fa175d1c-f17d-4890-d460-08d7bd988d47", title: "Quần đùi", img: Images.QUAN_DUI },
                { id: "d1d964da-1923-43df-d461-08d7bd988d47", title: "Áo sơ mi", img: Images.AO_SO_MI },
                { id: "042edd2d-5ef9-43e7-d462-08d7bd988d47", title: "Áo thun", img: Images.AO_THUN },
              ]}
              onChange={id => {
                console.log(id)
                setTabId(id)
              }}
            ></Tabs>
          </Block>
          <Block
            style={{
              width: width
            }}
          >
            {renderViewNewItem()}

          </Block>
          <Block center>
            <Button style={styles.button}
              color={"green"}
              onPress={() => {
                setPage(pre => pre + 5);
              }}
            >
              Xem thêm
              </Button>
          </Block>
          <Block style={{ width: width, height: 30 }}>

          </Block>
        </ScrollView>
      </View>
    </>
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

import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
  Alert,
  AsyncStorage,
  Platform,
  ActivityIndicator
} from "react-native";
import { Block, Checkbox, Text, theme, NavBar } from "galio-framework";
import { Images, argonTheme } from "../../constants";
const { width, height } = Dimensions.get("screen");
import Tabs from "../../components/Tabs";
import { Icon } from "../../components";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { FlatList } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { POST, GET, PUT_AXIOS, PUT_IMAGES, POST_AXIOS } from "../../api/caller";
import { CREATE_PRODUCT_ENDPOINT, PRODUCT_AVATA } from "../../api/endpoint";
import Constants from "expo-constants";
import axios from "axios";



export default Categories = ({ route, navigation }) => {
  const [photo, setPhoto] = useState(null);
  const [listPhoto, setList] = useState([]);
  const [Product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    numberOfLike: 0,
    categoryId: "",
    quantity: 10,
    dateCreated: new Date()
  });

  const [loading, setLoad] = useState(false);
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
    headerTitle: props => <Text size={20}>Thêm mới</Text>,
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
    return () => { };
  }, [Product]);

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  _pickImage = async () => {
    getPermissionAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });
    setPhoto(result);
  };
  _pickListImage = async () => {
    getPermissionAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });
    var tempResult = [...listPhoto];
    tempResult.push(result);
    setList(tempResult);
  };
  function removeImage(index) {
    var tempArr = [...listPhoto];
    tempArr.splice(index, 1);
    setList(tempArr);
  }
  function _renderItem(item, index) {
    return (
      <ImageBackground
        key={index}
        source={{ uri: item.uri }}
        style={{ width: 150, height: 150, marginLeft: 5, marginRight: 5 }}
      >
        <TouchableOpacity
          onPress={() => {
            removeImage(index);
          }}
        >
          <Icon
            name="remove"
            size={30}
            color="#e8582d"
            family="FontAwesome"
          ></Icon>
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  async function submit() {
    if (Product.categoryId.length < 2 || Product.price <= 0 || Product.name.length < 2 || photo === null || listPhoto.length < 1) {
      console.log(Product)
      Alert.alert(
        "Thông báo",
        "Vui lòng kiểm tra thông tin thiếu",
        [
          {
            text: "Xác nhận",
            style: "cancel"
          },
        ],
        {
          cancelable: true
        }
      );
    } else {
      setLoad(true);
      var token = await AsyncStorage.getItem("jwt");
      POST_AXIOS(CREATE_PRODUCT_ENDPOINT, Product).then(res => {
        id = res.data
        if (res.status === 200 || res.status === 201) {
          let listFormData = new FormData();
          let formData = new FormData();

          listPhoto.map(i => {
            var link = i.uri;
            let listFileType = link.substring(link.lastIndexOf(".") + 1);
            listFormData.append("images", {
              uri: Platform.OS === "android" ? link : link.replace("file://", ""),
              name: `photo.${listFileType}`,
              type: `image/${listFileType}`
            })
          })
          var uri = photo.uri;
          let fileType = uri.substring(uri.lastIndexOf(".") + 1);
          formData.append("images", {
            uri: Platform.OS === "android" ? uri : uri.replace("file://", ""),
            name: `photo.${fileType}`,
            type: `image/${fileType}`
          })

          axios({
            url: 'http://45.119.83.107:9002/api/Product/Images?isMain=true&&id=' + id,
            method: "PUT",
            headers: {
              authorization: "Bearer " + token
            },
            data: formData
          }).then(res => {
            console.log(res);
            axios({
              url: 'http://45.119.83.107:9002/api/Product/Images?isMain=false&&id=' + id,
              method: "PUT",
              headers: {
                authorization: "Bearer " + token
              },
              data: listFormData
            }).then(res => {
              console.log(1);
              if (res.status === 200 || res.status === 201) {
                Alert.alert(
                  "Thông báo",
                  "Thêm mới thành công",
                  [
                    {
                      text: "Xác nhận",
                      style: "cancel",
                      onPress: () => {
                        setProduct({
                          name: "",
                          price: 0,
                          description: "",
                          numberOfLike: 0,
                          categoryId: "",
                          quantity: 10,
                          dateCreated: new Date()
                        })
                        setPhoto(null);
                        setList([]);
                        setLoad(false);
                      }
                    },
                  ],
                  {
                    cancelable: true
                  }
                );
              }
            }).catch(res => console.log(res))
          }).catch(res => console.log(res))


        }
      })

    }
  }
  return (
    <>
      {
        loading ?
          <>
            <ActivityIndicator size="large" color="0000ff" />
          </> :
          <Block style={{ ...styles.registerContainer, zIndex: 1 }}>
            <Block flex center style={{ ...styles.registerContainer }}>
              <KeyboardAwareScrollView style={{ width: width }}>
                <Block row style={{ height: 40 }}>
                  <Text
                    style={{
                      marginLeft: 25,
                      marginTop: 7,
                      fontSize: 25,
                      color: "#00c4cc"
                    }}
                  >
                    Thông tin sản phẩm
            </Text>
                </Block>
                <Block style={{}}>
                  <Text
                    style={{
                      marginLeft: 35,
                      fontSize: 12,
                      color: argonTheme.COLORS.BLACK
                    }}
                  >
                    *Vui lòng không để trống
            </Text>
                  <Block
                    style={{
                      paddingHorizontal: theme.SIZES.BASE,
                      width: width * 0.8,
                      marginLeft: 10,
                      marginTop: 15
                    }}
                  >
                    <Text style={{ fontWeight: "normal", color: "#999da1" }}>
                      Tên sản phẩm
              </Text>
                    <TextInput
                      style={{
                        width: width * 0.8,
                        borderBottomColor: "#999da1",
                        borderBottomWidth: 1,
                        height: 30
                      }}
                      onChangeText={content =>
                        setProduct({ ...Product, name: content })
                      }
                      placeholder=""
                    ></TextInput>
                  </Block>
                  <Block
                    style={{
                      paddingHorizontal: theme.SIZES.BASE,
                      width: width * 0.8,
                      marginLeft: 10,
                      marginTop: 15
                    }}
                  >
                    <Text style={{ fontWeight: "normal", color: "#999da1" }}>
                      Giá sản phẩm
              </Text>
                    <TextInput
                      keyboardType="numeric"
                      style={{
                        width: width * 0.8,
                        borderBottomColor: "#999da1",
                        borderBottomWidth: 1,
                        height: 25
                      }}
                      keyboardType="numeric"
                      onChangeText={content =>
                        setProduct({ ...Product, price: content })
                      }
                      placeholder=""
                    ></TextInput>
                  </Block>
                  <Block
                    style={{
                      paddingHorizontal: theme.SIZES.BASE,
                      width: width * 0.8,
                      marginLeft: 10,
                      marginTop: 15
                    }}
                  >
                    <Text style={{ fontWeight: "normal", color: "#999da1" }}>
                      Loại sản phẩm
              </Text>
                    <Tabs
                      editable={true}
                      data={[
                        {
                          id: "420e5124-e7e5-4af2-d45f-08d7bd988d47",
                          title: "Quần dài"
                        },
                        {
                          id: "fa175d1c-f17d-4890-d460-08d7bd988d47",
                          title: "Quần đùi"
                        },
                        {
                          id: "d1d964da-1923-43df-d461-08d7bd988d47",
                          title: "Áo sơ mi"
                        },
                        {
                          id: "042edd2d-5ef9-43e7-d462-08d7bd988d47",
                          title: "Áo thun"
                        }
                      ]}
                      onChange={content => {
                        setProduct({ ...Product, categoryId: content });
                      }}
                    ></Tabs>
                  </Block>
                  <Block
                    style={{
                      paddingHorizontal: theme.SIZES.BASE,
                      width: width * 0.8,
                      marginLeft: 10,
                      marginTop: 15
                    }}
                  >
                    <Text style={{ fontWeight: "normal", color: "#999da1" }}>
                      Số lượng sản phẩm
              </Text>
                    <TextInput
                      keyboardType="numeric"
                      style={{
                        width: width * 0.8,
                        borderBottomColor: "#999da1",
                        borderBottomWidth: 1,
                        height: 25
                      }}
                      onChangeText={content =>
                        setProduct({ ...Product, quantity: content })
                      }
                      placeholder=""
                    ></TextInput>
                  </Block>
                  <Block
                    style={{
                      paddingHorizontal: theme.SIZES.BASE,
                      width: width * 0.8,
                      marginLeft: 10,
                      marginTop: 15
                    }}
                  >
                    <Text style={{ fontWeight: "normal", color: "#999da1" }}>
                      Miêu tả sản phẩm
              </Text>
                    <TextInput
                      multiline={true}
                      style={{
                        width: width * 0.8,
                        borderBottomColor: "#999da1",
                        borderBottomWidth: 1
                      }}
                      placeholder=""
                      onChangeText={content =>
                        setProduct({ ...Product, description: content })
                      }
                    ></TextInput>
                  </Block>
                  <Block
                    style={{
                      paddingHorizontal: theme.SIZES.BASE,
                      marginTop: 15
                    }}
                  >
                    <Text style={{ fontWeight: "normal", color: "#999da1" }}>
                      Ảnh đại diện
              </Text>
                    <Block
                      center
                      middle
                      style={{
                        marginTop: 10,
                        width: width,
                        height: 150,
                        borderWidth: photo === null ? 0.18 : 0
                      }}
                    >
                      {photo === null ? (
                        <TouchableOpacity
                          onPress={() => {
                            _pickImage();
                          }}
                        >
                          <ImageBackground
                            source={Images.PLUS}
                            style={{ width: 100, height: 100 }}
                          />
                        </TouchableOpacity>
                      ) : (
                          <Block
                            center
                            middle
                            style={{
                              width: width,
                              height: 200
                            }}
                          >
                            <Image
                              source={{ uri: photo.uri }}
                              style={{ width: 150, height: 150 }}
                            />
                            <Button
                              title="Đổi ảnh"
                              onPress={() => _pickImage()}
                            ></Button>
                          </Block>
                        )}
                    </Block>
                  </Block>
                </Block>
                <Block style={{}}>
                  <Text
                    style={{
                      marginLeft: 25,
                      marginTop: 15,
                      fontSize: 18,
                      color: argonTheme.COLORS.BLACK
                    }}
                  >
                    Một số ảnh khác
            </Text>
                  {listPhoto.length === 0 ? (
                    <Block
                      middle
                      center
                      style={{ width: 150, height: 150, borderWidth: 0.18 }}
                    >
                      <Icon
                        name="plus"
                        size={30}
                        color="#e8582d"
                        family="AntDesign"
                      ></Icon>
                    </Block>
                  ) : (
                      <Block
                        center
                        middle
                        style={{
                          width: width,
                          height: 200
                        }}
                      >
                        <FlatList
                          horizontal={true}
                          data={listPhoto}
                          renderItem={({ item, index }) => _renderItem(item, index)}
                          keyExtractor={item => item.uri}
                          extraData={listPhoto}
                        />
                      </Block>
                    )}
                  {listPhoto.length >= 4 ? (
                    <></>
                  ) : (
                      <Button
                        title={listPhoto.length === 0 ? "Chọn ảnh" : "Thêm ảnh"}
                        onPress={() => _pickListImage()}
                      ></Button>
                    )}
                </Block>
                <Block
                  center
                  middle
                  style={{
                    width: width * 0.5,
                    height: height * 0.07,
                    marginTop: 20,
                    backgroundColor: "#00c4cc",
                    borderRadius: 4
                  }}
                >
                  <Button
                    title="XÁC NHẬN"
                    color="white"
                    onPress={() => submit()}
                  ></Button>
                </Block>
                <Block
                  style={{
                    width: width * 0.5,
                    height: height * 0.1,
                    marginTop: 20,
                    borderRadius: 4
                  }}
                ></Block>
              </KeyboardAwareScrollView>
            </Block>
          </Block>
      }
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

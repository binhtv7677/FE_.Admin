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
  ActivityIndicator,
  AsyncStorage,
  Alert,
  FlatList
} from "react-native";
import { Block, Checkbox, Text, theme, NavBar } from "galio-framework";
import { Images, argonTheme } from "../../constants";
const { width, height } = Dimensions.get("screen");
import Tabs from "../../components/Tabs";
import { Icon } from "../../components";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { GET_AXIOS, PUT_AXIOS } from "../../api/caller";
import { PRODUCT_AVATA, GET_PRODUCT_ID, UPDATE_PRODUCT } from "../../api/endpoint";
import axios from "axios";

export default UpdateCategories = ({ route, navigation }) => {
  const [edit, setEdit] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [listPhoto, setList] = useState([]);
  const [loading, setLoad] = useState(false);
  const [Product, setProduct] = useState({
    Avaiable: 0,
    CategoryId: "",
    DateCreated: "",
    Description: "",
    Id: "",
    Images: [],
    IsLiked: false,
    Name: "",
    NumberOfLike: 0,
    Ordered: 0,
    Price: 0,
    Purchased: 0,
    Quantity: 0,
  });
  const [mainProduct, setMain] = useState({
    Avaiable: 0,
    CategoryId: "",
    DateCreated: "",
    Description: "",
    Id: "",
    Images: [],
    IsLiked: false,
    Name: "",
    NumberOfLike: 0,
    Ordered: 0,
    Price: 0,
    Purchased: 0,
    Quantity: 0,
  });
  const [updateProduct, setUpdate] = useState({
    id: "string",
    name: "string",
    price: 0,
    description: "string",
    quantity: 0,
    categoryId: "string"
  });
  const url = "http://45.119.83.107:9002/api/Product/Images?fileName=";
  const avatarUrl = url + route.params.product.MainImage;
  const [loadAvatar, setAvatar] = useState(false)
  const [editAvatar, setEditAvatar] = useState(false)
  const [editListIMG, setEditListIMG] = useState(false)
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
    headerTitle: props => <Text size={20}>Chi tiết</Text>,
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
  async function getData() {
    await GET_AXIOS(GET_PRODUCT_ID + route.params.product.Id).then(res => {
      setProduct(res.data);
      setMain(res.data);
    })
  }
  useEffect(() => {
    getData();
  }, []);

  async function getPermissionAsync() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  async function _pickImage() {
    getPermissionAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setPhoto(result);
  };
  async function _pickListImage() {
    getPermissionAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
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
  async function submit() {

    setLoad(true);
    var id = mainProduct.Id;
    var token = await AsyncStorage.getItem("jwt");
    if (editAvatar) {
      let formData = new FormData();
      var uri = photo.uri;
      let fileType = uri.substring(uri.lastIndexOf(".") + 1);
      formData.append("images", {
        uri: Platform.OS === "android" ? uri : uri.replace("file://", ""),
        name: `photo.${fileType}`,
        type: `image/${fileType}`
      })
      await axios({
        url: 'http://45.119.83.107:9002/api/Product/Images?isMain=true&&id=' + id,
        method: "PUT",
        headers: {
          authorization: "Bearer " + token
        },
        data: formData
      }).then(res => {
      }).catch(res => console.log(res))
    }

    if (editListIMG) {
      let listFormData = new FormData();
      listPhoto.map(i => {
        var link = i.uri;
        let listFileType = link.substring(link.lastIndexOf(".") + 1);
        listFormData.append("images", {
          uri: Platform.OS === "android" ? link : link.replace("file://", ""),
          name: `photo.${listFileType}`,
          type: `image/${listFileType}`
        })
      })
      await axios({
        url: 'http://45.119.83.107:9002/api/Product/Images?isMain=false&&id=' + id,
        method: "PUT",
        headers: {
          authorization: "Bearer " + token
        },
        data: listFormData
      }).then(res => {
      }).catch(res => console.log(res))
    }

    if (edit) {
      setUpdate({ ...updateProduct, id: Product.Id, name: Product.Name, price: Product.Price, description: Product.Description, quantity: Product.Quantity, categoryId: Product.CategoryId })
      console.log(updateProduct);
      PUT_AXIOS(UPDATE_PRODUCT, { id: Product.Id, name: Product.Name, price: Product.Price, description: Product.Description, quantity: Product.Quantity, categoryId: Product.CategoryId }).then(res => {
        console.log(res);
      }).catch(res => {
        console.log(res);
      })

    }
    Alert.alert(
      "Thông báo",
      "Cập nhật thành công",
      [
        {
          text: "Xác nhận",
          style: "cancel",
          onPress: () => {
            // getData();
            setEdit(false);
            setEditListIMG(false);
            setEditAvatar(false);
            navigation.goBack();
          }
        },
      ],
      {
        cancelable: true
      }
    );
  }
  function _renderItem(item, index) {
    return (
      <>
        {!editListIMG ?
          <>
            <ImageBackground
              key={item.toString()}
              source={{ uri: url + item }}
              style={{ width: 150, height: 150, marginLeft: 5, marginRight: 5 }}
            ></ImageBackground>
          </> :
          <>
            <ImageBackground
              key={item.uri.toString()}
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
          </>
        }
      </>
    )
  }

  return (
    <Block style={{ ...styles.registerContainer, zIndex: 1 }}>

      {
        loading ?
          <>
            <ActivityIndicator size="large" color="0000ff" />
          </> :
          <Block flex center style={{ ...styles.registerContainer }}>
            <KeyboardAwareScrollView style={{ width: width }}>
              <Block flex style={styles.group}>
                <Block
                  right
                  style={{
                    marginTop: 5,
                    height: 40
                  }}
                >
                  <TouchableOpacity
                    style={styles.customBtnBG}
                    onPress={() => {
                      setEdit(!edit);
                      setProduct(mainProduct);
                      setPhoto(null);
                      setAvatar(false)
                    }}
                  >
                    <Text style={{ ...styles.customBtnText, color: "white" }}>{!edit ? "Cập nhật thông tin" : "Huỷ"}
                    </Text>
                  </TouchableOpacity>
                </Block>
              </Block>
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
                    editable={edit}
                    style={{
                      width: width * 0.8,
                      borderBottomColor: "#999da1",
                      borderBottomWidth: 1,
                      height: 30
                    }}
                    onChangeText={content =>
                      setProduct({ ...Product, Name: content })
                    }
                    defaultValue={Product.Name}
                  // placeholder={Product.Name}
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
                    editable={edit}
                    style={{
                      width: width * 0.8,
                      borderBottomColor: "#999da1",
                      borderBottomWidth: 1,
                      height: 25
                    }}
                    keyboardType="numeric"
                    onChangeText={content =>
                      setProduct({ ...Product, Price: content })
                    }
                    defaultValue={Product.Price + ""}
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
                    editable={edit}
                    initialIndex={Product.CategoryId}
                    data={[
                      { id: "420e5124-e7e5-4af2-d45f-08d7bd988d47", title: "Quần dài" },
                      { id: "fa175d1c-f17d-4890-d460-08d7bd988d47", title: "Quần đùi" },
                      { id: "d1d964da-1923-43df-d461-08d7bd988d47", title: "Áo sơ mi" },
                      { id: "042edd2d-5ef9-43e7-d462-08d7bd988d47", title: "Áo thun" }
                    ]}
                    onChange={content => {
                      setProduct({ ...Product, type: content });
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
                    editable={edit}
                    style={{
                      width: width * 0.8,
                      borderBottomColor: "#999da1",
                      borderBottomWidth: 1,
                      height: 25
                    }}
                    keyboardType="numeric"
                    onChangeText={content =>
                      setProduct({ ...Product, Quantity: content })
                    }
                    defaultValue={Product.Quantity + ""}
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
                    editable={edit}
                    multiline={true}
                    style={{
                      width: width * 0.8,
                      borderBottomColor: "#999da1",
                      borderBottomWidth: 1
                    }}
                    placeholder={Product.Description}
                    onChangeText={content =>
                      setProduct({ ...Product, Description: content })
                    }
                    defaultValue={Product.Description + ""}
                  ></TextInput>

                </Block>
                <Block
                  style={{
                    paddingHorizontal: theme.SIZES.BASE,
                    marginTop: 15
                  }}
                >
                  <Block row>
                    <Block style={{
                      marginTop: 5,
                      height: 40
                      , width: width * 0.45
                    }}>
                      <Text style={{ fontWeight: "normal", color: "#999da1" }}>
                        Ảnh đại diện
                  </Text>
                    </Block>
                    <Block  >
                      <TouchableOpacity
                        style={styles.customBtnBG}
                        onPress={() => { setEditAvatar(!editAvatar) }}
                      >
                        <Text style={{ ...styles.customBtnText, color: "white" }}>{!editAvatar ? "Cập nhật ảnh đại diện" : "Huỷ"}
                        </Text>
                      </TouchableOpacity>
                    </Block>
                  </Block>

                  <Block
                    center
                    middle
                    style={{
                      marginTop: 10,
                      width: width,
                      borderWidth: photo === null ? 0.18 : 0
                    }}
                  >
                    {editAvatar ?
                      <Block
                        center
                        middle
                        style={{
                          width: width,
                          height: 200
                        }}
                      >
                        {photo !== null ?
                          <Image
                            source={{ uri: photo.uri }}
                            style={{ width: 150, height: 150 }}
                          /> :
                          <Image
                            source={{ uri: avatarUrl }}
                            style={{ width: 150, height: 150 }}
                          />}
                        <Button
                          title="Đổi ảnh"
                          onPress={() => _pickImage()}
                        ></Button>
                      </Block>
                      :
                      <>
                        {
                          loadAvatar ?
                            <Image
                              source={{ uri: avatarUrl }}
                              style={{ width: 150, height: 150 }}
                            />
                            : <Image
                              source={{ uri: avatarUrl }}
                              style={{ width: 150, height: 150 }}
                              onLoad={() => setAvatar(true)}
                            />
                        }
                      </>
                    }
                  </Block>
                </Block>
              </Block>
              <Block style={{ marginTop: 10 }}>
                <Block row>
                  <Block style={{
                    marginTop: 5,
                    height: 40
                    , width: width * 0.62
                  }}>
                    <Text style={{ fontWeight: "normal", color: "#999da1" }}>
                      Một số ảnh khác
                </Text>
                  </Block>
                  <Block  >
                    <TouchableOpacity
                      style={styles.customBtnBG}
                      onPress={() => { setEditListIMG(!editListIMG) }}
                    >
                      <Text style={{ ...styles.customBtnText, color: "white" }}>{!editListIMG ? "Cập nhật ảnh" : "Huỷ"}
                      </Text>
                    </TouchableOpacity>
                  </Block>
                </Block>
                {!editListIMG ?
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
                      data={Product.Images}
                      renderItem={({ item, index }) => _renderItem(item, index)}
                      keyExtractor={item => item.uri}
                      extraData={Product.Images}
                    />
                  </Block> :
                  <>
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
                  </>
                }
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
      }
    </Block >
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
  },
  customBtnBG: {
    backgroundColor: "#007aff",
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 30
  }
});

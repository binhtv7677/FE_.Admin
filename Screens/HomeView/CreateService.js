import React, { Component } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  Picker,
  View,
  Alert
} from "react-native";
import { Block, Checkbox, Text, theme, NavBar } from "galio-framework";
import { Images, argonTheme } from "../../constants";
const { width, height } = Dimensions.get("screen");
import NavigationService from "../../navigation/navigate";
import DatePicker from "react-native-datepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import DropdownMenu from "react-native-dropdown-menu";
import ModalDropdown from "react-native-modal-dropdown";
import { Button, Input } from "../../components";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const extractKey = item => item.id.toString();
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";

export default class CreateService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      selectedEndDate: null,
      createCalendar: false,
      image: "",
      data: [
        {
          id: 1,
          name: "Cắt tóc",
          price: "50.000",
          time: "15 phút",
          perSlot: 3,
          img: "",
          description: "Cắt như ý muốn khách hàng"
        },
        {
          id: 2,
          name: "Gội đầu",
          price: "20.000",
          time: "15 phút",
          perSlot: 3,
          img: "",
          description: "Cắt như ý muốn khách hàng"
        },
        {
          id: 3,
          name: "Nhuộm tóc",
          price: "40.000",
          time: "15 phút",
          perSlot: 3,
          img: "",
          description: "Cắt như ý muốn khách hàng"
        }
      ]
    };
    this.dataVM = {
      id: 1,
      name: "Cắt tóc",
      price: "50.000",
      time: "15 phút",
      perSlot: 3,
      img: ""
    };
  }

  removeEvent = async items => {
    await this.setState(state => {
      const data = state.data.filter(item => item.id !== items.id);
      return {
        data
      };
    });
  };
  dataVM = {
    id: 1,
    name: "Cắt tóc",
    price: "50.000",
    time: "15 phút",
    perSlot: 3,
    img: "",
    description: ""
  };
  componentDidMount() {
    this.getPermissionAsync();
    console.log(this.props.navigation.state);
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  showSate() {
    console.log(this.state);
  }

  createdata = async () => {
    this.dataVM.id = Math.floor(Math.random() * 1000);

    await this.setState(state => {
      const data = state.data.concat(this.dataVM);
      return {
        data
      };
    });

    console.log(this.state.data);
    this.setState({ createCalendar: false });
  };
  renderItem = ({ item }) => {
    return (
      <Block
        key={item.id}
        style={{
          width: width * 0.95,
          height: 210,
          borderColor: "#00c4cc",
          borderWidth: 0.9,
          borderRadius: 4,
          marginTop: 10
        }}
      >
        <Block
          center
          row
          style={{
            height: 25,
            marginTop: 15
          }}
        >
          <Block right style={{ width: width * 0.3 }}>
            <Text>Tên dịch vụ 3 :</Text>
          </Block>
          <Block style={{ width: width * 0.6, marginLeft: width * 0.1 }}>
            <Text>{item.name}</Text>
          </Block>
        </Block>
        <Block
          center
          row
          style={{
            height: 25
          }}
        >
          <Block right style={{ width: width * 0.3 }}>
            <Text>Giá dịch vụ :</Text>
          </Block>
          <Block style={{ width: width * 0.6, marginLeft: width * 0.1 }}>
            <Text>{item.price}</Text>
          </Block>
        </Block>
        <Block
          center
          row
          style={{
            height: 25
          }}
        >
          <Block right style={{ width: width * 0.3 }}>
            <Text>Thời gian:</Text>
          </Block>
          <Block style={{ width: width * 0.6, marginLeft: width * 0.1 }}>
            <Text>{item.time}</Text>
          </Block>
        </Block>
        <Block
          center
          row
          style={{
            height: 25
          }}
        >
          <Block right style={{ width: width * 0.3 }}>
            <Text>Người/slot:</Text>
          </Block>
          <Block style={{ width: width * 0.6, marginLeft: width * 0.1 }}>
            <Text>{item.perSlot}</Text>
          </Block>
        </Block>
        <Block
          center
          row
          style={{
            height: 25
          }}
        >
          <Block right style={{ width: width * 0.3 }}>
            <Text>Miêu tả:</Text>
          </Block>
          <Block style={{ width: width * 0.6, marginLeft: width * 0.1 }}>
            <Text>{item.description}</Text>
          </Block>
        </Block>
        <Block row center>
          <Button
            style={{
              width: width * 0.4,
              height: 30,
              marginTop: 10,
              backgroundColor: "#00c4cc"
            }}
            onPress={() => this.setState({ createCalendar: true })}
          >
            Update
          </Button>
          <Button
            style={{
              width: width * 0.4,
              height: 30,
              marginTop: 10,
              marginLeft: 5,
              backgroundColor: "red"
            }}
            onPress={() => this.removeEvent(item)}
          >
            Huỷ
          </Button>
        </Block>
      </Block>
    );
  };
  render() {
    let { image } = this.state;
    return (
      <ScrollView>
        <KeyboardAwareScrollView>
          <Block
            center
            middles
            style={{
              ...styles.registerContainer,
              zIndex: 1,
              height: height * 1.3
            }}
          >
            <Block
              style={{
                width: width,
                height: height / 25
              }}
            ></Block>
            <Block center style={{ width: width, height: 20 }}>
              <Text bold={true} size={17}>
                Dịch vụ
              </Text>
            </Block>
            <Block
              style={{
                height: 2,
                marginTop: 5,
                width: width,
                backgroundColor: "aliceblue"
              }}
            ></Block>
            <Block
              row
              center
              style={{ width: width, height: 35, marginTop: 20 }}
            >
              <Block center style={{ width: width / 2, height: 45 }}>
                <Button
                  onPress={() => this.setState({ createCalendar: false })}
                  style={{
                    width: width / 3,
                    height: 45,
                    backgroundColor: "#e7b12b"
                  }}
                >
                  <Text>Dịch vụ cửa hàng</Text>
                </Button>
              </Block>
              <Block center style={{ width: width / 2, height: 45 }}>
                <Button
                  onPress={() => this.setState({ createCalendar: true })}
                  style={{
                    width: width / 3,
                    height: 45,
                    backgroundColor: "#00c4cc"
                  }}
                >
                  <Text>Tạo dịch vụ mới</Text>
                </Button>
              </Block>
            </Block>

            {this.state.createCalendar === true ? (
              <Block
                center
                style={{
                  ...styles.BlockStyle,
                  height: 300,
                  marginTop: 30,
                  borderColor: "#00c4cc",
                  borderRadius: 4,
                  borderWidth: 0.5,
                  marginLeft: 10,
                  width: width * 0.8
                }}
              >
                <ImageBackground
                  source={{ uri: image }}
                  style={{ width: width * 0.8, height: 300, zIndex: 1 }}
                >
                  <Button
                    onPress={this._pickImage}
                    style={{
                      width: 120,
                      height: 30,
                      marginLeft: 30,
                      marginTop: 30,
                      backgroundColor: "white"
                    }}
                  >
                    <Text>Thêm ảnh miêu tả</Text>
                  </Button>
                </ImageBackground>
                <Block
                  row
                  center
                  style={{
                    ...styles.BlockStyle,
                    height: 50,
                    marginTop: 10,
                    zIndex: 2
                  }}
                ></Block>

                <Block style={{ marginLeft: width / 6 }}>
                  <Text color="red">*Vui lòng không để trống ô nào</Text>
                </Block>
                <Block
                  row
                  center
                  style={{
                    ...styles.BlockStyle,
                    height: 50,
                    marginTop: 10
                  }}
                >
                  <Block right style={{ width: (width * 2) / 6 }}>
                    <Text>Tên dịch vụ:</Text>
                  </Block>
                  <Block
                    center
                    style={{
                      width: (width * 4) / 6
                    }}
                  >
                    <Input
                      onChangeText={content => (this.dataVM.name = content)}
                      right
                      style={{ width: (width * 4) / 7 }}
                      placeholder="Ví dụ : gội đầu bồ kết"
                      iconContent={<Block />}
                    />
                  </Block>
                </Block>
                <Block
                  row
                  center
                  style={{
                    ...styles.BlockStyle,
                    height: 50,
                    marginTop: 10
                  }}
                >
                  <Block right style={{ width: (width * 2) / 6 }}>
                    <Text> Giá dịch vụ:</Text>
                  </Block>
                  <Block
                    center
                    style={{
                      width: (width * 4) / 6
                    }}
                  >
                    <Input
                      right
                      keyboardType="numeric"
                      onChangeText={e => (this.dataVM.price = e)}
                      style={{ width: (width * 4) / 7 }}
                      placeholder="Đơn vị ngàn đồng"
                      iconContent={<Block />}
                    />
                  </Block>
                </Block>
                <Block
                  row
                  center
                  style={{
                    ...styles.BlockStyle,
                    height: 50,
                    marginTop: 10
                  }}
                >
                  <Block right style={{ width: (width * 2) / 6 }}>
                    <Text>Miêu tả dịch vụ:</Text>
                  </Block>
                  <Block
                    center
                    style={{
                      width: (width * 4) / 6
                    }}
                  >
                    <Input
                      onChangeText={content =>
                        (this.dataVM.description = content)
                      }
                      right
                      style={{ width: (width * 4) / 7 }}
                      placeholder="Ví dụ : bồ kết tươi phơi khô 1 nắng"
                      iconContent={<Block />}
                    />
                  </Block>
                </Block>
                <Block
                  row
                  center
                  style={{
                    ...styles.BlockStyle,
                    height: 50,
                    marginTop: 10
                  }}
                >
                  <Block right style={{ width: (width * 2) / 6 }}>
                    <Text>Thời gian 1 slot :</Text>
                  </Block>
                  <Block
                    center
                    style={{
                      width: (width * 4) / 6
                    }}
                  >
                    <Input
                      right
                      onChangeText={e => (this.dataVM.time = e)}
                      keyboardType="numeric"
                      style={{ width: (width * 4) / 7 }}
                      placeholder="Đơn vị Phút"
                      iconContent={<Block />}
                    />
                  </Block>
                </Block>
                <Block
                  row
                  center
                  style={{
                    ...styles.BlockStyle,
                    height: 50,
                    marginTop: 10
                  }}
                >
                  <Block right style={{ width: (width * 2) / 6 }}>
                    <Text>Lượng khách 1 slot :</Text>
                  </Block>
                  <Block
                    center
                    style={{
                      width: (width * 4) / 6
                    }}
                  >
                    <Input
                      right
                      keyboardType="numeric"
                      onChangeText={e => (this.dataVM.perSlot = e)}
                      style={{ width: (width * 4) / 7 }}
                      placeholder="Đơn vị Người"
                      iconContent={<Block />}
                    />
                  </Block>
                </Block>
                <Block center style={{ width: width }}>
                  <Button
                    onPress={this.createdata}
                    // onPress={() => this.createdata}
                    style={{ backgroundColor: "#00c4cc", marginTop: 15 }}
                  >
                    <Text style={{ fontSize: 15 }}>Hoàn Tất</Text>
                  </Button>
                </Block>
              </Block>
            ) : (
              <>
                <Block
                  center
                  style={{ width: width, height: 30, marginTop: 15 }}
                >
                  <Text>Danh sách các dịch vụ chính</Text>
                </Block>
                {this.state.data.length > 0 ? (
                  <FlatList
                    // items={elements}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={extractKey}
                    extraData={this.state}
                  />
                ) : (
                  <></>
                )}
              </>
            )}
          </Block>
        </KeyboardAwareScrollView>
      </ScrollView>
    );
  }
}
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

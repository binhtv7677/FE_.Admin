import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Block, Checkbox, Text, theme, NavBar } from "galio-framework";
import { Images, argonTheme } from "../../constants";
import { Input, Header, Button } from "../../components";
const { width, height } = Dimensions.get("screen");
import NavigationService from "../../navigation/navigate";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import DatePicker from "@react-native-community/datetimepicker";

export default class RegisterStoreStep4 extends Component {
  constructor(props) {
    super(props);
    this.state = { timeStart: "" };
    this.state = { timeEnd: "" };
  }
  state = {
    image: null
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
  static navigationOptions = {
    title: "Welcome"
  };
  handleLeftPress = () => {
    const { navigation } = this.props;
    return navigation.goBack();
  };

  async testToPress() {
    await this.setState({ mainmajor: id });
  }

  accept = () => {
    NavigationService.navigate("DashBoard");
  };
  render() {
    const { title, iconColor, titleColor, navigation, ...props } = this.props;
    let { image } = this.state;

    return (
      <Block flex center style={{ ...styles.registerContainer }}>
        <KeyboardAwareScrollView>
          <ScrollView style={{ width: width }}>
            <Block flex style={styles.group}>
              <Block style={{ marginBottom: theme.SIZES.BASE }}>
                <NavBar
                  title={"Tạo cửa hàng cho bạn"}
                  left={
                    <Icon
                      name="angle-left"
                      size={30}
                      onPress={this.handleLeftPress}
                      color={iconColor || argonTheme.COLORS.ICON}
                    />
                  }
                  leftStyle={{ paddingVertical: 12, flex: 0.2 }}
                  titleStyle={[
                    styles.title,
                    { color: argonTheme.COLORS.BLACK },
                    titleColor && { color: titleColor }
                  ]}
                  {...props}
                />
              </Block>
            </Block>
            <Block
              style={{ width: width, height: 10, backgroundColor: "#e9ebee" }}
            ></Block>
            <Block style={{ ...styles.tempBlock, height: 80 }}>
              <Text
                style={{
                  marginLeft: 25,
                  marginTop: 7,
                  fontSize: 25,
                  color: "#00c4cc"
                }}
              >
                Bước 3
              </Text>
              <Text style={{ marginLeft: 25, fontSize: 15, color: "#00c4cc" }}>
                Sắp xong rồi hoàn thành nốt thôi !
              </Text>
            </Block>
            <Block
              style={{ width: width, height: 200, backgroundColor: "#e9ebee" }}
            >
              <ImageBackground
                source={{ uri: image }}
                style={{ width: width, height: 200, zIndex: 1 }}
              >
                <Block right style={{ width: width, height: 30 }}>
                  <Button
                    onPress={this._pickImage}
                    style={{
                      width: 120,
                      height: 40,
                      marginLeft: 30,
                      marginTop: 40,
                      backgroundColor: "white"
                    }}
                  >
                    <Text>đổi ảnh đại diện</Text>
                  </Button>
                </Block>
              </ImageBackground>
            </Block>
            <Block style={{ width: width, height: 250 }}>
              <Block row left style={{ width: width / 2, height: 70 }}>
                <Text style={{ fontSize: 17, marginTop: 10, marginLeft: 15 }}>
                  Store name :
                </Text>
                <Text
                  style={{
                    marginTop: 10,
                    marginLeft: 15,
                    fontSize: 17,
                    fontWeight: "bold"
                  }}
                >
                  {this.props.navigation.state.params.Step1.StoreName}
                </Text>
              </Block>
              <Block style={{ width: width, height: 80 }}>
                <Text style={{ fontSize: 15, marginLeft: 15, marginLeft: 25 }}>
                  Giới thiệu cửa hàng
                </Text>
                <Block
                  style={{
                    paddingHorizontal: theme.SIZES.BASE,
                    marginLeft: 15
                  }}
                >
                  <Input
                    right
                    placeholder="Nhập mô tả chi tiết về cửa hàng bạn"
                    iconContent={<Block />}
                  />
                </Block>
              </Block>
              <Block row center style={{ width: width, height: 80 }}>
                <Block center style={{ width: width / 2 }}>
                  <Text>Giờ làm việc</Text>
                  <Block>
                    <DatePicker
                      style={{ width: 150 }}
                      date={this.state.timeStart}
                      mode="time"
                      placeholder="select time"
                      format="HH:mm"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      showIcon={false}
                      onDateChange={date => {
                        this.setState({ timeStart: date });
                      }}
                    />
                  </Block>
                </Block>
                <Block center style={{ width: width / 2 }}>
                  <Text>Giờ nghỉ việc</Text>
                  <Block>
                    <DatePicker
                      style={{ width: 150 }}
                      date={this.state.timeEnd}
                      mode="time"
                      placeholder="select time"
                      format="HH:mm"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      showIcon={false}
                      onDateChange={date => {
                        this.setState({ timeEnd: date });
                      }}
                    />
                  </Block>
                </Block>
              </Block>
            </Block>
            <Block center style={{ width: width, height: 100 }}>
              <Button
                center
                style={{ marginTop: 20, backgroundColor: "#00c4cc" }}
                onPress={this.accept}
              >
                Tiếp tục
              </Button>
            </Block>
          </ScrollView>
        </KeyboardAwareScrollView>
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff"
  },
  head: { height: 40, backgroundColor: "#f1f8ff", width: width * 0.8 },
  text: { margin: 6 },
  register: {
    width: width,
    height: height * 1.5,
    backgroundColor: "#f6f6f6",
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
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
    width: 50,
    height: 50
  },
  group: {
    paddingTop: theme.SIZES.BASE * 2,
    backgroundColor: "white"
  },
  title: {
    width: "100%",
    fontSize: 20,
    marginLeft: width / 3
  },
  tempBlock: {
    backgroundColor: "white",
    width: width,
    justifyContent: "flex-start"
  },
  containerShadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 1
  },
  blockActive: {
    borderColor: "blue"
  }
});

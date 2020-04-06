import React, { Component } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  Alert
} from "react-native";
import { Block, Checkbox, Text, theme, NavBar } from "galio-framework";
import { Images, argonTheme } from "../../constants";
const { width, height } = Dimensions.get("screen");
import NavigationService from "../../navigation/navigate";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Select } from "../../components";
import { Dropdown } from "react-native-material-dropdown";
import { Input } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.state.params.data,
      status: this.props.navigation.state.params.status
    };
  }

  handleLeftPress = () => {
    const { navigation } = this.props;
    return navigation.goBack();
  };
  render() {
    var dataOption = [
      { value: "Khách không đến" },
      { value: "Khách đã huỷ lịch" }
    ];
    return (
      <KeyboardAwareScrollView>
        <ScrollView>
          <Block>
            <Block
              middle
              row
              style={{ width: width, height: 50, borderBottomWidth: 0.5 }}
            >
              <Block style={{ width: width, height: 50 }}>
                <NavBar
                  title={"Thông tin đơn hàng"}
                  left={
                    <Icon
                      name="angle-left"
                      size={30}
                      onPress={this.handleLeftPress}
                      color={argonTheme.COLORS.ICON}
                    />
                  }
                  leftStyle={{ paddingVertical: 12, flex: 0.2 }}
                  titleStyle={[
                    styles.title,
                    { color: argonTheme.COLORS.BLACK }
                  ]}
                />
              </Block>
              {/* <Text size={18}>Thông tin đơn hàng</Text> */}
            </Block>
            <Block
              center
              style={{
                width: width * 0.8,
                height: 380,
                marginTop: 10,
                borderColor: "#e9ebee",
                borderWidth: 0.7
              }}
            >
              <Block
                style={{
                  width: width * 0.7,
                  borderBottomColor: "#e9ebee",
                  borderBottomWidth: 0.7,
                  height: 60
                }}
              >
                <Text size={18} color="#c2ccd6">
                  Chi nhánh áp dụng
                </Text>
                <Text size={18}> {this.state.data.address}</Text>
              </Block>
              <Block
                style={{
                  width: width * 0.7,
                  borderBottomColor: "#e9ebee",
                  borderBottomWidth: 0.7,
                  height: 60
                }}
              >
                <Text size={18} color="#c2ccd6">
                  Số lượng người
                </Text>
                <Text size={18}> 1 người</Text>
              </Block>
              <Block
                style={{
                  width: width * 0.7,
                  borderBottomColor: "#e9ebee",
                  borderBottomWidth: 0.7,
                  height: 60
                }}
              >
                <Text size={18} color="#c2ccd6">
                  Chương trình:
                </Text>
                <Text size={18}> Khuyến mãi 20/11</Text>
              </Block>
              <Block
                style={{
                  width: width * 0.7,
                  borderBottomColor: "#e9ebee",
                  borderBottomWidth: 0.7,
                  height: 60
                }}
              >
                <Text size={18} color="#c2ccd6">
                  Thời gian:
                </Text>
                <Text size={18}> 09:45 / 11/12/2019</Text>
              </Block>
              <Block
                style={{
                  width: width * 0.7,
                  borderBottomColor: "#e9ebee",
                  borderBottomWidth: 0.7,
                  height: 60
                }}
              >
                <Text size={18} color="#c2ccd6">
                  Giá tiền:
                </Text>
                <Text size={18} color="red">
                  299k
                </Text>
              </Block>
              <Block
                style={{
                  width: width * 0.7,
                  borderBottomColor: "#e9ebee",
                  borderBottomWidth: 0.7,
                  height: 60
                }}
              >
                <Text size={18} color="#c2ccd6">
                  Dịch vụ
                </Text>
                <Block
                  style={{
                    width: width * 0.7,
                    borderBottomColor: "#e9ebee",
                    borderBottomWidth: 0.7,
                    height: 60
                  }}
                >
                  <Block row>
                    <Block style={{ width: width / 3 }}>
                      <Text>Cắt tóc</Text>
                    </Block>
                    <Block right style={{ width: width / 3 }}>
                      <Text>150000k</Text>
                    </Block>
                  </Block>
                  <Block row>
                    <Block style={{ width: width / 3 }}>
                      <Text>Gội đầu</Text>
                    </Block>
                    <Block right style={{ width: width / 3 }}>
                      <Text>80000k</Text>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
            <Block center style={{ width: width * 0.8, marginTop: 15 }}>
              <Block style={{ width: width * 0.8 }}>
                <Text size={22}>Thông tin người đặt</Text>
              </Block>
              <Block
                style={{
                  width: width * 0.7,
                  marginTop: 10
                }}
              >
                <Text size={19} color="#dcdcdc">
                  Họ và Tên
                </Text>
                <Block
                  style={{
                    marginLeft: 20,
                    marginTop: 5,
                    borderBottomWidth: 0.5,
                    borderBottomColor: "#4267b2"
                  }}
                >
                  <Text size={19}>{this.state.data.name}</Text>
                </Block>
              </Block>
              <Block
                style={{
                  width: width * 0.7,
                  marginTop: 13
                }}
              >
                <Text size={19} color="#dcdcdc">
                  Điện thoại liên hệ
                </Text>
                <Block
                  style={{
                    marginLeft: 20,
                    marginTop: 5,
                    borderBottomWidth: 0.5,
                    borderBottomColor: "#4267b2"
                  }}
                >
                  <Text size={19}>{this.state.data.phone}</Text>
                </Block>
              </Block>
            </Block>
            {this.state.status === 2 ? <></> : <></>}
            {this.state.status === 0 ? (
              <Block center style={{ width: (width * 3) / 4, marginTop: 20 }}>
                <Button
                  style={{ backgroundColor: "#34a853" }}
                  onPress={this.handleLeftPress}
                >
                  <Text size={18} color="white">
                    Xác nhận khách tới
                  </Text>
                </Button>
              </Block>
            ) : (
              <></>
            )}
            {this.state.status === 1 ? (
              <>
                <Block center style={{ width: (width * 3) / 4, marginTop: 20 }}>
                  <Block>
                    <Block
                      row
                      center
                      style={{ width: (width * 5) / 6, height: 50 }}
                    >
                      <Block style={{ width: (width * 1) / 6 }}>
                        <Text size={18}>Lý do:</Text>
                      </Block>
                      <Block
                        center
                        left
                        style={{
                          width: (width * 4.4) / 6
                        }}
                      >
                        <Input
                          onChangeText={content => (this.dataVM.name = content)}
                          right
                          style={{ width: (width * 4) / 7 }}
                          placeholder="Ví dụ:Nhân viên yêu cầu không có "
                          iconContent={<Block />}
                        />
                      </Block>
                    </Block>
                  </Block>
                  <Button
                    style={{ backgroundColor: "red" }}
                    onPress={() =>
                      Alert.alert(
                        "XÁC NHẬN HUỶ ĐƠN HÀNG",
                        "",
                        [
                          {
                            text: "Trở lại"
                          },
                          {
                            text: "Xác nhận",
                            onPress: this.handleLeftPress
                          }
                        ],
                        { cancelable: false }
                      )
                    }
                  >
                    <Text size={18} color="white">
                      Xác nhận huỷ đơn
                    </Text>
                  </Button>
                </Block>
              </>
            ) : (
              <></>
            )}
          </Block>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.75,
    height: height * 0.65,
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
    shadowRadius: 0,
    shadowOpacity: 0,
    marginTop: 20,
    opacity: 1,
    zIndex: 3
  },
  title: {
    // width: "100%",
    fontSize: 12,
    fontWeight: "bold",
    // alignItems: "flex-start"
    fontSize: 18
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    zIndex: 5
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  },
  registerButton: {
    width: width * 0.5,
    backgroundColor: "white",
    opacity: 0
  }
});

import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  Image,
  View,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { Block, Checkbox, Text, theme, NavBar } from "galio-framework";
import { Images, argonTheme } from "../../constants";
import { Button, Input, Header } from "../../components";
const { width, height } = Dimensions.get("screen");
import NavigationService from "../../navigation/navigate";
import { Table, Row, Rows } from "react-native-table-component";
import BottomSheet from "reanimated-bottom-sheet";
import Icon from "react-native-vector-icons/FontAwesome";
import RBSheet from "react-native-raw-bottom-sheet";
import Constants from "expo-constants";

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
export default class RegisterStoreStep3 extends Component {
  constructor(props) {
    super(props);
    this.testToPress = this.testToPress.bind(this);
    this.submitService = this.submitService.bind(this);
    this.bs = React.createRef();
  }
  forceUpdate() {
    this.render();
  }
  state = {
    tableHead: ["Tên dịch vụ", "Giá dịch vụ"],
    tableData: [
      ["Cắt tóc 365", "20.000"],
      ["Nhuộm tóc kim sa", "160.000"],
      ["Nhuộm tóc Hột lựu", "160.000"]
      // ["Nhuộm tóc Trái bắp", "160.000"],
      // ["Nhuộm tóc Bảy màu cầu vồng", "160.000"],
      // ["Nhuộm tóc Chim sa cá lặn", "160.000"],
      // ["Nhuộm tóc màu rêu", "160.000"],
      // ["Nhuộm tóc kim sa", "160.000"]
    ],
    mainmajor: String
  };

  handleLeftPress = () => {
    const { navigation } = this.props;
    return navigation.goBack();
  };

  async testToPress() {
    await this.setState({ mainmajor: id });
  }

  nameService = "";
  priceSerivce = "";
  submitService = () => {
    alert("Thêm mới thành công");
    var newTable = [this.nameService, this.priceSerivce];

    console.log(this.state);
  };

  render() {
    const { title, iconColor, titleColor, navigation, ...props } = this.props;
    return (
      <Block flex center style={{ ...styles.registerContainer }}>
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={300}
          duration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#e9ebee"
            }
          }}
        >
          <Block
            center
            style={{
              width: width,
              height: height / 3,
              backgroundColor: "#e9ebee"
            }}
          >
            <Block center>
              <Text size={18}>Thêm mới dịch vụ</Text>
            </Block>
            <KeyboardAvoidingView behavior="padding" enabled>
              <Block
                row
                center
                width={width * 0.9}
                style={{ marginBottom: 15, marginTop: 20 }}
              >
                <Text
                  right
                  size={18}
                  style={{
                    width: width * 0.2,
                    marginLeft: 20
                  }}
                >
                  Tên :
                </Text>
                <Input
                  center
                  placeholder="Tên dịch vụ"
                  iconContent={<Block />}
                  style={{ width: width * 0.6 }}
                  onChangeText={content => (this.nameService = content)}
                />
              </Block>
              <Block
                row
                center
                width={width * 0.9}
                style={{ marginBottom: 15 }}
              >
                <Text
                  right
                  size={18}
                  style={{
                    width: width * 0.2,
                    marginLeft: 20
                  }}
                >
                  Giá :
                </Text>
                <Input
                  center
                  keyboardType="numeric"
                  placeholder="Giá dịch vụ"
                  iconContent={<Block />}
                  onChangeText={content => (this.priceSerivce = content)}
                  style={{ width: width * 0.6 }}
                />
              </Block>
            </KeyboardAvoidingView>
            <Button
              center
              onPress={this.submitService}
              style={{ backgroundColor: "#00c4cc" }}
            >
              <Text style={{ fontSize: 15 }}>Thêm mới dịch vụ</Text>
            </Button>
          </Block>
        </RBSheet>
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
              Hãy cho khách hàng biết bạn có những dịch vụ nào !
            </Text>
            <Text
              style={{
                marginLeft: 25,
                marginTop: 5,
                fontSize: 13,
                color: "#00c4cc"
              }}
            >
              * Hãy thêm 1 số dịch vụ bạn đang có
            </Text>
          </Block>
          <Block
            style={{ width: width, height: 10, backgroundColor: "#e9ebee" }}
          ></Block>
          <Block
            center
            style={{
              ...styles.tempBlock,
              height: (height * 1) / 3
            }}
          >
            <Text
              style={{
                marginLeft: 25,
                marginTop: 5,
                fontSize: 18,
                color: argonTheme.COLORS.BLACK
              }}
            >
              Bảng dịch vụ
            </Text>
            <Block
              center
              style={{
                ...styles.category,
                backgroundColor: "white",
                height: (height * 5) / 10,
                width: width
              }}
            >
              <ScrollView>
                <View style={styles.container}>
                  <Table
                    borderStyle={{
                      borderWidth: 2,
                      borderColor: "#c8e1ff",
                      width: width * 0.8
                    }}
                  >
                    <Row
                      data={this.state.tableHead}
                      style={styles.head}
                      textStyle={styles.text}
                    />
                    <Rows data={this.state.tableData} textStyle={styles.text} />
                  </Table>
                </View>
              </ScrollView>
            </Block>
            <Block
              center
              style={{
                ...styles.tempBlock,
                height: (height * 1) / 15
              }}
            >
              <Button
                center
                onPress={() => this.RBSheet.open()}
                style={{ backgroundColor: "#00c4cc", width: width / 2 }}
              >
                <Text style={{ fontSize: 15 }}>Thêm mới dịch vụ</Text>
              </Button>
            </Block>
          </Block>
          <Block
            bottom
            style={{
              width: width,
              height: 10,
              backgroundColor: "#e9ebee",
              marginTop: (height * 2) / 6
            }}
          ></Block>
          <Block center style={{ height: 80 }}>
            <Button
              style={{ marginTop: 15 }}
              onPress={() => NavigationService.navigate("")}
            >
              <Text size={18}>Tiếp tục</Text>
            </Button>
          </Block>
        </ScrollView>
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

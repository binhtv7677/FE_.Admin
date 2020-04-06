import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  FlatList
} from "react-native";
import { Block, Checkbox, Text, theme, NavBar } from "galio-framework";
import { Images, argonTheme } from "../../constants";
import { Button, Input, Header } from "../../components";
import { TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");
import NavigationService from "../../navigation/navigate";
import Icon from "react-native-vector-icons/FontAwesome";
import BottomSheet from "reanimated-bottom-sheet";

const extractKey = item => item.id;

export default class RegisterStore extends Component {
  constructor(props) {
    super(props);
    this.testToPress = this.testToPress.bind(this);
    this.bs = React.createRef();
  }

  data = [
    {
      id: "a",
      newRow: [
        { id: "khachnam", title: "Khách nam", name: "mars" },
        { id: "khachnu", title: "Khách nữ", name: "venus" },
        { id: "amnhac", title: "Âm nhạc", name: "music" }
      ]
    },
    {
      id: "b",
      newRow: [
        { id: "wifi", title: "Wifi", name: "wifi" },
        { id: "trathe", title: "Trả bằng thẻ", name: "credit-card" },
        {
          id: "chodauxe",
          title: "Chỗ đậu xe",
          name: "car"
        }
      ]
    }
  ];

  static navigationOptions = {
    title: "Welcome"
  };
  handleLeftPress = () => {
    const { navigation } = this.props;
    return navigation.goBack();
  };
  state = {
    active: null,
    ListUtilities: [],
    StoreName: "",
    StorePhone: "",
    StoreAddress: ""
  };
  async testToPress(id, index) {
    if (this.state.ListUtilities.indexOf(id) > -1) {
      await this.setState(state => {
        const ListUtilities = state.ListUtilities.filter(item => item !== id);
        return {
          ListUtilities
        };
      });
    } else {
      await this.setState(state => {
        const ListUtilities = state.ListUtilities.concat(id);
        return {
          ListUtilities
        };
      });
    }
  }

  accept = () => {
    if (
      this.state.StorePhone !== null &&
      this.state.StoreName !== null &&
      this.state.StorePhone !== null &&
      this.state.ListUtilities.length > 0
    ) {
      NavigationService.navigate("RegisterStoreStep2", {
        Step1: this.state
      });
    }
  };
  renderContent() {
    return <Text style={{ backgroundColor: "blue" }}>abcd</Text>;
  }
  renderHeader() {}
  renderItem = ({ item }) => {
    let items = [];
    if (item.newRow !== null) {
      items = item.newRow.map((row, i) => {
        return (
          <Block
            key={row.id}
            style={{
              ...(this.state.ListUtilities.indexOf(row.id, 0) > -1
                ? { borderColor: argonTheme.COLORS.GREEN }
                : { borderColor: "#f6f6f6" }),
              width: 100,
              height: 100,
              marginLeft: width / 15,
              borderWidth: 3,
              borderRadius: 4
            }}
          >
            <TouchableOpacity
              keyboardShouldPersistTaps="handled"
              onPress={() => this.testToPress(row.id)}
              style={{ width: 100, height: 100 }}
            >
              <Block
                center
                style={{
                  width: 50,
                  height: 50,
                  marginTop: 15
                }}
              >
                <Icon
                  name={row.name}
                  size={40}
                  onPress={this.handleLeftPress}
                  color={
                    this.state.ListUtilities.indexOf(row.id, 0) > -1
                      ? argonTheme.COLORS.GREEN
                      : argonTheme.COLORS.ICON
                  }
                />
              </Block>
              <Block center>
                <Text>{row.title}</Text>
              </Block>
            </TouchableOpacity>
          </Block>
        );
      });
    }

    return (
      <Block row style={{ marginTop: 15 }}>
        {items}
      </Block>
    );
  };
  render() {
    const { elements } = this.state;
    const {
      back,
      title,
      white,
      transparent,
      bgColor,
      iconColor,
      titleColor,
      navigation,
      ...props
    } = this.props;

    return (
      <Block flex center style={{ ...styles.registerContainer }}>
        <BottomSheet
          snapPoints={[0, height / 2, height / 4, height / 8, 0]}
          renderContent={this.renderContent}
          renderHeader={this.renderHeader}
          ref={this.bs}
        />
        <ScrollView style={{ width: width }}>
          <Block flex style={styles.group}>
            <Block style={{ marginBottom: theme.SIZES.BASE }}>
              {/* <NavBar
                title={"Tạo cửa hàng cho bạn"}
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
                  { color: argonTheme.COLORS.BLACK },
                  titleColor && { color: titleColor }
                ]}
                {...props}
              /> */}
            </Block>
          </Block>
          <Block style={{ ...styles.tempBlock, height: 70 }}>
            <Text
              style={{
                marginLeft: 25,
                marginTop: 7,
                fontSize: 25,
                color: "#00c4cc"
              }}
            >
              Bước 1
            </Text>
            <Text style={{ marginLeft: 25, fontSize: 15, color: "#00c4cc" }}>
              Hãy cho khách hàng biết 1 chút thông tin về bạn nào !
            </Text>
          </Block>
          <Block style={{ ...styles.tempBlock, height: (height * 1) / 3.2 }}>
            <Text
              style={{
                marginLeft: 25,
                marginTop: 5,
                fontSize: 18,
                color: argonTheme.COLORS.BLACK
              }}
            >
              Thông tin cơ bản
            </Text>
            <Text
              style={{
                marginLeft: 35,
                marginTop: 5,
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
                Tên cửa hàng
              </Text>
              <TextInput
                style={{
                  width: width * 0.8,
                  borderBottomColor: "#999da1",
                  borderBottomWidth: 1,
                  height: 30
                }}
                onChangeText={content => this.setState({ StoreName: content })}
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
                Số điện thoại cố định
              </Text>
              <TextInput
                style={{
                  width: width * 0.8,
                  borderBottomColor: "#999da1",
                  borderBottomWidth: 1,
                  height: 25
                }}
                keyboardType="numeric"
                onChangeText={content => this.setState({ StorePhone: content })}
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
                Địa chỉ cửa hàng
              </Text>
              <TextInput
                style={{
                  width: width * 0.8,
                  borderBottomColor: "#999da1",
                  borderBottomWidth: 1,
                  height: 25
                }}
                onChangeText={content =>
                  this.setState({ StoreAddress: content })
                }
                placeholder=""
              ></TextInput>
            </Block>
          </Block>
          <Block style={{ ...styles.tempBlock, height: (height * 1) / 3.2 }}>
            <Text
              style={{
                marginLeft: 25,
                marginTop: 5,
                fontSize: 18,
                color: argonTheme.COLORS.BLACK
              }}
            >
              Một số tiện ích
            </Text>
            <Text
              style={{
                marginLeft: 35,
                marginTop: 5,
                fontSize: 12,
                color: argonTheme.COLORS.BLACK
              }}
            >
              *Khách nam/nữ vui lòng có ít nhất 1 trong 2
            </Text>
            <Block
              style={{
                ...styles.category,
                backgroundColor: "white",
                height: 300,
                width: width
              }}
            >
              <FlatList
                items={elements}
                data={this.data}
                renderItem={this.renderItem}
                keyExtractor={extractKey}
                extraData={this.state}
              />
            </Block>
          </Block>
          <Block
            center
            style={{
              ...styles.tempBlock,
              height: (height * 1) / 10,
              marginTop: height / 12
            }}
          >
            <Button
              center
              style={{ marginTop: 20, backgroundColor: "#00c4cc" }}
              onPress={this.accept}
            >
              Tiếp theo
            </Button>
          </Block>
        </ScrollView>
      </Block>
   
   
   );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1
  },
  registerContainer: {
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
    marginTop: 8,
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
  },
  blockNonActive: {
    borderColor: "#f6f6f6"
  }
});

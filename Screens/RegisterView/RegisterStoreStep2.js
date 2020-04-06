import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  Image
} from "react-native";
import { Block, Checkbox, Text, theme, NavBar } from "galio-framework";
import { Images, argonTheme } from "../../constants";
import { Button, Input, Header } from "../../components";
import { TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");
import NavigationService from "../../navigation/navigate";
import Icon from "react-native-vector-icons/FontAwesome";
const extractKey = item => item.id;
export default class RegisterStoreStep2 extends Component {
  constructor(props) {
    super(props);
    this.testToPress = this.testToPress.bind(this);
  }
  data = [
    {
      id: "a",
      newRow: [
        {
          id: "lamtoc",
          title: "Dịch vụ tóc",
          uri: Images.LAM_TOC
        },
        {
          id: "makeup",
          title: "Make up",
          uri: Images.MAKE_UP
        }
      ]
    },
    {
      id: "b",
      newRow: [
        {
          id: "nails",
          title: "Làm nails",
          uri: Images.LAM_NAILS
        },
        {
          id: "spa",
          title: "Spa",
          uri: Images.SPA
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
    mainmajor: ""
  };

  componentDidMount() {}
  testToPress = id => {
    this.setState({ mainmajor: id });
  };
  acceptButton = () => {
    NavigationService.navigate("RegisterStoreStep4", {
      Step2: this.state,
      Step1: this.props.navigation.state.params.Step1
    });
  };
  renderItem = ({ item }) => {
    let items = [];
    if (item.newRow !== null) {
      items = item.newRow.map((row, i) => {
        return (
          <Block
            center
            key={row.id}
            style={{
              ...(this.state.mainmajor === row.id
                ? { borderColor: argonTheme.COLORS.GREEN }
                : { borderColor: "#f6f6f6" }),
              width: 140,
              height: 140,
              borderWidth: 3,
              borderRadius: 4,
              marginBottom: width / 10,
              ...(row.id === "makeup" || row.id === "spa"
                ? { marginLeft: 20 }
                : {})
            }}
          >
            <TouchableOpacity
              onPress={() => this.testToPress(row.id)}
              keyboardShouldPersistTaps="handled"
              style={{ width: 140, height: 140 }}
            >
              <Block
                center
                style={{
                  width: 100,
                  height: 100,
                  marginTop: 15
                }}
              >
                <Image
                  style={{ width: 100, height: 100 }}
                  source={row.uri}
                ></Image>
                <Block center>
                  <Text>{row.title}</Text>
                </Block>
              </Block>
            </TouchableOpacity>
          </Block>
        );
      });
    }

    return (
      <Block row center>
        {items}
      </Block>
    );
  };
  render() {
    const { title, iconColor, titleColor, navigation, ...props } = this.props;
    const { elements } = this.state;

    return (
      <Block flex center style={{ ...styles.registerContainer }}>
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
          <Block style={{ ...styles.tempBlock, height: 70 }}>
            <Text
              style={{
                marginLeft: 25,
                marginTop: 7,
                fontSize: 25,
                color: "#00c4cc"
              }}
            >
              Bước 2
            </Text>
            <Text style={{ marginLeft: 25, fontSize: 15, color: "#00c4cc" }}>
              Hãy cho khách hàng biết bạn có những dịch vụ nào !
            </Text>
          </Block>

          <Block style={{ ...styles.tempBlock, height: (height * 1) / 1.8 }}>
            <Text
              style={{
                marginLeft: 25,
                marginTop: 5,
                fontSize: 18,
                color: argonTheme.COLORS.BLACK
              }}
            >
              Dịch vụ chính của bạn
            </Text>
            <Text
              style={{
                marginLeft: 45,
                marginTop: 5,
                fontSize: 14,
                color: argonTheme.COLORS.BLACK
              }}
            >
              *Vui lòng chọn 1
            </Text>
            <Block
              row
              center
              style={{
                ...styles.category,
                // backgroundColor: "red",
                height: 500,
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
              marginTop: height / 8
            }}
          >
            <Button
              center
              onPress={this.acceptButton}
              style={{ backgroundColor: "#00c4cc" }}
            >
              <Text style={{ fontSize: 15 }}>Tiếp theo</Text>
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
  }
});

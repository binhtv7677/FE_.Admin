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
import { Button } from "../../components";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

export default class History extends Component {
  constructor(props) {
    super(props);
    this.selectedValue = { language: "Java" };
  }

  state = {
    date: "9-12-2019",
    eventText: "",
    index: 0,
    routes: [
      { key: "first", title: "Tất cả" },
      { key: "second", title: "Sắp tới" },
      { key: "third", title: "Hoàn thành" },
      { key: "four", title: "Đang thực hiện" }
    ],
    dataAll: [
      {
        id: 1,
        name: "Trần Văn Bình",
        status: 0,
        slot: 1,
        phone: "0907269083"
      },
      {
        id: 2,
        name: "Trần Công Minh",
        status: 0,
        slot: 1,
        phone: "0907268478"
      },
      {
        id: 3,
        name: "Nguyễn Văn A",
        status: 1,
        slot: 2,
        phone: "1155445544"
      },
      {
        id: 4,
        name: "Nguyễn Văn B",
        status: 1,
        slot: 2,
        phone: "0907269083"
      },
      {
        id: 5,
        name: "Nguyễn Văn C",
        status: 2,
        slot: 3,
        phone: "0907269083"
      },
      {
        id: 6,
        name: "Nguyễn Văn D",
        status: 2,
        slot: 3,
        phone: "0907269083"
      }
    ],
    dataIsDone: [
      {
        id: 1,
        name: "Trần Văn Bình",
        status: 0,
        slot: 1,
        phone: "0907269083"
      },
      {
        id: 2,
        name: "Trần Công Bình",
        status: 0,
        slot: 1,
        phone: "0907268478"
      }
    ],
    dataIsDoing: [
      {
        id: 1,
        name: "Trần Văn Bình",
        status: 2,
        slot: 3,
        phone: "0907269083"
      },
      {
        id: 2,
        name: "Trần Công Bình",
        status: 2,
        slot: 3,
        phone: "0907268478"
      }
    ],
    dataIsWait: [
      {
        id: 1,
        name: "Trần Văn Bình",
        status: 1,
        slot: 2,
        phone: "0907269083"
      },
      {
        id: 2,
        name: "Trần Công Bình",
        status: 1,
        slot: 2,
        phone: "0907268478"
      }
    ]
  };
  renderData = items => (
    <>
      <Block
        row
        key={items.id}
        center
        style={{
          width: width,
          height: 50,
          borderColor: "#df6b46",
          borderRadius: 4,
          borderWidth: 0.5,
          marginTop: 5
        }}
      >
        <Block center style={{ width: (width * 2) / 5 }}>
          <Text>{items.name}</Text>
        </Block>
        <Block center style={{ width: width / 5 + 10 }}>
          <Text>{items.phone}</Text>
        </Block>
        <Block center style={{ width: width / 5 }}>
          {items.status === 0 ? <Text color="green">Hoàn thành</Text> : <></>}
          {items.status === 1 ? <Text color="red">Đang thực hiện</Text> : <></>}
          {items.status === 2 ? <Text color="blue">Sắp nhận</Text> : <></>}
        </Block>
        <Block
          middle
          style={{ width: width / 5, height: 50, backgroundColor: "#df6b46" }}
        >
          {items.status === 2 ? (
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "Huỷ Đơn",
                  "Bạn có chắc muốn huỷ đơn chứ",
                  [
                    {
                      text: "Huỷ",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "Xoá", onPress: () => console.log("OK Pressed") }
                  ],
                  { cancelable: false }
                )
              }
            >
              <Text size={20}>{items.slot}</Text>
            </TouchableOpacity>
          ) : (
            <Text size={20}>{items.slot}</Text>
          )}
        </Block>
      </Block>
    </>
  );
  FirstRoute = () => (
    <>
      <Block row style={{ width: width, height: 50 }}>
        <Block center style={{ width: (width * 2) / 5 }}>
          <Text>Tên</Text>
        </Block>
        <Block center style={{ width: width / 5 + 10 }}>
          <Text>SĐT</Text>
        </Block>
        <Block center style={{ width: width / 5 }}>
          <Text>Trạng thái</Text>
        </Block>
        <Block center style={{ width: width / 5 }}>
          <Text>Slot</Text>
        </Block>
      </Block>
      <Block style={{ width: width, height: height }}>
        <FlatList
          data={this.state.dataAll}
          renderItem={({ item }) => this.renderData(item)}
          keyExtractor={item => item.id.toString()}
        />
      </Block>
    </>
  );
  SecondRoute = () => (
    <>
      <Block row style={{ width: width, height: 50 }}>
        <Block center style={{ width: (width * 2) / 5 }}>
          <Text>Tên</Text>
        </Block>
        <Block center style={{ width: width / 5 + 10 }}>
          <Text>SĐT</Text>
        </Block>
        <Block center style={{ width: width / 5 }}>
          <Text>Trạng thái</Text>
        </Block>
        <Block center style={{ width: width / 5 }}>
          <Text>Slot</Text>
        </Block>
      </Block>
      <Block style={{ width: width, height: height }}>
        <FlatList
          data={this.state.dataIsWait}
          renderItem={({ item }) => this.renderData(item)}
          keyExtractor={item => item.id.toString()}
        />
      </Block>
    </>
  );
  ThirdRoute = () => (
    <>
      <Block row style={{ width: width, height: 50 }}>
        <Block center style={{ width: (width * 2) / 5 }}>
          <Text>Tên</Text>
        </Block>
        <Block center style={{ width: width / 5 + 10 }}>
          <Text>SĐT</Text>
        </Block>
        <Block center style={{ width: width / 5 }}>
          <Text>Trạng thái</Text>
        </Block>
        <Block center style={{ width: width / 5 }}>
          <Text>Slot</Text>
        </Block>
      </Block>
      <Block style={{ width: width, height: height }}>
        <FlatList
          data={this.state.dataIsDone}
          renderItem={({ item }) => this.renderData(item)}
          keyExtractor={item => item.id.toString()}
        />
      </Block>
    </>
  );
  FourRoute = () => (
    <>
      <Block row style={{ width: width, height: 50 }}>
        <Block center style={{ width: (width * 2) / 5 }}>
          <Text>Tên</Text>
        </Block>
        <Block center style={{ width: width / 5 + 10 }}>
          <Text>SĐT</Text>
        </Block>
        <Block center style={{ width: width / 5 }}>
          <Text>Trạng thái</Text>
        </Block>
        <Block center style={{ width: width / 5 }}>
          <Text>Slot</Text>
        </Block>
      </Block>
      <Block style={{ width: width, height: height }}>
        <FlatList
          data={this.state.dataIsDoing}
          renderItem={({ item }) => this.renderData(item)}
          keyExtractor={item => item.id.toString()}
        />
      </Block>
    </>
  );
  _renderHeader = section => {
    return (
      <Block
        center
        middle
        style={{
          width: width * 0.8,
          height: 30,
          borderColor: "blue",
          borderWidth: 0.5,
          borderRadius: 4,
          marginTop: 10
        }}
      >
        <Text style={styles.headerText}>{section.title}</Text>
      </Block>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    var data = [
      ["Lúa Spa - Hoàng Diệu", "Lúa Spa - Quận 10", "Lúa Spa - Quận 11"]
    ];
    var eventData = [
      [
        "Khuyến mãi 20-11",
        "Khuyến mãi lễ độc thân 11-11",
        "Khuyến mãi 8-3",
        "Khuyến mãi 14-2"
      ]
    ];
    return (
      <Block
        center
        middles
        style={{ ...styles.registerContainer, zIndex: 1, height: height }}
      >
        <Block
          row
          center
          style={{
            ...styles.BlockStyle,
            height: 50,
            marginTop: 15,
            zIndex: 3
          }}
        >
          <Block right style={{ width: (width * 2) / 6 }}>
            <Text> Chi nhánh :</Text>
          </Block>
          <Block
            style={{
              width: (width * 4) / 6
            }}
          >
            <DropdownMenu
              style={(borderWidth = 1)}
              bgColor={"white"}
              tintColor={"#666666"}
              activityTintColor={"green"}
              handler={(selection, row) =>
                this.setState({ text: data[selection][row] })
              }
              data={data}
            ></DropdownMenu>
          </Block>
        </Block>
        <Block
          style={{ width: width, height: 3, backgroundColor: "#e9ebee" }}
        ></Block>
        {/* <Block
          middle
          style={{
            width: width,
            height: 40,
            marginTop: 5
          }}
        >
          {/* <DatePicker
            style={{ width: 250 }}
            date={this.state.timeEnd}
            mode="date"
            placeholder={this.state.date}
            format="DD-MM-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            onDateChange={date => {
              this.setState({ date: date });
            }}
          /> */}
        {/* </Block> */}

        <Block
          row
          center
          style={{
            ...styles.BlockStyle,
            height: 50,
            marginTop: 15,
            zIndex: 3
          }}
        >
          <Block right style={{ width: (width * 2) / 6 }}>
            <Text> Chọn khuyến mãi:</Text>
          </Block>
          <Block
            style={{
              width: (width * 4) / 6
            }}
          >
            <DropdownMenu
              style={(borderWidth = 1)}
              bgColor={"white"}
              tintColor={"#666666"}
              activityTintColor={"green"}
              handler={(selection, row) =>
                this.setState({ text: eventData[selection][row] })
              }
              data={eventData}
            ></DropdownMenu>
          </Block>
        </Block>
        <Block style={{ width: width, height: (height * 3) / 4 + 15 }}>
          <ScrollView>
            <TabView
              renderLabel={({ route, focused, color }) => (
                <Text style={{ color, margin: 8 }}>{route.title}</Text>
              )}
              renderTabBar={props => (
                <TabBar
                  {...props}
                  indicatorStyle={{ backgroundColor: "black" }}
                  style={{ backgroundColor: "black", height: 50 }}
                />
              )}
              navigationState={this.state}
              renderScene={SceneMap({
                first: this.FirstRoute,
                second: this.FourRoute,
                third: this.ThirdRoute,
                four: this.SecondRoute
              })}
              onIndexChange={index => this.setState({ index })}
            />
          </ScrollView>
        </Block>
      </Block>
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

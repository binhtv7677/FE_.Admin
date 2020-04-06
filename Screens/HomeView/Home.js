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
import { Dropdown } from "react-native-material-dropdown";
import AwesomeAlert from "react-native-awesome-alerts";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.selectedValue = { language: "Java" };
  }

  state = {
    date: "9-12-2019",
    eventText: "",
    index: 0,
    routes: [
      { key: "first", title: "Mới" },
      { key: "second", title: "Đang thực hiện" },
      { key: "third", title: "Hoàn thành" },
      { key: "four", title: "Đã huỷ" }
    ],
    dataAll: [
      {
        id: 1,
        name: "Trần Văn Bình",
        status: 0,
        slot: "11h - 12h",
        phone: "0907269083",
        title: "Khuyến mãi 20-11",
        address: "Lúa Spa - Hoàng Diệu"
      },
      {
        id: 2,
        name: "Trần Công Minh",
        status: 0,
        slot: "11h - 12h",
        phone: "0907268478",
        title: "Khách book chỗ trước",
        address: "Lúa Spa - Quận 10"
      },
      {
        id: 3,
        name: "Trần Công Minh",
        status: 0,
        slot: "11h - 12h",
        phone: "0907268478",
        title: "Khuyến mãi 20-11",
        address: "Lúa Spa - Quận 11"
      },
      {
        id: 4,
        name: "Trần Công Minh",
        status: 0,
        slot: "11h - 12h",
        phone: "0907268478",
        title: "Khách chọn dịch vụ sau",
        address: "Lúa Spa - Quận 11"
      },
      {
        id: 5,
        name: "Trần Công Minh",
        status: 0,
        slot: "11h - 12h",
        phone: "0907268478",
        title: "Khách chọn dịch vụ sau",
        address: "Lúa Spa - Quận 11"
      },
      {
        id: 6,
        name: "Nguyễn Văn A",
        status: 1,
        slot: "12h - 13h",
        phone: "1155445544",
        title: "Khách chọn dịch vụ sau",
        address: "Lúa Spa - Quận 12"
      },
      {
        id: 7,
        name: "Nguyễn Văn B",
        status: 1,
        slot: "13h - 14h",
        phone: "0907269083",
        title: "Khách chọn dịch vụ sau",
        address: "Lúa Spa - Quận 1"
      },
      {
        id: 8,
        name: "Nguyễn Văn C",
        status: 2,
        slot: "14h - 15h",
        phone: "0907269083",
        title: "Khách chọn dịch vụ sau",
        address: "Lúa Spa - Quận 11"
      },
      {
        id: 9,
        name: "Nguyễn Văn D",
        status: 2,
        slot: "14h - 15h",
        phone: "0907269083",
        title: "Khách chọn dịch vụ sau",
        address: "Lúa Spa - Quận 11"
      },
      {
        id: 10,
        name: "Nguyễn Văn D",
        status: 2,
        slot: "14h - 15h",
        phone: "0907269083",
        title: "Khuyến mãi 20-11",
        address: "Lúa Spa - Quận 11"
      },
      {
        id: 11,
        name: "Nguyễn Văn D",
        status: 2,
        slot: "14h - 15h",
        phone: "0907269083",
        title: "Cắt tóc :  150k \nGội đầu :  100k ",
        address: "Lúa Spa - Quận 11"
      },
      {
        id: 12,
        name: "Nguyễn Văn D",
        status: 3,
        slot: "14h - 15h",
        phone: "0907269083",
        title: "Khách không đến cửa hàng",
        address: "Lúa Spa - Quận 11"
      },
      {
        id: 13,
        name: "Nguyễn Văn D",
        status: 3,
        slot: "14h - 15h",
        phone: "0907269083",
        title: "Khách không đến cửa hàng",
        address: "Lúa Spa - Quận 11"
      }
    ],
    showAlert: false
  };
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  changeStatus = (items, status) => {
    let newArray = [...this.state.dataAll];
    newArray.map(el => (el.id === items.id ? (el.status = status) : el));
    this.setState({ dataAll: newArray });
    console.log("ren ròi");
  };
  tampRender = (items, check) => {
    switch (check) {
      case 0:
        return (
          <>
            {items.status === 0 ? (
              <Block>
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
                    <TouchableOpacity
                      onPress={() =>
                        Alert.alert(
                          "Thông tin Đơn hàng",
                          items.title,
                          [
                            {
                              text: "Xác nhận",
                              onPress: () => console.log("Cancel Pressed")
                            }
                          ],
                          { cancelable: false }
                        )
                      }
                    >
                      <Text>{items.name}</Text>
                    </TouchableOpacity>
                  </Block>

                  <Block
                    middle
                    style={{
                      width: width / 5 + 15 + 25,
                      backgroundColor: "white"
                    }}
                  >
                    <Text size={17}>{items.slot}</Text>
                  </Block>
                  <Block center style={{ width: width / 5 - 20 }}>
                    <Button
                      onPress={() =>
                        Alert.alert(
                          "Nhận Đơn",
                          "Bạn có chắc muốn nhận đơn chứ",
                          [
                            {
                              text: "Trở laij",
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel"
                            },
                            {
                              text: "Xác nhận",
                              onPress: () =>
                                NavigationService.navigate("OrderDetail", {
                                  data: items,
                                  status: 0
                                })
                            }
                          ],
                          { cancelable: false }
                        )
                      }
                      style={{
                        width: width / 5,
                        height: 50,
                        backgroundColor: "green"
                      }}
                    >
                      Nhận
                    </Button>
                  </Block>
                  <Block center>
                    <Button
                      onPress={() =>
                        NavigationService.navigate("OrderDetail", {
                          data: items,
                          status: 1
                        })
                      }
                      style={{
                        width: width / 5 - 15,
                        height: 50,
                        backgroundColor: "#f93e3e"
                      }}
                    >
                      Huỷ
                    </Button>
                  </Block>
                </Block>
              </Block>
            ) : (
              <></>
            )}
          </>
        );
      case 1:
        return (
          <>
            {items.status === 1 ? (
              <>
                <Block>
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
                    <Block center style={{ width: (width * 2) / 5 - 25 }}>
                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert(
                            "Thông tin Đơn hàng",
                            items.title,
                            [
                              {
                                text: "Xác nhận",
                                onPress: () => console.log("Cancel Pressed")
                              }
                            ],
                            { cancelable: false }
                          )
                        }
                      >
                        <Text>{items.name}</Text>
                      </TouchableOpacity>
                    </Block>
                    <Block center style={{ width: width / 5 + 15 }}>
                      <Text>{items.phone}</Text>
                    </Block>

                    <Block
                      middle
                      style={{
                        width: width / 5,
                        backgroundColor: "white"
                      }}
                    >
                      <Text size={15}>{items.slot}</Text>
                    </Block>
                    <Block center>
                      <Button
                        onPress={() =>
                          Alert.alert(
                            "Hoàn thành đơn hàng",
                            "Bạn có chắc đã hoàn đơn hàng chứ",
                            [
                              {
                                text: "Trở lại",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                              },
                              {
                                text: "Hoàn thành",
                                onPress: () => {}
                                // NavigationService.navigate("OrderDetail", {
                                //   data: items,
                                //   status: 1
                                // })
                              }
                            ],
                            { cancelable: false }
                          )
                        }
                        style={{
                          width: width / 10 + 10,
                          height: 50,
                          backgroundColor: "green"
                        }}
                      >
                        Hoàn thành
                      </Button>
                    </Block>
                    <Block center>
                      <Button
                        onPress={() =>
                          NavigationService.navigate("OrderDetail", {
                            data: items,
                            status: 1
                          })
                        }
                        style={{
                          width: width / 10,
                          height: 50,
                          backgroundColor: "#f93e3e"
                        }}
                      >
                        Huỷ
                      </Button>
                    </Block>
                  </Block>
                </Block>
              </>
            ) : (
              <></>
            )}
          </>
        );
      case 2:
        return (
          <>
            {items.status === 2 ? (
              <>
                <Block>
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
                    <Block center style={{ width: (width * 2) / 5 - 20 }}>
                      <Text>{items.name}</Text>
                    </Block>
                    <Block center style={{ width: width / 5 + 10 }}>
                      <Text>{items.phone}</Text>
                    </Block>

                    <Block
                      middle
                      style={{
                        width: width / 5 + 15,
                        backgroundColor: "white"
                      }}
                    >
                      <Text size={17}>{items.slot}</Text>
                    </Block>
                    <Block center>
                      <Button
                        onPress={() =>  NavigationService.navigate("OrderDetail", {
                          data: items,
                          status: 2
                        })
                          // Alert.alert(
                          //   "XEM THÔNG TIN ĐƠN HÀNG",
                          //   "",
                          //   [
                          //     {
                          //       text: "Xác nhận",
                          //       onPress: () =>
                                 
                          //     }
                          //   ],
                          //   { cancelable: false }
                          // )
                        }
                        style={{
                          width: width / 5,
                          height: 50,
                          backgroundColor: "green"
                        }}
                      >
                        Chi tiết
                      </Button>
                    </Block>
                  </Block>
                </Block>
              </>
            ) : (
              <></>
            )}
          </>
        );
      case 3:
        return (
          <>
            {items.status === 3 ? (
              <>
                <Block>
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
                    <Block center style={{ width: (width * 2) / 5 - 20 }}>
                      <Text>{items.name}</Text>
                    </Block>
                    <Block center style={{ width: width / 5 + 10 }}>
                      <Text>{items.phone}</Text>
                    </Block>

                    <Block
                      middle
                      style={{
                        width: width / 5 + 10,
                        backgroundColor: "white"
                      }}
                    >
                      <Text size={16}>{items.slot}</Text>
                    </Block>
                    <Block center>
                      <Button
                        onPress={() =>
                          Alert.alert(
                            "THÔNG TIN ĐƠN HÀNG",
                            items.title,
                            [
                              {
                                text: "Xác nhận",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                              }
                            ],
                            { cancelable: false }
                          )
                        }
                        style={{
                          width: width / 5,
                          height: 50,
                          backgroundColor: "#f93e3e"
                        }}
                      >
                        Lý do
                      </Button>
                    </Block>
                  </Block>
                </Block>
              </>
            ) : (
              <></>
            )}
          </>
        );
    }
  };

  FirstRoute = () => (
    <>
      <Block row style={{ width: width, height: 50 }}>
        <Block center style={{ width: (width * 2) / 5 + 10 }}>
          <Text size={16}>Tên</Text>
        </Block>
        <Block center style={{ width: width / 5 + 25 }}>
          <Text size={16}>Khung giờ</Text>
        </Block>
      </Block>
      <Block style={{ width: width, height: height }}>
        <FlatList
          data={this.state.dataAll}
          renderItem={({ item }) => this.tampRender(item, 0)}
          keyExtractor={item => item.id.toString()}
          extraData={this.state}
        />
      </Block>
    </>
  );
  SecondRoute = () => (
    <>
      <Block row style={{ width: width, height: 50 }}>
        <Block center style={{ width: (width * 2) / 5 - 20 }}>
          <Text size={17}>Tên</Text>
        </Block>
        <Block center style={{ width: width / 5 + 10 }}>
          <Text size={17}>SĐT</Text>
        </Block>
        <Block center style={{ width: width / 5 + 20 }}>
          <Text size={17}>Khung giờ</Text>
        </Block>
      </Block>
      <Block style={{ width: width, height: height }}>
        <FlatList
          data={this.state.dataAll}
          renderItem={({ item }) => this.tampRender(item, 1)}
          keyExtractor={item => item.id.toString()}
          extraData={this.state}
        />
      </Block>
    </>
  );
  ThirdRoute = () => (
    <>
      <Block row style={{ width: width, height: 50 }}>
        <Block center style={{ width: (width * 2) / 5 - 30 }}>
          <Text>Tên</Text>
        </Block>
        <Block center style={{ width: width / 5 }}>
          <Text>SĐT</Text>
        </Block>
        <Block center style={{ width: width / 5 }}>
          <Text>Khung giờ</Text>
        </Block>
      </Block>
      <Block style={{ width: width, height: height }}>
        <FlatList
          data={this.state.dataAll}
          renderItem={({ item }) => this.tampRender(item, 2)}
          keyExtractor={item => item.id.toString()}
          extraData={this.state}
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
          <Text>Khung giờ</Text>
        </Block>
      </Block>
      <Block style={{ width: width, height: height }}>
        <FlatList
          data={this.state.dataAll}
          renderItem={({ item }) => this.tampRender(item, 3)}
          keyExtractor={item => item.id.toString()}
          extraData={this.state}
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

  editPost = () => {
    console.log("abc");
  };
  render() {
    var eventData = [
      [
        "Không có khuyến mãi",
        "Khuyến mãi 20-11",
        "Khuyến mãi lễ độc thân 11-11",
        "Khuyến mãi 8-3",
        "Khuyến mãi 14-2"
      ]
    ];
    var dataStore = [
      {
        value: "Lúa Spa - Hoàng Diệu"
      },
      {
        value: "Lúa Spa - Quận 10"
      },
      {
        value: "Lúa Spa - Quận 11"
      }
    ];
    var dataTime = [
      {
        value: "Hôm nay"
      },
      {
        value: "Tuần này"
      },
      {
        value: "Tháng này"
      }
    ];
    const { showAlert } = this.state;

    return (
      <Block style={{ ...styles.registerContainer, zIndex: 1, height: height }}>
        <Block
          row
          style={{
            ...styles.BlockStyle,
            width: width,
            height: 60,
            zIndex: 4,
            marginLeft: 10
          }}
        >
          <Block style={{ width: 190 }}>
            <Dropdown
              label="Tên chi nhánh"
              data={dataStore}
              value="Lúa Spa - Quận 11"
              dropdownPosition={0}
            />
          </Block>
          <Block style={{ width: 100 }}>
            <Dropdown
              label="Thời gian"
              data={dataTime}
              value="Hôm nay"
              dropdownPosition={0}
            />
          </Block>
        </Block>
        <Block
          style={{ width: width, height: 3, backgroundColor: "black" }}
        ></Block>
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
              width: (width * 4) / 6,
              zIndex: 1
            }}
          >
            <DropdownMenu
              style={{ zIndex: 1 }}
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
                  indicatorStyle={{ backgroundColor: "white" }}
                  style={{ backgroundColor: "white", height: 50 }}
                  inactiveColor="black"
                  activeColor="blue"
                  labelStyle={{ fontSize: 10 }}
                />
              )}
              navigationState={this.state}
              renderScene={SceneMap({
                first: this.FirstRoute,
                second: this.SecondRoute,
                third: this.ThirdRoute,
                four: this.FourRoute
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

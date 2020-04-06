import React, { Component } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
  FlatList,
  AsyncStorage
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import { Images, argonTheme } from "../constants";
import { Icon, Input, Button } from "../components";
const { width, height } = Dimensions.get("screen");
import NavigationService from "../navigation/navigate";
import RBSheet from "react-native-raw-bottom-sheet";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import DropdownMenu from "react-native-dropdown-menu";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const extractKey = item => item.id.toString();
import CheckBox from "react-native-check-box";

export default class ViewCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckedSaleOff: false,
      isCheckedPercent: false,
      isCheckedSame: false,
      selectedStartDate: null,
      selectedEndDate: null,
      createCalendar: false,
      data: [
        {
          id: 1,
          name: "Mừng 1 tháng 1",
          time: "1-1-2020",
          chinhanh: "Quận 10",
          description: "Nhận ngay 50% giảm giá từ 12h đến 16h",
          timeSlot: 3,
          perSlot: 1,
          status: "Đang đợi kích hoạt"
        }
      ]
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.dataVM = {
      id: 1,
      name: "",
      time: "",
      chinhanh: "",
      description: "",
      timeSlot: 0,
      perSlot: 0,
      status: "Đang đợi kích hoạt"
    };
  }

  dataVM = {
    id: 1,
    name: "",
    time: "",
    chinhanh: "",
    description: "",
    timeSlot: 0,
    perSlot: 0,
    status: "Đang đợi kích hoạt"
  };
  onDateChange(date, type) {
    if (type === "END_DATE") {
      this.setState({
        selectedEndDate: moment(date).format("DD-MM-YYYY")
      });
    } else {
      this.setState({
        selectedStartDate: moment(date).format("DD-MM-YYYY"),
        selectedEndDate: null
      });
    }
  }
  showSate() {
    console.log(this.state);
  }

  removeEvent = async items => {
    await this.setState(state => {
      const data = state.data.filter(item => item.id !== items.id);
      return {
        data
      };
    });
  };

  updateChecked = id => {
    if (id === 1) {
      this.setState({ isCheckedPercent: true });
      this.setState({ isCheckedSaleOff: false });
      this.setState({ isCheckedSame: false });
    } else if (id === 2) {
      this.setState({ isCheckedPercent: false });
      this.setState({ isCheckedSaleOff: false });
      this.setState({ isCheckedSame: true });
    } else {
      this.setState({ isCheckedPercent: false });
      this.setState({ isCheckedSaleOff: true });
      this.setState({ isCheckedSame: false });
    }
  };
  updateEvent = async items => { };
  createdata = async () => {
    this.dataVM.id = Math.floor(Math.random() * 1000);
    this.dataVM.sta;
    await this.setState(state => {
      const data = state.data.concat(this.dataVM);
      return {
        data
      };
    });
    this.setState({ createCalendar: false });
  };
  renderItem = ({ item }) => {
    return (
      <Block
        key={item.id}
        style={{
          width: width * 0.95,
          height: 240,
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
            height: 25
          }}
        >
          <Block right style={{ width: width * 0.3 }}>
            <Text>Tên khuyến mãi :</Text>
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
            <Text>Chi nhánh:</Text>
          </Block>
          <Block style={{ width: width * 0.6, marginLeft: width * 0.1 }}>
            <Text>{item.chinhanh}</Text>
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
            <Text>Thời gian/slot:</Text>
          </Block>
          <Block style={{ width: width * 0.6, marginLeft: width * 0.1 }}>
            <Text>{item.timeSlot}</Text>
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
            height: 25,
            marginTop: 12
          }}
        >
          <Block right top style={{ width: width * 0.3, height: 30, bor }}>
            <Text>Miêu tả:</Text>
          </Block>
          <Block
            style={{
              width: width * 0.6,
              marginLeft: width * 0.1,
              height: 60
            }}
          >
            <Text>{item.description}</Text>
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
            <Text>Trạng thái:</Text>
          </Block>
          <Block style={{ width: width * 0.6, marginLeft: width * 0.1 }}>
            <Text>{item.status}</Text>
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
          // onPress={() => this.setState({ createCalendar: true })}
          >
            Update
          </Button>
          <Button
            style={{
              width: width * 0.4,
              height: 30,
              marginTop: 10,
              backgroundColor: "red",
              marginLeft: 10
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
    var data = [
      ["Lúa Spa - Hoàng Diệu", "Lúa Spa - Quận 10", "Lúa Spa - Quận 11"]
    ];

    let TimeEnd =
      this.state.selectedStartDate + " đến " + this.state.selectedEndDate;
    let TimeStart = this.state.selectedStartDate;
    const { elements } = this.state;

    if (this.state.selectedEndDate == null) {
      this.dataVM.time = TimeStart;
    } else {
      console.log(1);
      this.dataVM.time = TimeStart;
    }
    return (
      <ScrollView>
        <KeyboardAwareScrollView>
          <Block
            center
            middles
            style={{
              ...styles.registerContainer,
              zIndex: 1,
              height: height * 2
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
                Tạo khuyến mãi
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
                    width: width / 3 + 20,
                    height: 45,
                    backgroundColor: "#e7b12b"
                  }}
                >
                  <Text>Danh sách khuyến mãi</Text>
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
                  <Text>Tạo mới</Text>
                </Button>
              </Block>
            </Block>

            {this.state.createCalendar === true ? (
              <Block>
                <Block
                  row
                  center
                  style={{
                    ...styles.BlockStyle,
                    height: 50,
                    marginTop: 10,
                    zIndex: 2
                  }}
                >
                  <Block right style={{ width: (width * 2) / 6 }}>
                    <Text> Chọn chi nhánh :</Text>
                  </Block>
                  <Block
                    style={{
                      width: (width * 4) / 6
                    }}
                  >
                    <DropdownMenu
                      style={{ borderWidth: 1 }}
                      bgColor={"white"}
                      tintColor={"#666666"}
                      activityTintColor={"green"}
                      handler={(selection, row) =>
                        // this.setState({ text: data[selection][row] })
                        // console.log(data[selection][row])
                        (this.dataVM.chinhanh = data[selection][row])
                      }
                      data={data}
                    ></DropdownMenu>
                  </Block>
                </Block>

                <Block style={{ marginLeft: width / 6 }}>
                  <Text color="red">*Vui lòng không để trống tất cả các ô</Text>
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
                    <Text>Tên khuyến mãi :</Text>
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
                      placeholder="Ví dụ : Khuyến mãi 20/11"
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
                    <Text>Miêu tả khuyến mãi :</Text>
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
                      placeholder="Ví dụ : tặng 50% cho đợt cắt tóc"
                      iconContent={<Block />}
                    />
                  </Block>
                </Block>
                <Block
                  style={{
                    ...styles.BlockStyle,
                    marginTop: 10,
                    marginLeft: 10
                  }}
                >
                  <Text color="blue">Bảng chọn thời gian</Text>
                </Block>
                <Block
                  style={{
                    ...styles.BlockStyle,
                    height: 350,
                    marginTop: 5,
                    borderColor: "#00c4cc",
                    borderRadius: 4,
                    borderWidth: 0.5,
                    marginLeft: 10
                  }}
                >
                  <CalendarPicker
                    startFromMonday={true}
                    allowRangeSelection={true}
                    todayBackgroundColor="#f2e6ff"
                    selectedDayColor="#7300e6"
                    selectedDayTextColor="#FFFFFF"
                    onDateChange={this.onDateChange}
                  />
                </Block>
                <Block
                  row
                  center
                  style={{
                    ...styles.BlockStyle,
                    height: 50,
                    marginTop: 10,
                    borderColor: "black",
                    borderWidth: 0.5,
                    borderRadius: 4
                  }}
                >
                  <Block right style={{ width: (width * 2) / 6 }}>
                    <Text>Thời gian áp dụng :</Text>
                  </Block>
                  <Block
                    row
                    center
                    style={{
                      width: (width * 4) / 6
                    }}
                  >
                    {this.state.selectedStartDate == null ? (
                      <Text style={{ paddingLeft: width / 10 }}>
                        Vui lòng chọn ở bảng bên trên
                      </Text>
                    ) : (
                        <Text
                          color="red"
                          size={15}
                          style={{ paddingLeft: width / 10 }}
                        >
                          {this.state.selectedEndDate == null
                            ? TimeStart
                            : TimeEnd}
                        </Text>
                      )}
                  </Block>
                </Block>
                <Block
                  row
                  center
                  middle
                  style={{
                    ...styles.BlockStyle,
                    height: 50,
                    marginTop: 10
                  }}
                >
                  <Text color="green">
                    Khung giờ làm việc ( 8h - 22h30p ) hàng ngày
                  </Text>
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
                      onChangeText={e => (this.dataVM.timeSlot = e)}
                      keyboardType="numeric"
                      style={{ width: (width * 4) / 7 }}
                      placeholder="Đơn vị Phút ( tối đa 60 phút )"
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
                <Block
                  center
                  style={{ width: width * 0.7, height: 30, marginTop: 15 }}
                >
                  <Text color="red">Vui lòng chỉ chọn 1 hình thức khuyến mãi</Text>
                </Block>
                <Block row center style={{ width: width * 0.9 }}>
                  <Block style={{ width: width * 0.2 }}>
                    <Block middle style={{ height: 40 }}>
                      <CheckBox
                        style={{ padding: 10 }}
                        onClick={() => this.updateChecked(1)}
                        isChecked={this.state.isCheckedPercent}
                      />
                    </Block>
                    <Block middle style={{ height: 40 }}>
                      <CheckBox
                        style={{ padding: 10 }}
                        onClick={() => this.updateChecked(2)}
                        isChecked={this.state.isCheckedSame}
                      />
                    </Block>
                    <Block middle style={{ height: 40 }}>
                      <CheckBox
                        style={{ padding: 10 }}
                        onClick={() => this.updateChecked(3)}
                        isChecked={this.state.isCheckedSaleOff}
                      />
                    </Block>
                  </Block>
                  <Block style={{ width: width * 0.7 }}>
                    <Block middle left style={{ height: 40 }}>
                      {this.state.isCheckedPercent === true ? (
                        <Text color="green" size={16}>
                          Giảm giá theo %
                        </Text>
                      ) : (
                          <Text size={16}>Giảm giá theo %</Text>
                        )}
                    </Block>
                    <Block middle left style={{ height: 40 }}>
                      {this.state.isCheckedSame === true ? (
                        <Text size={16} color="green">
                          Đồng giá dịch vụ
                        </Text>
                      ) : (
                          <Text size={16}>Đồng giá dịch vụ</Text>
                        )}
                    </Block>
                    <Block middle left style={{ height: 40 }}>
                      {this.state.isCheckedSaleOff === true ? (
                        <Text size={16} color="green">
                          Giảm giá dịch vụ
                        </Text>
                      ) : (
                          <Text size={16}>Giảm giá dịch vụ</Text>
                        )}
                    </Block>
                  </Block>
                </Block>
                <Block
                  center
                  style={{
                    height: 120,
                    width: width * 0.9,
                    borderRadius: 5,
                    borderWidth: 0.5,
                    borderColor: "green",
                    marginTop: 10
                  }}
                >
                  <Block left style={{ marginTop: -8.5 }}>
                    <Text
                      size={15}
                      color="green"
                      style={{
                        marginLeft: 10,
                        marginBottom: 25,
                        backgroundColor: "white"
                      }}
                    >
                      Chọn dịch vụ áp dụng
                    </Text>
                  </Block>
                  <Block row center style={{ width: width * 0.9 }}>
                    <Block style={{ width: width * 0.2 }}>
                      <Block middle style={{ height: 40 }}>
                        <CheckBox
                          style={{ padding: 10 }}
                          onClick={() => this.updateChecked(2)}
                          isChecked={this.state.isCheckedSame}
                        />
                      </Block>
                      <Block middle style={{ height: 40 }}>
                        <CheckBox
                          style={{ padding: 10 }}
                          onClick={() => this.updateChecked(3)}
                          isChecked={this.state.isCheckedSaleOff}
                        />
                      </Block>
                    </Block>
                    <Block style={{ width: width * 0.7 }}>
                      <Block middle left style={{ height: 40 }}>
                        {this.state.isCheckedSame === true ? (
                          <Text size={16} color="green">
                            Gội đầu{" "}
                          </Text>
                        ) : (
                            <Text size={16}>Gội đầu</Text>
                          )}
                      </Block>
                      <Block middle left style={{ height: 40 }}>
                        {this.state.isCheckedSaleOff === true ? (
                          <Text size={16} color="green">
                            Cắt tóc
                          </Text>
                        ) : (
                            <Text size={16}>Cắt tóc</Text>
                          )}
                      </Block>
                    </Block>
                  </Block>
                </Block>
                <Block
                  row
                  center
                  style={{
                    width: width * 0.9,
                    marginTop: 10,
                    borderColor: "green",
                    borderRadius: 5,
                    borderWidth: 0.5,
                    height: 60
                  }}
                >
                  <Block
                    left
                    center
                    style={{ width: width * 0.3, marginLeft: width * 0.06 }}
                  >
                    <Text size={16}>Khuyến mãi: </Text>
                  </Block>
                  <Block left style={{ width: width * 0.5 }}>
                    <Input
                      right
                      style={{ width: (width * 3.5) / 7 }}
                      placeholder="Ví dụ: 58%"
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
                    <Text style={{ fontSize: 15 }}>Xác nhận</Text>
                  </Button>
                </Block>
              </Block>
            ) : (
                <>
                  <Block
                    center
                    style={{ width: width, height: 30, marginTop: 15 }}
                  >
                    <Text>Danh sách các khuyến mãi</Text>
                  </Block>
                  {this.state.data.length > 0 ? (
                    <FlatList
                      items={elements}
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
  BlockStyle: {
    width: width * 0.95
  },
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

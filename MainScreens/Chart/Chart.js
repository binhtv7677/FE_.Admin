import React, { Component, useState, useEffect } from "react";
import {
    StyleSheet,
    Dimensions,
    FlatList,
    ScrollView
} from "react-native";
import { Block, Button, Checkbox, Text, theme, NavBar } from "galio-framework";
import { Images, argonTheme } from "../../constants";
const { width, height } = Dimensions.get("screen");
import CalendarPicker from "react-native-calendar-picker";
import { useNavigation } from "@react-navigation/native";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import moment from "moment";
import { GET_AXIOS } from "../../api/caller";
export default ChartComponent = (route) => {
    const navigation = useNavigation();
    const [startDate, setStartDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [tag, setTag] = useState(0);
    const [priceChart, setDataPrice] = useState({ labels: [], datasets: [{}] });
    const [load, setLoad] = useState(false);
    const [labels, setLabel] = useState([]);
    const [data, setData] = useState({});
    function onDateChange(date, type) {

        if (type === "START_DATE") {
            setStartDate(moment(date).format("YYYY-MM-DD"));
            setTag(0);
        }
        if (type === "END_DATE") {
            setEndDate(moment(date).format("YYYY-MM-DD"));
            setTag(1);
        }
    }
    async function getData() {
        if (tag === 1) {
            await GET_AXIOS("http://45.119.83.107:9002/api/Chart/SalePrice?fromDate=" + startDate + "&toDate=" + endDate).then(res => {
                var chartDta = res.data;
                var labelsDta = [];
                var dataSet = [];
                chartDta.map(item => {
                    labelsDta.push(moment(item.Date).format("DD-MM"));
                    dataSet.push(item.SalePrice / 1000);
                });
                setData(dataSet);
                setLabel(labelsDta);
                setLoad(true);
            })
        } else {
            alert("Chọn ngày bắt đầu và kết thúc");
        }
    }
    return (
        <ScrollView>
            <Block center style={{ ...styles.registerContainer, flex: 1 }}>
                {load === true ?
                    <>
                        <Text> Thống kê doanh thu </Text>
                        <LineChart
                            data={{
                                labels: labels,
                                datasets: [
                                    {
                                        data: data
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width} // from react-native
                            height={220}
                            yAxisLabel="$"
                            yAxisSuffix="k"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#e26a00",
                                backgroundGradientFrom: "#fb8c00",
                                backgroundGradientTo: "#ffa726",
                                decimalPlaces: 0, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 4,
                                    width: width * 0.4
                                },
                                propsForDots: {
                                    r: "3",
                                    strokeWidth: "2",
                                    stroke: "#ffa726"
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 4
                            }}
                        />
                    </> : <></>}
                <CalendarPicker
                    startFromMonday={true}
                    allowRangeSelection={true}
                    todayBackgroundColor="#f2e6ff"
                    selectedDayColor="#7300e6"
                    selectedDayTextColor="#FFFFFF"
                    onDateChange={(date, type) => onDateChange(date, type)}
                />
                <Button
                    style={{ ...styles.button, marginBottom: 5 }}
                    color={argonTheme.COLORS.SUCCESS}
                    onPress={() => { getData() }}
                    textStyle={{ color: argonTheme.COLORS.WHITE }}
                >
                    Xem thông tin
              </Button>
            </Block>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    registerContainer: {
        width: width,
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
        opacity: 1
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
    }
});

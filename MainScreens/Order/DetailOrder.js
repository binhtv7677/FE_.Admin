import React, { useState, useContext, useEffect, } from "react";
import { StyleSheet, Dimensions, View, Image, Alert, } from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
const { width, height } = Dimensions.get("screen");
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { AntDesign, } from "@expo/vector-icons"; // 6.2.2
import { GET_AXIOS, PUT_AXIOS } from "../../api/caller";
import { GET_ORDER_DETAIL, SUBMIT_ORDER, REFUSE_ORDER, DONE_ORDER } from "../../api/endpoint";
import { gobalStateContext } from "../../App";
import argonTheme from "../../constants/Theme";

export default DetailOrder = ({ route, navigation }) => {
    const [checkOrder, setChecked] = useState(route.params.checkOrder);
    const state = useContext(gobalStateContext);
    const [data, setData] = useState({});
    const [user, setUser] = useState(state.gobalState.user);
    const [orderId, setId] = useState();
    const [mainIMG, setIMG] = useState("")
    const [load, setLoad] = useState(false)
    useEffect(() => {
        GET_AXIOS(GET_ORDER_DETAIL + route.params.OrderId).then(res => {
            setData(res.data);
        })
        setId(route.params.OrderId);
    }, [])
    navigation.setOptions({
        headerLeft: () => (
            <>
                <Block
                    row
                    center
                    style={{
                        width: width / 2,
                        height: 80
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            handleLeftPress();
                        }}
                    >
                        <Block
                            style={{
                                width: width * 0.12
                            }}
                        >
                            <AntDesign
                                name="left"
                                style={{ marginLeft: width * 0.004 }}
                                size={27}
                                color="#e8582d"
                            ></AntDesign>
                        </Block>
                    </TouchableOpacity>
                </Block>
            </>
        ),
        headerTitle: props => <Text size={20}>Giỏ Hàng</Text>,
        headerRight: () => (
            <>
                {checkOrder === "confirmed" ? <Block center>
                    <Button
                        style={{
                            opacity: 1,
                            color: "#e8866c",
                            width: width / 2.5,
                            marginBottom: 0,
                            shadowRadius: 0,
                            shadowOpacity: 0,
                            marginBottom: 10
                        }}
                        color={argonTheme.COLORS.WARNING}
                        onPress={() => {

                        }}
                        textStyle={{ color: argonTheme.COLORS.WHITE }}
                    >
                        Đơn hàng đang giao
                    </Button>
                </Block> : <></>}
            </>
        )
    });
    function handleLeftPress() {
        return navigation.goBack();
    }
    function numberWithCommas(item) {
        var x = item.Quantity * item.Price;
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function renderItem(item) {
        var url = "http://45.119.83.107:9002/api/Product/Images?fileName=" + item.ProductMainImage;
        return (
            <Block
                row
                key={item.Id}
                style={{
                    width: width,
                    height: 150,
                    backgroundColor: "white",
                    marginTop: 5,
                    marginBottom: 5
                }}
            >
                <Block center style={{ width: width * 0.15 }}>
                </Block>
                <Block row style={{ width: width * 0.85 }}>
                    <Block center style={{ width: width * 0.35 }}>
                        {load ?
                            <Image
                                source={{ uri: url }}
                                style={{ width: width * 0.35, height: 150 }}
                            />
                            : <>
                                <Image
                                    onLoad={() => setLoad(true)}
                                    source={{ uri: url }}
                                    style={{ width: width * 0.35, height: 150 }}
                                />
                                <Text>{url}</Text>
                            </>}
                    </Block>
                    <Block
                        style={{
                            marginLeft: 10
                        }}
                    >
                        <Text
                            style={{
                                marginTop: 10,
                                height: 40,
                                width: width * 0.45
                            }}
                            size={14}
                        >
                            {item.ProductName}
                        </Text>
                        <Text
                            style={{
                                marginTop: 10,
                                width: width * 0.5,
                                color: "red"
                            }}
                            size={17}
                        >
                            <Text size={15}>đ</Text> {numberWithCommas(item)}
                        </Text>
                        <Text
                            style={{
                                marginTop: 10,
                                width: width * 0.5,
                            }}
                            size={17}
                        >
                            <Text size={15}>Số lượng:</Text> {item.Quantity}
                        </Text>
                    </Block>
                </Block>
            </Block>
        );
    }
    async function submitOrder() {
        await PUT_AXIOS(SUBMIT_ORDER + orderId).then(res => {
            sendNotifi(data.Device_Id, "Đơn hàng của bạn đang được chuyển đi");
            setChecked("confirmed");
        })
    }
    async function refuseOrder() {
        await PUT_AXIOS(REFUSE_ORDER + orderId).then(res => {
            setChecked("refuse");
        })
    }
    async function completeOrder() {
        await PUT_AXIOS(DONE_ORDER + orderId).then(res => {
            sendNotifi(data.Device_Id, "Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi");
            setChecked("done");
        })
    }
    async function sendNotifi(Device_Id, value) {
        console.log("send");
        let response = fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                to: Device_Id,
                sound: 'default',
                title: 'Thông  báo',
                body: value,
                data: { data: value }
            })
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#eef0f2" }}>
            <FlatList
                data={data.CartVMs}
                keyExtractor={item => item.Id}
                renderItem={item => {
                    return renderItem(item.item);
                }}
            />
            <Block
                style={{ width: width, height: 10, backgroundColor: "#eef0f2" }}
            ></Block>
            <Block
                style={{
                    width: width,
                    height: 150,
                    backgroundColor: "white",
                    borderBottomWidth: 0.2
                }}
            >
                <Block style={{ marginLeft: width / 5 }}>
                    <Text size={17}>Tổng tiền : {data.Price}</Text>
                    <Text size={17}> Địa chỉ :{data.Address}</Text>
                    <Text size={17}> Người nhận  :{data.FullName}</Text>
                </Block>
                <Block center style={{ marginTop: 10, ...styles.button }}>
                    {checkOrder === "processing" ? <Button
                        style={{ ...styles.button }}
                        color={argonTheme.COLORS.SUCCESS}
                        onPress={() => {
                            Alert.alert(
                                "Thông Báo",
                                "Xác nhận chuyển giao đơn hàng",
                                [
                                    {
                                        text: "Xác nhận",
                                        onPress: () => submitOrder(),
                                        style: "cancel"
                                    },
                                    {
                                        text: "Huỷ",
                                        style: "cancel"
                                    }
                                ],
                                { cancelable: false }
                            );
                        }}
                        textStyle={{ color: argonTheme.COLORS.WHITE }}
                    >
                        Xác nhận đơn hàng và chuyển giao
                    </Button> : <></>}
                    {checkOrder === "confirmed" ? <Block row>
                        <Button
                            style={{ ...styles.button, width: width / 3, marginRight: 20 }}
                            color={argonTheme.COLORS.WARNING}
                            onPress={() => {
                                refuseOrder();
                            }}
                            color={argonTheme.COLORS.ERROR}
                            textStyle={{ color: argonTheme.COLORS.WHITE }}
                        >
                            Đơn bị huỷ
                             </Button>
                        <Button
                            style={{
                                height: theme.SIZES.BASE * 3,
                                shadowRadius: 0,
                                shadowOpacity: 0,
                                marginTop: 15,
                                opacity: 1,
                                marginBottom: 15,
                                width: width / 3
                            }}
                            color={argonTheme.COLORS.SUCCESS}
                            onPress={() => {
                                completeOrder();
                            }}
                            textStyle={{ color: argonTheme.COLORS.WHITE }}
                        >
                            Giao thành công
                             </Button>
                    </Block> : <></>}
                    {checkOrder === "done" ? <Block row>
                        <Button
                            style={{
                                height: theme.SIZES.BASE * 3,
                                shadowRadius: 0,
                                shadowOpacity: 0,
                                marginTop: 15,
                                opacity: 1,
                                marginBottom: 15,
                                width: width / 2
                            }}
                            color={argonTheme.COLORS.SUCCESS}
                            textStyle={{ color: argonTheme.COLORS.WHITE }}
                            onPress={() => {
                                sendNotifi("ExponentPushToken[oqL_KiEQ330W9EecdgAaUG]", "hello");
                            }}
                        >
                            Đơn hàng đã hoàn thành
                             </Button>
                    </Block> : <></>}
                    {checkOrder === "refuse" ? <Block row>
                        <Button
                            style={{
                                height: theme.SIZES.BASE * 3,
                                shadowRadius: 0,
                                shadowOpacity: 0,
                                marginTop: 15,
                                opacity: 1,
                                marginBottom: 15,
                                width: width / 3
                            }}
                            color={argonTheme.COLORS.ERROR}
                            textStyle={{ color: argonTheme.COLORS.WHITE }}
                        >
                            Đơn hàng đã huỷ
                             </Button>
                    </Block> : <></>}
                </Block>
            </Block>
        </View >
    );
};
const styles = StyleSheet.create({
    button: {
        width: width - theme.SIZES.BASE * 4,
        height: theme.SIZES.BASE * 3,
        shadowRadius: 0,
        shadowOpacity: 0,
        marginTop: 15,
        opacity: 1,
        marginBottom: 15,
        color: "#e8866c"
    },
    productTitle: {
        flex: 1,
        flexWrap: "wrap",
        paddingBottom: 6
    },
    image: {
        borderRadius: 3,
        marginHorizontal: theme.SIZES.BASE / 2,
        marginTop: -16
    },
    horizontalImage: {
        height: 122,
        width: "auto"
    },
    fullImage: {
        height: 215,
        width: width - theme.SIZES.BASE * 3
    }
});

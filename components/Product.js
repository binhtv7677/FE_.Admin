import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons"; // 6.2.2
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("screen");
export default Product = props => {
  const navigation = useNavigation();
  const [loaded, setLoad] = useState(false);

  const {
    product,
    horizontal,
    full,
    style,
    priceColor,
    imageStyle,
    type,
    order
  } = props;
  const imageStyles = [
    styles.image,
    full ? styles.fullImage : styles.horizontalImage,
    imageStyle
  ];
  var url = "http://45.119.83.107:9002/api/Product/Images?fileName=" + product.MainImage;
  return (

    <>
      {
        order === true ? <Block
          row={horizontal}
          card
          flex
          style={[styles.product, styles.shadow, style]}
        >
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate("DetailOrder", { checkOrder: product.Status, OrderId: product.Id })
            }
          >
            <Block flex style={[styles.imageContainer, styles.shadow]} style={{ marginTop: 5 }}>
              <Text>Tên người nhận</Text>
              <Text style={{ marginLeft: 5 }}> - {product.FullName}</Text>
              <Text>Số điện thoại</Text>
              <Text style={{ marginLeft: 5 }}> - {product.PhoneNumber}</Text>
              <Text>Địa chỉ</Text>
              <Text style={{ marginLeft: 5 }}> - {product.Address}</Text>
            </Block>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate("DetailOrder", { checkOrder: product.Status, OrderId: product.Id })
            }
          >
            <Block center flex space="between" style={styles.productDescription}>
              <Text size={14} style={styles.productTitle}>
                Trạng thái đơn hàng
              </Text>
              {product.Status === "processing" ?
                <Text size={20} style={{ ...styles.productTitle, color: "green" }}>{product.Status}</Text>
                : <></>}
              {product.Status === "confirmed" ?
                <Text size={20} style={{ ...styles.productTitle, color: "red" }}>{product.Status}</Text>
                : <></>}
              {product.Status === "done" ?
                <Text size={20} style={{ ...styles.productTitle, color: "green" }}>{product.Status}</Text>
                : <></>}
              {product.Status === "refuse" ?
                <Text size={20} style={{ ...styles.productTitle, color: "red" }}>{product.Status}</Text>
                : <></>}
              <Text size={12} muted={!priceColor} color={priceColor}>
                Tổng tiền :  ${product.Price}
              </Text>
            </Block>
          </TouchableWithoutFeedback>
        </Block> :

          <Block
            row={horizontal}
            card
            flex
            style={[styles.product, styles.shadow, style]}
          >
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("UpdateCategories", { product: product })
              }
            >
              <Block flex style={[styles.imageContainer, styles.shadow]}>
                {loaded ? <>
                  <Image source={{ uri: url }} style={imageStyles} />
                </> :
                  <>
                    <Image source={{ uri: url }} style={imageStyles}
                      onLoad={() => { setLoad(true) }} />
                  </>
                }
              </Block>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("UpdateCategories", { product: product })
              }
            >
              <Block flex space="between" style={styles.productDescription}>
                <Block style={styles.productTitle}>
                  <Text size={14} style={{ width: width / 2 }}>
                    Tên sản phẩm: {product.Name}
                  </Text>
                </Block>

                <Block row style={{ width: 25 }}>
                  <AntDesign
                    name="heart"
                    size={18}
                    color="pink"
                    style={{ marginRight: 5 }}
                  ></AntDesign>
                  <Text>{product.NumberOfLike}</Text>
                </Block>
                <Text size={12} muted={!priceColor} color={priceColor}>
                  ${product.Price}
                </Text>
              </Block>
            </TouchableWithoutFeedback>
          </Block>
      }
    </>


  );
};

const styles = StyleSheet.create({
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114
  },
  productTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    elevation: 1
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
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2
  }
});


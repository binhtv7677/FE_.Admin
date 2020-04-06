// import * as React from "react";
// import { Button, View } from "react-native";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { NavigationContainer } from "@react-navigation/native";

// export default Drawerable = () => {
//   return <></>;
// };

import React, { useContext } from "react";
import { StyleSheet, Dimensions, FlatList, Animated } from "react-native";
import { Block, theme } from "galio-framework";
import * as axios from "axios";

const { width } = Dimensions.get("screen");
import argonTheme from "../constants/Theme";
import gobalStateContext from "../App";
const defaultMenu = [
  { id: "popular", title: "Popular", navigation: "Categories" },
  { id: "beauty", title: "Beauty", navigation: "" },
  { id: "cars", title: "Cars", navigation: "" },
  { id: "motocycles", title: "Motocycles", navigation: "" }
];

export default class Drawerable extends React.Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    data: defaultMenu,
    initialIndex: null
  };

  state = {
    active: null,
    value: this.props.value
  };

  componentDidMount() {
    const { initialIndex } = this.props;
    initialIndex && this.selectMenu(initialIndex);
  }

  animatedValue = new Animated.Value(1);

  animate() {
    this.animatedValue.setValue(0);

    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 300
      // useNativeDriver: true, // color not supported
    }).start();
  }

  menuRef = React.createRef();

  onScrollToIndexFailed = () => {
    this.menuRef.current.scrollToIndex({
      index: 0,
      viewPosition: 0.5
    });
  };

  selectMenu(item) {
    var id = item.id;
    this.setState({ active: id });
    this.menuRef.current.scrollToIndex({
      index: this.props.data.findIndex(item => item.id === id),
      viewPosition: 0.5
    });
    this.animate();
    console.log(this.props);
    this.props.navigation.navigate(item.navigation);
    this.props.onChange && this.props.onChange(id);
  }

  renderItem = item => {
    const isActive = this.state.active === item.id;

    const textColor = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        argonTheme.COLORS.BLACK,
        isActive ? argonTheme.COLORS.WHITE : argonTheme.COLORS.BLACK
      ],
      extrapolate: "clamp"
    });

    const containerStyles = [
      styles.titleContainer,
      !isActive && { backgroundColor: argonTheme.COLORS.WHITE },
      isActive && styles.containerShadow
    ];

    return (
      <Block style={containerStyles}>
        <Animated.Text
          size={17}
          style={[styles.menuTitle, { color: textColor }]}
          onPress={() => {
            // if (this.props.editable) {
              this.selectMenu(item);
            // }
          }}
        >
          {item.title}
        </Animated.Text>
      </Block>
    );
  };

  renderMenu = () => {
    const { data, value, ...props } = this.props;

    return (
      <FlatList
        {...props}
        data={data}
        // horizontal={true}
        ref={this.menuRef}
        extraData={this.state}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        onScrollToIndexFailed={this.onScrollToIndexFailed}
        renderItem={({ item }) => this.renderItem(item)}
        contentContainerStyle={styles.menu}
      />
    );
  };

  render() {
    return <Block style={styles.container}>{this.renderMenu()}</Block>;
  }
}

const styles = StyleSheet.create({
  container: {
    width: width / 2,
    backgroundColor: theme.COLORS.WHITE,
    zIndex: 2
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4
  },
  menu: {
    // paddingHorizontal: theme.SIZES.BASE * 2.5,
    paddingTop: 8
    // paddingBottom: 16
  },
  titleContainer: {
    alignItems: "center",
    backgroundColor: argonTheme.COLORS.ACTIVE,
    borderRadius: 4,
    marginRight: 9
  },
  containerShadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 1
  },
  menuTitle: {
    fontWeight: "600",
    fontSize: 17,
    // lineHeight: 28,
    paddingVertical: 10,
    paddingHorizontal: 16,
    color: argonTheme.COLORS.MUTED
  }
});

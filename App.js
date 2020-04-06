import Navigate from "./navigation/Routers";
import React, { useContext, useState, useReducer, useEffect } from "react";
export const gobalStateContext = React.createContext();
import { reducer } from "./reducer/reducer";
import Login from "./MainScreens/Login";
import firebase from "firebase";
import { firebaseConfig } from "./config";
import registerForPushNotificationsAsync from "./navigation/notification";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import { AsyncStorage, Alert } from "react-native";
firebase.initializeApp(firebaseConfig);
function App() {
  initState = {
    cart: [],
    statusId: ""
  };

  const [noti, setNoti] = useState({});
  const [gobalState, dispatch] = useReducer(reducer, initState);
  useEffect(() => {
    async function getToken() {
      var token = await registerForPushNotificationsAsync();
      AsyncStorage.setItem("device_id", token);
    }
    getToken();
    callNoti();
  });

  function callNoti() {
    var noti = Notifications.addListener(_catchNoti);
  }
  function _catchNoti(noti) {
    Alert.alert(
      "Thông báo",
      "Bạn có đơn hàng mới",
      [
        {
          text: "Xác nhận",
          onPress: () => {
            console.log("");
          }
        }
      ],
      { cancelable: false }
    )
  }
  console.disableYellowBox = true;
  return (
    <gobalStateContext.Provider
      value={{ gobalState: gobalState, dispatch: dispatch }}
    >
      <Navigate />
    </gobalStateContext.Provider>
  );
}

export default App;

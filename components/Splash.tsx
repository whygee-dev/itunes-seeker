import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Dispatch } from "../redux/store";
import { useDispatch } from "react-redux";

const Splash = ({ children }: { children?: any }) => {
  const [appIsReady, setAppIsReady] = useState(false);

  const startAsync = async () => {
    await Font.loadAsync({ "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf") });
  };

  if (!appIsReady) {
    return <AppLoading startAsync={startAsync} onFinish={() => setAppIsReady(true)} onError={console.warn} />;
  }

  return <>{children}</>;
};

export default Splash;

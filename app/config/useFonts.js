import * as Font from "expo-font";

export default useFonts = async () =>
  await Font.loadAsync({
    light: require("../assets/fonts/Ubuntu-Light.ttf"),
    medium: require("../assets/fonts/Ubuntu-Medium.ttf"),
    regular: require("../assets/fonts/Ubuntu-Regular.ttf"),
    bold: require("../assets/fonts/Ubuntu-Bold.ttf"),
  });

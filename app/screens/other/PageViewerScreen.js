import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ScreenComponent from "../../components/ScreenComponent";
import colors from "../../config/colors";
import PagerView from "react-native-pager-view";
import { Image } from "expo-image";

export default function PageViewerScreen() {
  const data = [
    {
      id: 0,
      title: "Samsung Galaxy Watch 6",
      des: "This is time that younger sibling of the one mentioned above.",
      imge: "http://t0.gstatic.com/images?q=tbn:ANd9GcTQTVrRqnTCvbGR4Hh-zEun4tvyY4MMEbpCTSsPcyUgficNhi0g",
    },
    {
      id: 1,
      title: "Apple Watch SE",
      des: "If you know you want a new Apple Watch, the Watch SE is the one to get: it has all of the helpful features of the Watch 6.",
      imge: "https://blog-cdn.el.olx.com.pk/wp-content/uploads/2023/01/18182458/Apple-Watch-Series-8-3-1024x576.jpg",
    },
    {
      id: 2,
      title: "Google Pixel Watch 2",
      des: "Googles second-generation Pixel Watch 2, designed in collaboration with Fitbit. Fitbits most advanced heart rate tracking.",
      imge: "https://www.zdnet.com/a/img/resize/e8cc732a5ed1f292f4942160acc44f157c3284d6/2023/10/10/4b9521ed-9c04-4c62-a92e-b03ee1503dc8/google-pixel-watch-2.jpg?auto=webp&fit=crop&height=360&width=640",
    },
  ];

  const RenderPages = ({ ele, index }) => {
    return (
      <View key={index} style={styles.page}>
        <Text style={styles.heading}>{ele?.title}</Text>
        <Image source={{ uri: ele?.imge }} style={styles.img} />
        <View style={{ flex: 0.9, justifyContent: "flex-end" }}>
          <Text style={styles.des}>{ele?.des}</Text>
        </View>
      </View>
    );
  };
  return (
    <>
      <ScreenComponent style={{ backgroundColor: colors.off_White }}>
        <View style={styles.container}>
          <PagerView
            style={styles.container}
            initialPage={0}
            orientation={"horizontal"}
          >
            {data.map((ele, index) => {
              return <RenderPages ele={ele} index={index} key={index} />;
            })}
          </PagerView>
        </View>
      </ScreenComponent>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.black,
  },
  img: {
    width: 260,
    height: 260,
    alignSelf: "center",
    marginTop: 30,
    borderRadius: 260 / 2,
    borderWidth: 1,
    borderColor: colors.bottom_Tab_Gray,
  },
  des: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.gray_dark,
  },
});

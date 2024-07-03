import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import TextInputComponent from "../components/TextInputComponent";
import ScreenComponent from "../components/ScreenComponent";
import TopHomeScreenCompo from "../components/TopHomeScreenCompo";
import colors from "../config/colors";
import { getResponsiveHeight } from "../styles/getResponsive";
import { useNavigation } from "@react-navigation/native";
import navigationStrings from "../navigation/navigationStrings";
import { auth, db as firestore } from "../config/firebaseConfig";
import ShowClientsProfileCompo from "../components/ShowClientsProfileCompo";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [clientsData, setClientsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const currentUserUid = auth?.currentUser?.uid;

  const searchClient = async () => {
    try {
      const filtered = filteredData.filter((user) => {
        return user.fullName.toLowerCase().includes(searchText.toLowerCase());
      });
      setClientsData(filtered);
    } catch (error) {
      console.log("Error in while Searching client in Home Screen: ", error);
    }
  };

  useEffect(() => {
    if (searchText !== "") {
      searchClient();
    } else {
      setClientsData(filteredData);
    }
  }, [searchText]);

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(firestore, "clientProfiles"),
      orderBy("time", "desc"),
      where("userUid", "==", currentUserUid)
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      if (snap?.size > 0) {
        const allClientsData = snap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setClientsData(allClientsData);
        setFilteredData(allClientsData);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUserUid]);

  return (
    <ScreenComponent>
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => Keyboard.dismiss()}
      >
        <View style={styles.container}>
          <TopHomeScreenCompo
            onPressLeft={() => navigation.openDrawer()}
            style={{ paddingHorizontal: 0 }}
          />
          <TextInputComponent
            leftIcon={require("../assets/search.png")}
            inputStyle={styles.textInputStyle}
            placeholder="Search here.."
            value={searchText}
            onChangeText={(text) => {
              if (text.trim().length) {
                setSearchText(text);
              } else {
                setSearchText("");
              }
            }}
            clearIcon={searchText.length > 0 ? "Clear" : ""}
            onPressClear={() => {
              setSearchText("");
              searchClient(filteredData);
            }}
          />
          <TouchableOpacity
            style={styles.plusIconContainer}
            onPress={() =>
              navigation.navigate(navigationStrings.CreateClientScreen)
            }
          >
            <Image
              source={require("../assets/plus.png")}
              style={styles.plusIcon}
            />
            <Text style={styles.txt}>Add new client</Text>
          </TouchableOpacity>
          {clientsData?.length > 0 && (
            <Text style={styles.heading}>Client profiles</Text>
          )}
          {loading && (
            <ActivityIndicator size={"large"} color={colors.primary} />
          )}
          <View style={{ flex: 1 }}>
            <FlatList
              data={clientsData}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <ShowClientsProfileCompo data={item} />}
              numColumns={3}
              ListFooterComponent={<View style={{ marginVertical: 30 }} />}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    marginTop: Platform.OS === "android" ? 6 : 0,
  },
  textInputStyle: {
    backgroundColor: colors.gray_light,
    marginVertical: 16,
  },
  plusIcon: {
    width: 28,
    height: 28,
  },
  plusIconContainer: {
    height: getResponsiveHeight(16),
    backgroundColor: colors.gray_light,
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 6,
  },
  txt: {
    color: colors.gray_dark,
    marginTop: 8,
    fontSize: 14,
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.black,
    marginVertical: 10,
  },
});

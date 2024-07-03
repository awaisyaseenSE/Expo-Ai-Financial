import "react-native-gesture-handler";
import React, { useCallback, useEffect, useState } from "react";
import { auth } from "./app/config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import SplashScreen from "./app/screens/SplashScreen";
import AuthsContext from "./app/auth/AuthsContext";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import useFonts from "./app/config/useFonts";
import * as MySplashScreen from "expo-splash-screen";
import { View } from "react-native";

MySplashScreen.preventAutoHideAsync();

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setTimeout(() => {
          setSplashDone(true);
        }, 1000);
      } else {
        setUser(null);
        setTimeout(() => {
          setSplashDone(true);
        }, 1000);
      }
    });
    return () => unsubscribe();
  }, []);

  const [isReady, setIsReady] = useState(false);

  const loadFonts = async () => {
    await useFonts();
  };

  useEffect(() => {
    const prepare = async () => {
      try {
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        await MySplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await MySplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        {splashDone ? (
          <AuthsContext.Provider value={{ user, setUser }}>
            <NavigationContainer>
              {user !== null ? <AppNavigator /> : <AuthNavigator />}
            </NavigationContainer>
          </AuthsContext.Provider>
        ) : (
          <SplashScreen />
        )}
      </View>
    </>
  );
}

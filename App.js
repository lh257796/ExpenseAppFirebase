import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";

import * as Notifications from "expo-notifications";
import { Button } from "react-native";
import { useEffect } from "react";

// async function requestPermissionsAsync() {
//   return await Notifications.requestPermissionsAsync({
//     ios: {
//       allowAlert: true,
//       allowBadge: true,
//       allowSound: true,
//       allowAnnouncements: true,
//     },
//   });
// }

// Notifications.setNotificationHandler({
//   //expects a promise; handleNotif is necessary
//   handleNotification: async () => {
//     return {
//       shouldPlaySound: false,
//       shouldSetBadge: true,
//       shouldShowAlert: true,
//     };
//   },
// });

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

//expensesoverview is a nested navigator
const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpense");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent", //this is what shows
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses", //this is what shows
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default function App() {
  // useEffect(() => {
  //   requestPermissionsAsync();
  //   const subscription = Notifications.addNotificationReceivedListener(
  //     (notification) => {
  //       console.log("NOTIFICATION RECEIVED");
  //       console.log(notification);
  //     }
  //   );

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  // useEffect(() => {
  //   requestPermissionsAsync();
  //   async function getTokenAsync() {
  //     let result = await Notifications.getExpoPushTokenAsync();
  //     console.log(result);
  //   }

  //   getTokenAsync();
  // }, []);

  // function scheduleNotificationHandler() {
  //   Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "HEY HEY YOU YOU",
  //       body: "i dont like your notifications",
  //       data: { userName: "han" },
  //     },
  //     trigger: {
  //       seconds: 1,
  //     },
  //   });
  // }

  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
      {/* <Button
        title="Schedule notification"
        onPress={scheduleNotificationHandler}
      /> */}
    </>
  );
}

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginTela from "./src/telas/LoginTela";
import PrincipalProfessor from "./src/telas/PrincipalProfessor";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginTela}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PrincipalProfessor"
          component={PrincipalProfessor}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

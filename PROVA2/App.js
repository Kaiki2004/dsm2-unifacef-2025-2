import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import InfoScreen from "./screens/Meuscompromissos";
import AgendaScreen from "./screens/CompromissosEquipe";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Início" }}
        />
        <Stack.Screen
          name="Info"
          component={InfoScreen}
          options={{ title: "Meus compromissos" }}
        />
        <Stack.Screen
          name="Agenda"
          component={AgendaScreen}
          options={{ title: "Compromissos da equipe" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

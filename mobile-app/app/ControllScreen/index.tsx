// mobile-app/app/ControllScreen/index.tsx

import { StyleSheet } from "react-native";
import { Stack } from "expo-router";

import { Text, View } from "@/components/Themed";

// Aqui você importaria e usaria seus componentes de controle
// import AnalogJoystick from '@/components/controls/AnalogJoystick';
// import DirectionalPad from '@/components/controls/DirectionalPad';
// import SteeringWheel from '@/components/controls/SteeringWheel';

export default function ControllScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Controles" }} />
      <Text style={styles.title}>Tela de Controles</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {/* Aqui você renderizaria os seus componentes de controle */}
      {/* <AnalogJoystick /> */}
      {/* <DirectionalPad /> */}
      {/* <SteeringWheel /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

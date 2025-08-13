import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Início",
        }}
      />
      <Stack.Screen
        name="controlScreen"
        options={{
          title: "Controles",
        }}
      />
    </Stack>
  );
}

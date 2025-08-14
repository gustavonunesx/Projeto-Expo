import { StyleSheet, Button, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function InitialScreen() {
  const router = useRouter();
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <FontAwesome5 size={45} name="car-battery" style={styles.iconeInit} />

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subTitle}>Pronto para assumir o controle?</Text>

      <TouchableWithoutFeedback
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={() => router.push("/controlScreen")}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <LinearGradient
            colors={["#00B4DB", "#8A2BE2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.btnGradient}
          >
            <Text style={styles.btnText}>Iniciar</Text>
          </LinearGradient>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

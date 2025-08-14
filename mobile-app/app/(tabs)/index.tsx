import { TouchableOpacity, View, Text } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons"; // ← Aqui muda
import styles from "../../assets/Styles/index";

export default function InitialScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View>
        <FontAwesome5 size={28} name="car-battery" /> {/* ← Agora funciona */}
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>

      <Text style={styles.subTitle}>Pronto para assumir o controle?</Text>

      <TouchableOpacity style={styles.btnInit}>
        <Text>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

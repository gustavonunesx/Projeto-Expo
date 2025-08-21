import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type DpadDirection = "FRENTE" | "TRÁS" | "ESQUERDA" | "DIREITA" | "PARADO";

interface DpadProps {
  onDirectionChange: (direction: DpadDirection) => void;
}

export default function Dpad({ onDirectionChange }: DpadProps) {
  const handlePressIn = (direction: DpadDirection) => {
    onDirectionChange(direction);
  };

  const handlePressOut = () => {
    onDirectionChange("PARADO");
  };

  const { width } = Dimensions.get("window");
  const isMobile = width < 768; // breakpoint simples

  //tamahho do container das setas(redor)
  const containerSize = isMobile ? width * 0.5 : width * 0.25;
  const buttonSize = isMobile ? 70 : 100;
  const iconSize = isMobile ? 20 : 28;
  const titleSize = isMobile ? 24 : 48;

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, { fontSize: titleSize }]}>
        Painel Controle
      </Text>

      <View
        style={[
          styles.dpadContainer,
          { width: containerSize, height: containerSize },
        ]}
      >
        <TouchableOpacity
          style={[styles.dpadButton, styles.up, { width:buttonSize, height: buttonSize }]}
          onPressIn={() => handlePressIn("FRENTE")}
          onPressOut={handlePressOut}
        >
          <FontAwesome name="arrow-up" size={iconSize} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dpadButton, styles.left, { width: buttonSize, height: buttonSize }]}
          onPressIn={() => handlePressIn("ESQUERDA")}
          onPressOut={handlePressOut}
        >
          <FontAwesome name="arrow-left" size={iconSize} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dpadButton, styles.right, { width: buttonSize, height: buttonSize }]}
          onPressIn={() => handlePressIn("DIREITA")}
          onPressOut={handlePressOut}
        >
          <FontAwesome name="arrow-right" size={iconSize} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dpadButton, styles.down, { width: buttonSize, height: buttonSize }]}
          onPressIn={() => handlePressIn("TRÁS")}
          onPressOut={handlePressOut}
        >
          <FontAwesome name="arrow-down" size={iconSize} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d1726", // fundo escuro
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  dpadContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  dpadButton: {
    position: "absolute",
    backgroundColor: "#333642",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  up: {
    top: 0,
  },
  down: {
    bottom: 0,
  },
  left: {
    left: 0,
  },
  right: {
    right: 0,
  },
});

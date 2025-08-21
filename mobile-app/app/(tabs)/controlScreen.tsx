import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import styles from "@/assets/Styles/styleControlScreen";
import AnalogJoystick from "@/components/controls/AnalogJoystick"; // Importando o joystick refatorado

type JoystickType = "analogico" | "volante" | "setas";

interface JoystickState {
  x: number;
  y: number;
  force: number;
  direction: string;
}

// Componente placeholder para outros tipos de controle
const PlaceholderControl = ({ type }: { type: JoystickType }) => (
  <View style={styles.joystickPlaceholder}>
    <Text style={{ color: "white", fontSize: styles.optionText.fontSize }}>
      {type === "volante" ? "Volante e Pedais" : "Controle por Setas"}
    </Text>
  </View>
);

export default function ControlScreen() {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedJoystick, setSelectedJoystick] =
    useState<JoystickType>("analogico");
  const [joystickData, setJoystickData] = useState<JoystickState>({
    x: 0,
    y: 0,
    force: 0,
    direction: "PARADO",
  });

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const handleJoystickMove = useCallback(
    ({ x, y }: { x: number; y: number }) => {
      const MAX_RAW_DISTANCE = 100; // Raio máximo de movimento do joystick
      const scaledX = Math.round((x / MAX_RAW_DISTANCE) * 100);
      const scaledY = Math.round((y / MAX_RAW_DISTANCE) * 100);

      const distance = Math.sqrt(x * x + y * y);
      const force = Math.round((distance / MAX_RAW_DISTANCE) * 100);

      let direction = "PARADO";
      if (force > 10) {
        if (Math.abs(scaledX) > Math.abs(scaledY)) {
          direction = scaledX > 0 ? "DIREITA" : "ESQUERDA";
        } else {
          direction = scaledY > 0 ? "FRENTE" : "TRÁS";
        }
      }

      setJoystickData({
        x: scaledX,
        y: scaledY,
        force: Math.min(force, 100),
        direction: direction,
      });
    },
    []
  );

  const toggleSettings = () => {
    const toValue = showOptions ? 0 : 1;
    setShowOptions(!showOptions); // Toggle state immediately for conditional rendering

    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue,
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const selectJoystick = (type: JoystickType) => {
    setSelectedJoystick(type);
    toggleSettings();
  };

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const renderControl = () => {
    if (selectedJoystick === "analogico") {
      return <AnalogJoystick onMove={handleJoystickMove} />;
    }
    return <PlaceholderControl type={selectedJoystick} />;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.settings}
        onPress={toggleSettings}
        activeOpacity={0.7}
      >
        <Animated.View style={{ transform: [{ rotate: rotateInterpolation }] }}>
          <FontAwesome
            size={styles.title.fontSize! * 0.8}
            name="cog"
            color="#FFF"
          />
        </Animated.View>
      </TouchableOpacity>

      <Text style={styles.title}>Painel de Controle</Text>
      <Text style={styles.subtitle}>Selecione e utilize o controle.</Text>

      <View style={styles.joystickContainer}>{renderControl()}</View>

      <View style={styles.dataBox}>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>EIXO X / Y</Text>
          <Text style={styles.dataValue}>
            ({joystickData.x}, {joystickData.y})
          </Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>FORÇA</Text>
          <Text style={styles.dataValue}>{joystickData.force}%</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>DIREÇÃO</Text>
          <Text style={styles.dataValue}>{joystickData.direction}</Text>
        </View>
      </View>

      {showOptions && (
        <TouchableWithoutFeedback onPress={toggleSettings}>
          <Animated.View
            style={[styles.modalBackground, { opacity: opacityAnim }]}
          >
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.modalContent,
                  { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
                ]}
              >
                <Text style={styles.modalTitle}>
                  Selecione o tipo de controle
                </Text>

                {(["analogico", "volante", "setas"] as JoystickType[]).map(
                  (type) => (
                    <TouchableOpacity
                      key={type}
                      style={styles.optionButton}
                      onPress={() => selectJoystick(type)}
                    >
                      <Text style={styles.optionText}>
                        {type === "analogico"
                          ? "Analógico"
                          : type === "volante"
                          ? "Volante"
                          : "Setas"}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </Animated.View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

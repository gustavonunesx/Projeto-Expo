import { View, Text, TouchableOpacity, Animated, Easing, TouchableWithoutFeedback } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import styles from "@/assets/Styles/styleControlScreen";
import { useState, useRef } from "react";

type JoystickType = 'analogico' | 'volante' | 'setas';

const ResponsiveJoystick = ({ type }: { type: JoystickType }) => {
  return (
    <View style={styles.joystickPlaceholder}>
      <Text style={{ fontSize: styles.optionText.fontSize }}>
        {type === 'analogico' ? 'Joystick Analógico' : 
         type === 'volante' ? 'Volante' : 'Controle por Setas'}
      </Text>
    </View>
  );
};

export default function ControllScreen() {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedJoystick, setSelectedJoystick] = useState<JoystickType>('analogico');

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const toggleSettings = () => {
    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue: showOptions ? 0 : 1,
        duration: 600,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: showOptions ? 0 : 1,
        duration: 300,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: showOptions ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => setShowOptions(!showOptions));
  };

  const selectJoystick = (type: JoystickType) => {
    setSelectedJoystick(type);
    toggleSettings();
  };

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.settings} 
        onPress={toggleSettings}
        activeOpacity={0.7}
      >
        <Animated.View style={{ transform: [{ rotate: rotateInterpolation }] }}>
          <FontAwesome 
            size={styles.title.fontSize} 
            name="gear" 
            color="#333" 
          />
        </Animated.View>
      </TouchableOpacity>
      
      <Text style={styles.title}>Controle Joystick</Text>
      <Text style={styles.subtitle}>Arraste o círculo para controlar</Text>

      <View style={styles.joystickContainer}>
        <ResponsiveJoystick type={selectedJoystick} />
      </View>

      {showOptions && (
        <TouchableWithoutFeedback onPress={toggleSettings}>
          <Animated.View style={[
            styles.modalBackground,
            { opacity: opacityAnim }
          ]}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <Animated.View style={[
                styles.modalContent,
                { 
                  transform: [{ scale: scaleAnim }],
                  opacity: opacityAnim
                }
              ]}>
                <Text style={styles.modalTitle}>Selecione o tipo de controle</Text>
                
                {(['analogico', 'volante', 'setas'] as JoystickType[]).map((type) => (
                  <TouchableOpacity 
                    key={type}
                    style={styles.optionButton}
                    onPress={() => selectJoystick(type)}
                  >
                    <Text style={styles.optionText}>
                      {type === 'analogico' ? 'Analógico' : 
                       type === 'volante' ? 'Volante' : 'Setas'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </Animated.View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

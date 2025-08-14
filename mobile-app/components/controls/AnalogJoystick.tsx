// JoystickScreen.tsx - Código completo do joystick e da tela em um único arquivo

// --- Bloco 1: Importações ---
// Importações necessárias para o React, React Native e as bibliotecas de gestos e animações
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

// --- Bloco 2: Constantes e Tipagens ---
// Define as dimensões do joystick para facilitar a manutenção
const JOYSTICK_SIZE = 200;
const JOYSTICK_KNOB_SIZE = 80;
const JOYSTICK_RADIUS = JOYSTICK_SIZE / 2;
const KNOB_RADIUS = JOYSTICK_KNOB_SIZE / 2;
const MAX_DISTANCE = JOYSTICK_RADIUS - KNOB_RADIUS;

// Define a estrutura do estado que irá armazenar os dados do joystick exibidos na tela
interface JoystickState {
  x: number;
  y: number;
  force: number;
  direction: string;
}

// --- Bloco 3: Componente Principal (Joystick e Tela) ---
// Este componente é a tela completa que renderiza o joystick e a caixa de dados
export default function JoystickScreen() {
  // --- A partir daqui, começa a "segunda parte" da lógica, que é a da tela que usa o joystick ---

  // O `useState` gerencia o estado da tela, armazenando os dados do joystick para exibi-los
  const [data, setData] = useState<JoystickState>({
    x: 0,
    y: 0,
    force: 0,
    direction: 'PARADO',
  });

  // A função de callback que será chamada pelo gesto de arrastar do joystick
  // Ela recebe as coordenadas brutas (x, y) e as processa para atualizar o estado da tela
  const handleJoystickMove = ({ x, y }: { x: number; y: number }) => {
    // Escala as coordenadas de pixel (x, y) para um intervalo de -100 a 100
    // O valor 60 é o raio máximo de movimento do manípulo (MAX_DISTANCE)
    const scaledX = Math.round((x / 60) * 100);
    const scaledY = Math.round((y / 60) * 100);

    // Calcula a "força" do movimento com base na distância do manípulo ao centro
    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = 60;
    const force = Math.round((distance / maxDistance) * 100);

    // Determina a direção principal do movimento (FRENTE, TRÁS, ESQUERDA, DIREITA)
    let direction = 'PARADO';
    if (force > 10) {
      if (Math.abs(scaledX) > Math.abs(scaledY)) {
        direction = scaledX > 0 ? 'DIREITA' : 'ESQUERDA';
      } else {
        direction = scaledY > 0 ? 'TRÁS' : 'FRENTE';
      }
    }

    // Atualiza o estado da tela com os novos valores calculados
    setData({
      x: scaledX,
      y: scaledY,
      force: Math.min(force, 100), // Garante que a força não exceda 100%
      direction: direction,
    });
  };

  // --- Lógica do Joystick (parte que antes estaria em um componente separado) ---
  // `useSharedValue` cria variáveis reativas para a posição do manípulo
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // `useAnimatedGestureHandler` gerencia os eventos de arrastar na thread de UI
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      (ctx as any).startX = translateX.value;
      (ctx as any).startY = translateY.value;
    },
    onActive: (event, ctx) => {
      const startX = (ctx as any).startX;
      const startY = (ctx as any).startY;
      let newX = startX + event.translationX;
      let newY = startY + event.translationY;

      const distance = Math.sqrt(newX * newX + newY * newY);

      if (distance > MAX_DISTANCE) {
        const angle = Math.atan2(newY, newX);
        newX = Math.cos(angle) * MAX_DISTANCE;
        newY = Math.sin(angle) * MAX_DISTANCE;
      }

      translateX.value = newX;
      translateY.value = newY;

      // Executa a função `handleJoystickMove` na thread principal
      runOnJS(handleJoystickMove)({ x: newX, y: newY });
    },
    onEnd: () => {
      // Retorna o manípulo ao centro com uma animação de mola
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      runOnJS(handleJoystickMove)({ x: 0, y: 0 });
    },
  });

  // `useAnimatedStyle` cria o estilo animado para mover o manípulo
  const knobStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  // --- Bloco 4: Renderização da UI ---
  // Este bloco renderiza todos os elementos visuais da tela
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle Joystick</Text>
      <Text style={styles.subtitle}>Arraste o círculo para controlar.</Text>

      {/* O container principal do joystick, que detecta o gesto */}
      <GestureHandlerRootView style={styles.joystickContainer}>
        {/* O círculo de fundo do joystick */}
        <View style={styles.joystickBase}>
          {/* O `PanGestureHandler` detecta o arrastar dentro do círculo base */}
          <PanGestureHandler onGestureEvent={onGestureEvent}>
            {/* O manípulo que se move. Usa `Animated.View` para ser animado */}
            <Animated.View style={[styles.joystickKnob, knobStyle]} />
          </PanGestureHandler>
        </View>
      </GestureHandlerRootView>

      {/* A caixa de texto que exibe os dados atualizados do joystick */}
      <View style={styles.dataBox}>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>EIXO X / Y</Text>
          <Text style={styles.dataValue}>({data.x}, {data.y})</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>FORÇA</Text>
          <Text style={styles.dataValue}>{data.force}%</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>DIREÇÃO</Text>
          <Text style={styles.dataValue}>{data.direction}</Text>
        </View>
      </View>
    </View>
  );
}

// --- Bloco 5: Estilos (StyleSheet) ---
// Define a aparência visual de todos os elementos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1f2c',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#61a3f2',
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0a0',
    marginBottom: 20,
  },
  joystickContainer: {
    width: JOYSTICK_SIZE,
    height: JOYSTICK_SIZE,
  },
  joystickBase: {
    width: '100%',
    height: '100%',
    borderRadius: JOYSTICK_RADIUS,
    backgroundColor: '#333642',
    justifyContent: 'center',
    alignItems: 'center',
  },
  joystickKnob: {
    width: JOYSTICK_KNOB_SIZE,
    height: JOYSTICK_KNOB_SIZE,
    borderRadius: KNOB_RADIUS,
    backgroundColor: '#61a3f2',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dataBox: {
    backgroundColor: '#272a33',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dataLabel: {
    fontSize: 16,
    color: '#a0a0a0',
  },
  dataValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
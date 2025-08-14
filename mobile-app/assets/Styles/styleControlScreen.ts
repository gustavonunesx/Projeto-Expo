import { StyleSheet, Dimensions } from "react-native";
import { blue } from "react-native-reanimated/lib/typescript/Colors";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({  
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0A192F',
        paddingTop: height * 0.05, // 5% da altura da tela
    },
    settings: {
        position: 'absolute',
        top: height * 0.05, // 5% da altura
        right: width * 0.05, // 5% da largura
        zIndex: 1
    },
    title: {
        fontSize: width * 0.06, // 6% da largura
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: height * 0.02 // 2% da altura
    },
    subtitle: {
        fontSize: width * 0.04, // 4% da largura
        color: '#666',
        textAlign: 'center',
        marginBottom: height * 0.05 // 5% da altura
    },
    joystickContainer: {
        width: '90%',
        aspectRatio: 1, // Mantém relação quadrada
        maxWidth: 400, // Limite máximo
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: height * 0.05
    },
    joystickPlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderRadius: width * 0.1, // 10% da largura
    },
    modalBackground: {
        ...StyleSheet.absoluteFillObject, // Preenche toda a tela
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: width * 0.8, // 80% da largura
        maxWidth: 350, // Limite máximo
        backgroundColor: 'white',
        borderRadius: width * 0.05, // 5% da largura
        padding: width * 0.05, // 5% da largura
    },
    modalTitle: {
        fontSize: width * 0.05, // 5% da largura
        fontWeight: 'bold',
        marginBottom: height * 0.03, // 3% da altura
        textAlign: 'center'
    },
    optionButton: {
        width: '100%',
        paddingVertical: height * 0.02, // 2% da altura
        marginVertical: height * 0.01, // 1% da altura
        backgroundColor: '#f0f0f0',
        borderRadius: width * 0.02, // 2% da largura
        alignItems: 'center',
    },
    optionText: {
        fontSize: width * 0.04, // 4% da largura
    },

    titleGradient:{

    }
});
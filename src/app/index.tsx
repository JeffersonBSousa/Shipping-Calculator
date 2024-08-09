import { Pressable, Text, View, StyleSheet,  Image } from 'react-native';
import { Link } from 'expo-router';



export default function Home() {
    return (
        <View style={styles.body}>
            <Text style={styles.title} >
                Calculadora de Fretes
            </Text>
            <View style={styles.container}>
                <Link href="/Details" asChild>
                <Pressable>
                        <Image
                            source={require('../../assets/images/motorista.png')}
                            style={styles.image}
                        />
                    </Pressable>
                </Link>
                <Link href="/calculator" asChild>
                    <Pressable>
                        <Image
                            source={require('../../assets/images/calc.png')}
                            style={styles.image}
                        />
                    </Pressable>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#e8e8e8',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 70,
      },
    title: {
        position: 'absolute',
        top: 40,
        fontSize: 24,
        fontWeight: 'bold',
    },
    image: {
        width: 150,
        height: 150,
      },
})
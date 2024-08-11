import { Pressable, Text, View, StyleSheet,  Image } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
    return (
        <View style={styles.body}>
            <Text style={styles.title}>
                Gerenciador de Fretes
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
                <Link href="/report" asChild>
                    <Pressable>
                        <Image
                            source={require('../../assets/images/relatorio.png')}
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
        backgroundColor: '#ffffff',
    },
    container: {
        marginTop: 120,
        alignItems: 'center',
        gap: 70,
      },
    title: {
        backgroundColor: '#000000',
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 6,
    },
    image: {
        width: 130,
        height: 130,
      },
})
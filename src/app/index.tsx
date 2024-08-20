import { Pressable, Text, View, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
    return (
        <View style={styles.body}>
            <Text style={styles.title}>
                Gerenciador de Fretes
            </Text>
            <View style={styles.container}>
                <Text style={styles.subTitle}>Ficha do Motorista</Text>
                <Link href="/Details" asChild>
                    <Pressable>
                        <Image
                            source={require('../../assets/images/motorista.png')}
                            style={styles.image}
                        />
                    </Pressable>
                </Link>
                <Text style={styles.subTitle}>Calculadora</Text>
                <Link href="/calculator" asChild>
                    <Pressable>
                        <Image
                            source={require('../../assets/images/calc.png')}
                            style={styles.image}
                        />
                    </Pressable>
                </Link>
                <Text style={styles.subTitle}>Relatório de Viagens</Text>
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
        marginTop: 70,
        alignItems: 'center',
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
        alignItems: 'center',
        marginBottom: 50,
    },
    subTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
})
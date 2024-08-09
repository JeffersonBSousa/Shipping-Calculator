import { Pressable, Text, View, StyleSheet,  Image } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
    return (
        <View style={styles.body}>
            <Text style={styles.title}>
                Gerenciador de fretes
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
        marginTop: 40,
        alignItems: 'center',
        gap: 40,
      },
    title: {
        backgroundColor: '#000000',
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 12,
    },
    image: {
        width: 170,
        height: 170,
      },
})
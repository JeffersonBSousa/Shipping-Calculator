import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
    return (
        <View style={styles.body}>
            <Text style={styles.title} >
                Calculadora de Fretes
            </Text>
            <View style={styles.conteiner}>
                <Link href="/data" asChild>
                    <Pressable >
                        <Text style={styles.item}>Dados</Text>
                    </Pressable>
                </Link>
                <Link href="/calculator" asChild>
                    <Pressable  >
                        <Text style={styles.item}>Calculadora</Text>
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
        justifyContent: 'center',
        backgroundColor: '#98c7e6',
    },
    conteiner: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        padding: 50,
        fontSize: 24,
    },
    title: {
        position: 'absolute',
        top: 10,
        fontSize: 24,
        fontWeight: 'bold',
    },
})
import { Text, View, StyleSheet } from 'react-native';

export default function Calculator() {
    return (
        <View style={styles.container}>
            <Text>Esta é a calculadora</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#98c7e6',
    },
})
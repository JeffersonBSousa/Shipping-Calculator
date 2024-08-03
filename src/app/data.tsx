import { Text, View, StyleSheet } from 'react-native';

export default function Data() {
    return (
        <View style={styles.container}>
            <Text>Local aonde serão preenchidos os dados</Text>
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
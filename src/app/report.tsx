import { Text, View, StyleSheet } from "react-native";

export default function report() {
    return (
        <View>
            <Text style={styles.title}>
                Gerenciador de fretes
            </Text>
            <Text>
                RELATORIO
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
title: {
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 12,
},

});
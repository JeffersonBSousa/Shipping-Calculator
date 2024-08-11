import { Text, View, StyleSheet } from "react-native";

export default function report() {
    return (
        <View>
            <Text style={styles.title}>
                Relatorios de Fretes
            </Text>
            <Text style={styles.aaa}>
                Em breve
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
title: {
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 6,
},
aaa:{
    textAlign: 'center',
    marginTop: 100,
    fontSize: 30,
}

});
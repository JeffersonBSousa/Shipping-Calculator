import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';

const App: React.FC = () => {
    //Informações
    const [number1, setNumber1] = useState<string>('');
    const [number2, setNumber2] = useState<string>('');

    //Sobre a viagem
    const [number7, setNumber7] = useState<string>('');
    const [number8, setNumber8] = useState<string>('');

    //Custos esperados
    const [number3, setNumber3] = useState<string>('');
    const [number4, setNumber4] = useState<string>('');
    const [number5, setNumber5] = useState<string>('');
    const [number6, setNumber6] = useState<string>('');

    const [result, setResult] = useState<number | null>(null);

    const calculator = () => {
        const litros = parseFloat(number2) / parseFloat(number8);
        console.log({ litros });

        const custoCombustivel = parseFloat(number7) * litros;
        console.log({ custoCombustivel });

        const lucro = parseFloat(number1) - parseFloat(number3) - parseFloat(number4) - parseFloat(number5) - parseFloat(number6) - custoCombustivel;
        setResult(lucro);
        console.log({ lucro });
    };

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>Informações</Text>
            <Text>Preço do combustivel (R$)</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="0.00"
                value={number7}
                onChangeText={setNumber7}
            />
            <Text>Média de consumo (Km/L) caminhão</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="0.00"
                value={number8}
                onChangeText={setNumber8}
            />
            <Text style={styles.title}>Sobre a viagem</Text>
            <Text>Valor do frete (R$)</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="0.00"
                value={number1}
                onChangeText={setNumber1}
            />
            <Text>Distância da viagem (Km)</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="0.00"
                value={number2}
                onChangeText={setNumber2}
            />
            <Text style={styles.title}>Custos esperados</Text>
            <Text>Alimentação (R$)</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="0.00"
                value={number3}
                onChangeText={setNumber3}
            />
            <Text>Pagamento de ajudante (R$)</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="0.00"
                value={number4}
                onChangeText={setNumber4}
            />
            <Text>Estadia (R$)</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="0.00"
                value={number5}
                onChangeText={setNumber5}
            />
            <Text>Outros custos (R$)</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="0.00"
                value={number6}
                onChangeText={setNumber6}
            />
            <View style={styles.buttonContainer}>
                <Button title="Calcular" onPress={calculator} />
            </View>
            {result !== null && (
                <Text style={styles.result}>Lucro estimado:  R${result}</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    inputContainer: {
        width: '80%',
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
    },
    input: {
        width: '100%',
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 16,
    },
    result: {
        fontSize: 24,
        marginTop: 16,
    },
});

export default App;

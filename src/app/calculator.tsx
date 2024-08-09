import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';

const App: React.FC = () => {
    //Informações
    const [number1, setNumber1] = useState<string>('0');
    const [number2, setNumber2] = useState<string>('0');

    //Sobre a viagem
    const [number7, setNumber7] = useState<string>('0');
    const [number8, setNumber8] = useState<string>('0');

    //Custos esperados
    const [number3, setNumber3] = useState<string>('0');
    const [number4, setNumber4] = useState<string>('0');
    const [number5, setNumber5] = useState<string>('0');
    const [number6, setNumber6] = useState<string>('0');

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
        <View style={styles.body}>
            <Text style={styles.title}>
                Gerenciador de fretes
            </Text>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title2}>Média de consumo (Km/L) caminhão</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder=""
                    value={number8}
                    onChangeText={setNumber8}
                />
                <Text style={styles.title3}>Informações</Text>
                <Text style={styles.title2}>Valor do frete (R$)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder=""
                    value={number1}
                    onChangeText={setNumber1}
                />
                <Text style={styles.title2}>Distância da viagem (Km)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder=""
                    value={number2}
                    onChangeText={setNumber2}
                />
                <Text style={styles.title2}>Preço do combustivel (R$)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder=""
                    value={number7}
                    onChangeText={setNumber7}
                />
                <Text style={styles.title3}>Custos</Text>
                <Text style={styles.title2}>Alimentação (R$)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder=""
                    value={number3}
                    onChangeText={setNumber3}
                />
                <Text style={styles.title2}>Pagamento de ajudante (R$)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder=""
                    value={number4}
                    onChangeText={setNumber4}
                />
                <Text style={styles.title2}>Estadia (R$)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder=""
                    value={number5}
                    onChangeText={setNumber5}
                />
                <Text style={styles.title2}>Outros custos (R$)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder=""
                    value={number6}
                    onChangeText={setNumber6}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Calcular" onPress={calculator} />
                </View>
            </ScrollView>
            <View >
            {result !== null && (
                <Text style={styles.footer}>
                    Lucro estimado:  R${result.toFixed(2)}
                </Text>
            )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
        paddingBottom: 60,
    },
    title: {
        backgroundColor: '#000000',
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 12,
    },
    title3: {
        fontSize: 24,
        marginTop: 16,
        marginBottom: 16,
        backgroundColor: '#e3e3e3',
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        borderWidth: 1, 
        borderColor: '#ccc', 
    },
    title2: {
        fontSize: 16,
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
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#8cfa92', 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1, 
        borderColor: '#000', 
        fontSize: 22,
    },
});

export default App;

import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import useFormStore from '../store/useFormStore';

const Calc = () => {
    const {
        mediaCaminhao,
        valorFrete,
        distanciaViagem,
        preçoCombustivel,
        alimentação,
        pagamentoAjudante,
        estadia,
        outrosCustos,
        setValorFrete,
        setDistanciaViagem,
        setPreçoCombustivel,
        setAlimentação,
        setPagamentoAjudante,
        setEstadia,
        setOutrosCustos,
    } = useFormStore();


    const [result, setResult] = useState<number | null>(null);

    const handleSubmit = () => {

        if (!mediaCaminhao) {
            alert('Atualize a ficha do motorista antes de usar a calculadora');
            return;
        }
        if (!valorFrete ||
            !distanciaViagem ||
            !preçoCombustivel ||
            !alimentação ||
            !pagamentoAjudante ||
            !estadia ||
            !outrosCustos) {
            alert('Nenhum campo pode ficar vazio, coloque 0 naquele que não houver valor');
            return;
        }


        const litros = parseFloat(distanciaViagem) / parseFloat(mediaCaminhao);
        console.log({ litros });

        const custoCombustivel = parseFloat(preçoCombustivel) * litros;
        console.log({ custoCombustivel });

        const lucro = parseFloat(valorFrete) - parseFloat(alimentação) - parseFloat(pagamentoAjudante) - parseFloat(estadia) - parseFloat(outrosCustos) - custoCombustivel;
        setResult(lucro);
        console.log({ lucro });

    }

    return (
        <View style={styles.body}>
            <Text style={styles.title}>
                Calculadora de Fretes
            </Text>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title3}>Informações</Text>
                <Text style={styles.title2}>Valor do frete (R$)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder=""
                    value={valorFrete}
                    onChangeText={setValorFrete}
                />
                <Text style={styles.title2}>Distância da viagem (Km)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder=""
                    value={distanciaViagem}
                    onChangeText={setDistanciaViagem}
                />
                <Text style={styles.title2}>Preço do combustivel (R$)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder=""
                    value={preçoCombustivel}
                    onChangeText={setPreçoCombustivel}
                />
                <Text style={styles.title3}>Custos</Text>
                <Text style={styles.title2}>Alimentação (R$)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder=""
                    value={alimentação}
                    onChangeText={setAlimentação}
                />
                <Text style={styles.title2}>Pagamento de ajudante (R$)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder=""
                    value={pagamentoAjudante}
                    onChangeText={setPagamentoAjudante}
                />
                <Text style={styles.title2}>Estadia (R$)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder=""
                    value={estadia}
                    onChangeText={setEstadia}
                />
                <Text style={styles.title2}>Outros custos (R$)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder=""
                    value={outrosCustos}
                    onChangeText={setOutrosCustos}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Calcular" onPress={handleSubmit} />
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
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 6,
    },
    title3: {
        fontSize: 22,
        marginTop: 16,
        marginBottom: 16,
        backgroundColor: '#f2f2f2',
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 5,
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
        width: '70%',
        padding: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#8cfa92',
        padding: 16,
        borderWidth: 1,
        borderColor: '#000',
        fontSize: 22,
    },
});

export default Calc;

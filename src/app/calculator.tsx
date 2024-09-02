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
        outrosCustos,
        setValorFrete,
        setDistanciaViagem,
        setPreçoCombustivel,
        setAlimentação,
        setPagamentoAjudante,
        setOutrosCustos,
        addViagem,
    } = useFormStore();

    const [result, setResult] = useState<number | null>(null);
    const [nomeViagem, setNomeViagem] = useState<string>(''); // Novo estado para o nome da viagem

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
            !outrosCustos) {
            alert('Nenhum campo pode ficar vazio, coloque 0 naquele que não houver valor');
            return;
        }

        const litros = parseFloat(distanciaViagem) / parseFloat(mediaCaminhao);
        const custoCombustivel = parseFloat(preçoCombustivel) * litros;
        const custoTotal = parseFloat(alimentação) + parseFloat(pagamentoAjudante) + parseFloat(outrosCustos) + custoCombustivel;
        const lucro = parseFloat(valorFrete) - custoTotal;
        setResult(lucro);
    };

    const handleSave = () => {
        if (result === null) {
            alert('Calcule o lucro antes de salvar.');
            return;
        }
        if (!nomeViagem) {
            alert('Por favor, insira o nome da viagem.');
            return;
        }

        addViagem({
            valorFrete,
            distanciaViagem,
            preçoCombustivel,
            alimentação,
            pagamentoAjudante,
            outrosCustos,
            lucro: result.toFixed(2),
            nomeViagem // Inclui o nome da viagem
        });

        // Limpar os campos após salvar
        setNomeViagem('');
        setValorFrete('');
        setDistanciaViagem('');
        setPreçoCombustivel('');
        setAlimentação('');
        setPagamentoAjudante('');
        setOutrosCustos('');
        setResult(null);

        alert(`Viagem "${nomeViagem}" salva com sucesso!`);
    };

    return (
        <View style={styles.body}>
            <Text style={styles.title}>Calculadora de Fretes</Text>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title3}>Informações</Text>

                <Text style={styles.title2}>Nome da Viagem</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    placeholder="Digite o nome da viagem"
                    value={nomeViagem}
                    onChangeText={setNomeViagem}
                />

                <Text style={styles.title2}>Valor do frete (R$)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Apenas numero"
                    value={valorFrete}
                    onChangeText={setValorFrete}
                />
                <Text style={styles.title2}>Distância da viagem (Km)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Apenas numero"
                    value={distanciaViagem}
                    onChangeText={setDistanciaViagem}
                />
                <Text style={styles.title2}>Preço do combustivel (R$)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Apenas numero"
                    value={preçoCombustivel}
                    onChangeText={setPreçoCombustivel}
                />
                <Text style={styles.title3}>Custos</Text>
                <Text style={styles.title2}>Alimentação (R$)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Apenas numero"
                    value={alimentação}
                    onChangeText={setAlimentação}
                />
                <Text style={styles.title2}>Pagamento de ajudante (R$)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Apenas numero"
                    value={pagamentoAjudante}
                    onChangeText={setPagamentoAjudante}
                />
                <Text style={styles.title2}>Outros custos (R$)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Apenas numero"
                    value={outrosCustos}
                    onChangeText={setOutrosCustos}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Calcular" onPress={handleSubmit} />
                    <Button title="Salvar" onPress={handleSave} />
                </View>
                <Text>Os valores devem ser separados por . (Ex: 5.10)</Text>
            </ScrollView>
            <View>
                {result !== null && (
                    <Text style={styles.footer}>
                        Lucro estimado: R${result.toFixed(2)}
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
        gap: 50,
    },
    footer: {
        position: 'absolute',
        justifyContent: 'center',
        textAlign: 'center',
        bottom: 0,
        height: 60,
        width: '100%',
        backgroundColor: '#99ff99',
        padding: 14,
        borderWidth: 1,
        borderColor: '#000',
        fontSize: 20,
    },
});

export default Calc;

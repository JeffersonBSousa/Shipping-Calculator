import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import useFormStore from '../store/useFormStore';

interface Viagem {
    nomeViagem: string;
    valorFrete: string;
    distanciaViagem: string;
    preçoCombustivel: string;
    alimentação: string;
    pagamentoAjudante: string;
    estadia: string;
    outrosCustos: string;
    lucro: string;
}

const EditViagem = () => {
    const router = useRouter();
    const { viagem: viagemParam, index } = useLocalSearchParams();

    const viagem = viagemParam ? JSON.parse(viagemParam as string) : {} as Viagem;

    const viagemIndex = typeof index === 'string' ? parseInt(index) : 0;

    const { updateViagem } = useFormStore();

    const [nomeViagem, setNomeViagem] = useState(viagem?.nomeViagem || '');
    const [valorFrete, setValorFrete] = useState(viagem?.valorFrete || '');
    const [distanciaViagem, setDistanciaViagem] = useState(viagem?.distanciaViagem || '');
    const [preçoCombustivel, setPreçoCombustivel] = useState(viagem?.preçoCombustivel || '');
    const [alimentação, setAlimentação] = useState(viagem?.alimentação || '');
    const [pagamentoAjudante, setPagamentoAjudante] = useState(viagem?.pagamentoAjudante || '');
    const [estadia, setEstadia] = useState(viagem?.estadia || '');
    const [outrosCustos, setOutrosCustos] = useState(viagem?.outrosCustos || '');
    const [lucro, setLucro] = useState(viagem?.lucro || '');

    const handleSave = () => {
        const updatedViagem = {
            nomeViagem,
            valorFrete,
            distanciaViagem,
            preçoCombustivel,
            alimentação,
            pagamentoAjudante,
            estadia,
            outrosCustos,
            lucro,
        };

        updateViagem(viagemIndex, updatedViagem);
        Alert.alert('Sucesso', 'Viagem editada com sucesso!', [
            {
                text: 'OK',
                onPress: () => {
                    router.back();
                }
            }
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Viagem</Text>
            <Text>Nome da Viagem:</Text>
            <TextInput
                style={styles.input}
                value={nomeViagem}
                onChangeText={setNomeViagem}
            />
            <Text>Frete (R$):</Text>
            <TextInput
                style={styles.input}
                value={valorFrete}
                onChangeText={setValorFrete}
                keyboardType="numeric"
            />
            <Text>Distância (Km):</Text>
            <TextInput
                style={styles.input}
                value={distanciaViagem}
                onChangeText={setDistanciaViagem}
                keyboardType="numeric"
            />
            <Text>Preço do Combustível (R$):</Text>
            <TextInput
                style={styles.input}
                value={preçoCombustivel}
                onChangeText={setPreçoCombustivel}
                keyboardType="numeric"
            />
            <Text>Alimentação (R$):</Text>
            <TextInput
                style={styles.input}
                value={alimentação}
                onChangeText={setAlimentação}
                keyboardType="numeric"
            />
            <Text>Pagamento Ajudante (R$):</Text>
            <TextInput
                style={styles.input}
                value={pagamentoAjudante}
                onChangeText={setPagamentoAjudante}
                keyboardType="numeric"
            />
            <Text>Estadia (R$):</Text>
            <TextInput
                style={styles.input}
                value={estadia}
                onChangeText={setEstadia}
                keyboardType="numeric"
            />
            <Text>Outros Custos (R$):</Text>
            <TextInput
                style={styles.input}
                value={outrosCustos}
                onChangeText={setOutrosCustos}
                keyboardType="numeric"
            />
            <Text>Lucro (R$):</Text>
            <TextInput
                style={styles.input}
                value={lucro}
                onChangeText={setLucro}
                keyboardType="numeric"
            />
            <Button title="Salvar" onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default EditViagem;

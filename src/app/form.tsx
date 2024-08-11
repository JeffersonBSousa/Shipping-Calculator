import React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { ScrollView } from 'react-native';
import useFormStore from '../store/useFormStore';

const FichaMotorista = () => {
    const { nomeMotorista, modeloCaminhao, mediaCaminhao, setMediaCaminhao, setModeloCaminhao, setNomeMotorista} = useFormStore ();

    const handleSubmit = () =>{

        if (!nomeMotorista || !modeloCaminhao || !mediaCaminhao) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        alert('Informações atualizadas.');
    }

    return (
        <View>
            <Text style={styles.title}>
                Preencha as Informações
            </Text>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title2}>Nome do Motorista:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    placeholder=" "
                    value={nomeMotorista}
                    onChangeText={setNomeMotorista}

                />
                <Text style={styles.title2}>Modelo do Caminhão:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    placeholder=" "
                    value={modeloCaminhao}
                    onChangeText={setModeloCaminhao}

                />
                <Text style={styles.title2}>Média de Consumo (Km/L) do Caminhão:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Apenas numero"
                    value={mediaCaminhao}
                    onChangeText={setMediaCaminhao}

                />
                <View style={styles.buttonContainer}>
                    <Button title="Atualizar" onPress={handleSubmit} />
                </View>
            </ScrollView>
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
    contentContainer: {
        alignItems: 'center',
        marginTop: 70,
        paddingHorizontal: 20,
    },
    title2: {
        fontSize: 16,
        marginTop: 50,
        width: '100%',
    },
    input: {
        width: '100%',
        padding: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50,
    },
})

export default FichaMotorista;

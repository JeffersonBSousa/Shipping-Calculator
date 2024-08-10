import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Details: {
        nomeMotorista: string;
        modeloCaminhao: string;
        mediaConsumo: string;
    };

};

type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

const Info: React.FC = () => {
    const navigation = useNavigation<DetailsScreenNavigationProp>();

    const [number21, setNumber21] = useState<string>('');
    const [number22, setNumber22] = useState<string>('');
    const [number23, setNumber23] = useState<string>('');

    const [tempNumber21, setTempNumber21] = useState<string>('');
    const [tempNumber22, setTempNumber22] = useState<string>('');
    const [tempNumber23, setTempNumber23] = useState<string>('');

    useEffect(() => {
        if (number21 && number22 && number23) {
            navigation.navigate('Details', {
                nomeMotorista: number21,
                modeloCaminhao: number22,
                mediaConsumo: number23,
            });
        }
    }, [number21, number22, number23]);

    const save = () => {
        setNumber21(tempNumber21);
        setNumber22(tempNumber22);
        setNumber23(tempNumber23);
    };

    return (
        <View>
            <Text style={styles.title}>
                Gerenciador de fretes
            </Text>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title2}>Nome do Motorista:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    placeholder=" "
                    value={tempNumber21}
                    onChangeText={setTempNumber21}

                />
                <Text style={styles.title2}>Modelo do Caminhão:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    placeholder=" "
                    value={tempNumber22}
                    onChangeText={setTempNumber22}

                />
                <Text style={styles.title2}>Média de Consumo (Km/L) do Caminhão:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Apenas numero"
                    value={tempNumber23}
                    onChangeText={setTempNumber23}

                />
                <View style={styles.buttonContainer}>
                    <Button title="Atualizar" onPress={save} />
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

export default Info;

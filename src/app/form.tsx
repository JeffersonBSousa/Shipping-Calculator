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
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title2}>Nome do motorista</Text>
            <TextInput
                style={styles.input}
                keyboardType="default"
                placeholder=" "
                value={tempNumber21}
                onChangeText={setTempNumber21}
            />
            <Text style={styles.title2}>Modelo do caminhão</Text>
            <TextInput
                style={styles.input}
                keyboardType="default"
                placeholder=" "
                value={tempNumber22}
                onChangeText={setTempNumber22}
            />
            <Text style={styles.title2}>Média de consumo (Km/L) caminhão</Text>
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
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e8e8e8',
        padding: 16,
    },
    title2: {
        fontSize: 18,
    },
    input: {
        width: '100%',
        padding: 8,
        borderWidth: 1,
        marginBottom: 10,
        borderColor: '#ccc',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
})

export default Info;

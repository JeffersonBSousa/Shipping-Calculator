import React from 'react';
import { StyleSheet, Text, View, Button, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import useFormStore from '../store/useFormStore';
import { PDFDocument, rgb } from 'pdf-lib';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

const uint8ArrayToBase64 = (uint8Array: Uint8Array): string => {
    let binary = '';
    const len = uint8Array.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(uint8Array[i]);
    }
    return btoa(binary);
};

const Report = () => {
    const { viagens, removeViagem, removeAllViagens, calcularTotais, mediaCaminhao } = useFormStore();
    const router = useRouter();

    const handleGeneratePdf = async () => {
        const { totalFretes, totalLucro, totalDistancia, totalCustos } = calcularTotais();

        const pdfDoc = await PDFDocument.create();

        let page = pdfDoc.addPage([600, 800]);
        const { width, height } = page.getSize();
        const fontSize = 12;

        page.drawText('Relatório de Viagens', { x: 50, y: height - 50, size: 24, color: rgb(0, 0, 0) });
        page.drawText(`Total de Fretes: R$ ${totalFretes.toFixed(2)}`, { x: 50, y: height - 100, size: fontSize, color: rgb(0, 0, 0) });
        page.drawText(`Total de Lucro: R$ ${totalLucro.toFixed(2)}`, { x: 50, y: height - 120, size: fontSize, color: rgb(0, 0, 0) });
        page.drawText(`Total de Distância: ${totalDistancia.toFixed(2)} Km`, { x: 50, y: height - 140, size: fontSize, color: rgb(0, 0, 0) });
        page.drawText(`Total de Custos: R$ ${totalCustos.toFixed(2)}`, { x: 50, y: height - 160, size: fontSize, color: rgb(0, 0, 0) });

        let yOffset = height - 200;

        viagens.forEach((viagem, index) => {
            if (yOffset < 50) {
                page = pdfDoc.addPage([600, 800]);
                yOffset = 750;
            }

            page.drawText(`Viagem ${index + 1}:`, { x: 50, y: yOffset, size: 16, color: rgb(0, 0, 0) });
            yOffset -= 20;
            page.drawText(`Frete: R$ ${viagem.valorFrete}`, { x: 50, y: yOffset, size: fontSize, color: rgb(0, 0, 0) });
            yOffset -= 20;
            page.drawText(`Distância: ${viagem.distanciaViagem} Km`, { x: 50, y: yOffset, size: fontSize, color: rgb(0, 0, 0) });
            yOffset -= 20;
            page.drawText(`Custo Combustível: R$ ${(parseFloat(viagem.preçoCombustivel) * (parseFloat(viagem.distanciaViagem) / parseFloat(mediaCaminhao || '1'))).toFixed(2)}`, { x: 50, y: yOffset, size: fontSize, color: rgb(0, 0, 0) });
            yOffset -= 20;
            page.drawText(`Alimentação: R$ ${viagem.alimentação}`, { x: 50, y: yOffset, size: fontSize, color: rgb(0, 0, 0) });
            yOffset -= 20;
            page.drawText(`Pagamento Ajudante: R$ ${viagem.pagamentoAjudante}`, { x: 50, y: yOffset, size: fontSize, color: rgb(0, 0, 0) });
            yOffset -= 20;
            page.drawText(`Outros Custos: R$ ${viagem.outrosCustos}`, { x: 50, y: yOffset, size: fontSize, color: rgb(0, 0, 0) });
            yOffset -= 20;
            page.drawText(`Lucro: R$ ${viagem.lucro}`, { x: 50, y: yOffset, size: fontSize, color: rgb(0, 0, 0) });
            yOffset -= 40;
        });

        const pdfBytes = await pdfDoc.save();
        const fileUri = `${FileSystem.documentDirectory}report.pdf`;

        try {
            const base64String = uint8ArrayToBase64(pdfBytes);
            await FileSystem.writeAsStringAsync(fileUri, base64String, { encoding: FileSystem.EncodingType.Base64 });
            await shareAsync(fileUri, { mimeType: 'application/pdf' });
        } catch (error) {
            console.error('Erro ao salvar o PDF:', error);
        }
    };

    const handlePrint = async () => {
        await handleGeneratePdf();
    };

    const handleRemoveViagem = (index: number) => {
        Alert.alert(
            'Confirmar',
            'Você realmente deseja excluir esta viagem?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Excluir', onPress: () => removeViagem(index) },
            ]
        );
    };

    const handleRemoveAll = () => {
        Alert.alert(
            'Confirmar',
            'Você realmente deseja excluir todas as viagens?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Excluir', onPress: removeAllViagens },
            ]
        );
    };

    const handleEditViagem = (index: number) => {
        const viagem = viagens[index];
        router.push({
            pathname: '/EditViagem',
            params: {
                viagem: JSON.stringify(viagem),
                index: index.toString(),
            },
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Relatório de Viagens</Text>
                {viagens.length === 0 ? (
                    <Text style={styles.message}>Nenhuma viagem registrada.</Text>
                ) : (
                    viagens.map((viagem, index) => (
                        <View key={index} style={styles.viagemContainer}>
                            <Text style={styles.viagemTitle}>Viagem {index + 1}</Text>
                            <Text>Frete: R$ {viagem.valorFrete}</Text>
                            <Text>Distância: {viagem.distanciaViagem} Km</Text>
                            <Text>Custo Combustível: R$ {(parseFloat(viagem.preçoCombustivel) * (parseFloat(viagem.distanciaViagem) / parseFloat(mediaCaminhao || '1'))).toFixed(2)}</Text>
                            <Text>Alimentação: R$ {viagem.alimentação}</Text>
                            <Text>Pagamento Ajudante: R$ {viagem.pagamentoAjudante}</Text>
                            <Text>Outros Custos: R$ {viagem.outrosCustos}</Text>
                            <Text>Lucro: R$ {viagem.lucro}</Text>
                            <View style={styles.aa}>
                            <Button title="Editar" onPress={() => handleEditViagem(index)} />
                            <Button title="Excluir" onPress={() => handleRemoveViagem(index)} />
                            </View>
                        </View>
                    ))
                )}
                <View style={styles.aa}>
                    <Button title="Excluir Todas as Viagens" onPress={handleRemoveAll} />
                    <Button title="Gerar PDF" onPress={handlePrint} />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    aa: {
        gap: 10,
        margin: 10,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    message: {
        fontSize: 16,
        color: 'gray',
    },
    viagemContainer: {
        marginBottom: 20,
    },
    viagemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Report;

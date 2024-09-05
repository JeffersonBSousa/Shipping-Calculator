import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Button, Alert, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import useFormStore from '../store/useFormStore'
import { shareAsync } from 'expo-sharing'
import * as Print from 'expo-print'
import * as MediaLibrary from 'expo-media-library'
import * as FileSystem from 'expo-file-system'
import { Asset } from 'expo-asset'

const logo = require('../../assets/images/logo.png')

async function convertImageToBase64(imageUri: string): Promise<string | null> {
  try {
    const base64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    })
    return `data:image/png;base64,${base64}`
  } catch (error) {
    console.error('Erro ao converter imagem para Base64:', error)
    return null
  }
}

const Report = () => {
  const {
    viagens,
    removeViagem,
    removeAllViagens,
    calcularTotais,
    mediaCaminhao,
    nomeMotorista,
    modeloCaminhao,
  } = useFormStore()
  const router = useRouter()

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Você precisa conceder permissão para gerar o PDF.'
        )
      }
    }
    requestPermissions()
  }, [])

  const handleGeneratePdf = async () => {
    const { totalFretes, totalLucro, totalDistancia, totalCustos } =
      calcularTotais()

    const imageAsset = Asset.fromModule(logo)
    await imageAsset.downloadAsync()

    const base64Image = await convertImageToBase64(imageAsset.localUri || '')

    if (!base64Image) {
      Alert.alert(
        'Erro',
        'Não foi possível carregar a imagem. Verifique o caminho da imagem.'
      )
      return
    }

    const htmlContent = `
        <html>
<head>
    <style>
        @page {
            margin: 0;
        }
        body {
            font-family: Arial, sans-serif;
            margin: 0 20px;
        }
        .header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 120px;
            background-color: #f0f0f0;
            font-size: 16px;
            font-weight: bold;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header-content {
            flex-direction: column;
        }
        .header-image {
            height: 120px;
        }
        .grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            align-items: end;
        }
        .grid-item {
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 8px;
            background-color: #ffffff;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            break-inside: avoid;
            page-break-inside: avoid;
        }
        .grid-item h3 {
            margin-top: 0;
        }
        .grid-item p {
            margin: 5px 0;
        }
        .page-break {
            page-break-before: always;
            margin-top: 200px;
        }
        
    </style>
</head>
<body>
    <div class="header">
        <div class="header-content">
            <h2><strong>Relatório de Viagens</strong></h2>
            <p><strong>Nome do Motorista:</strong> ${nomeMotorista}</p>
            <p><strong>Modelo do Caminhão:</strong> ${modeloCaminhao}</p>
        </div>
        <img src="${base64Image}" alt="Logo" class="header-image">
    </div>
    <div class="content">
        <div class="grid-container">
            ${viagens
              .map(
                (viagem, index) => `
                <div class="grid-item ${index % 6 === 0 ? 'page-break' : ''}">
                    <h3>${viagem.nomeViagem}</h3>
                    <p><strong>Frete:</strong> R$ ${viagem.valorFrete}</p>
                    <p><strong>Distância:</strong> ${
                      viagem.distanciaViagem
                    } Km</p>
                    <p><strong>Custo Combustível:</strong> R$ ${(
                      parseFloat(viagem.preçoCombustivel) *
                      (parseFloat(viagem.distanciaViagem) /
                        parseFloat(mediaCaminhao || '1'))
                    ).toFixed(2)}</p>
                    <p><strong>Alimentação:</strong> R$ ${
                      viagem.alimentação
                    }</p>
                    <p><strong>Pagamento Ajudante:</strong> R$ ${
                      viagem.pagamentoAjudante
                    }</p>
                    <p><strong>Outros Custos:</strong> R$ ${
                      viagem.outrosCustos
                    }</p>
                    <p><strong>Lucro:</strong> R$ ${viagem.lucro}</p>
                </div>
            `
              )
              .join('')}
        </div>
    </div>
</body>
</html>`

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent })

      await shareAsync(uri, { mimeType: 'application/pdf' })
    } catch (error) {
      console.error('Erro ao gerar o PDF:', error)
      Alert.alert(
        'Erro',
        'Não foi possível gerar o PDF. Por favor, tente novamente.'
      )
    }
  }

  const handleRemoveViagem = (index: number) => {
    Alert.alert('Confirmar', 'Você realmente deseja excluir esta viagem?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', onPress: () => removeViagem(index) },
    ])
  }

  const handleRemoveAll = () => {
    Alert.alert(
      'Confirmar',
      'Você realmente deseja excluir todas as viagens?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: removeAllViagens },
      ]
    )
  }

  const handleEditViagem = (index: number) => {
    const viagem = viagens[index]
    router.push({
      pathname: '/EditViagem',
      params: {
        viagem: JSON.stringify(viagem),
        index: index.toString(),
      },
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Relatório de Viagens</Text>
        {viagens.length === 0 ? (
          <Text style={styles.message}>Nenhuma viagem registrada.</Text>
        ) : (
          viagens.map((viagem, index) => (
            <View key={index} style={styles.viagemContainer}>
              <Text style={styles.viagemTitle}>{viagem.nomeViagem}</Text>
              <Text>Frete: R$ {viagem.valorFrete}</Text>
              <Text>Distância: {viagem.distanciaViagem} Km</Text>
              <Text>
                Custo Combustível: R${' '}
                {(
                  parseFloat(viagem.preçoCombustivel) *
                  (parseFloat(viagem.distanciaViagem) /
                    parseFloat(mediaCaminhao || '1'))
                ).toFixed(2)}
              </Text>
              <Text>Alimentação: R$ {viagem.alimentação}</Text>
              <Text>Pagamento Ajudante: R$ {viagem.pagamentoAjudante}</Text>
              <Text>Outros Custos: R$ {viagem.outrosCustos}</Text>
              <Text>Lucro: R$ {viagem.lucro}</Text>
              <View style={styles.aa}>
                <Button
                  title="Editar"
                  onPress={() => handleEditViagem(index)}
                />
                <Button
                  title="Excluir"
                  onPress={() => handleRemoveViagem(index)}
                />
              </View>
            </View>
          ))
        )}
        <View style={styles.aa}>
          <Button title="Excluir Todas as Viagens" onPress={handleRemoveAll} />
          <Button title="Gerar PDF" onPress={handleGeneratePdf} />
        </View>
      </ScrollView>
    </View>
  )
}

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
  viagemContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  viagemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
})

export default Report

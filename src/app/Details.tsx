import React from 'react'
import { View, Text, StyleSheet, Button, } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { Link } from 'expo-router'

type RootStackParamList = {
  Details: {
    nomeMotorista: string
    modeloCaminhao: string
    mediaConsumo: string
  }
}

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>

const Details: React.FC = () => {
  const route = useRoute<DetailsScreenRouteProp>()

  const { nomeMotorista, modeloCaminhao, mediaConsumo } = route.params

  return (
    <View style={styles.body}>
      <Text style={styles.title}>
        Gerenciador de fretes
      </Text>
      <View style={styles.container}>
        <Text style={styles.text1}>Nome do Motorista:</Text>
        <Text style={styles.text2}>{nomeMotorista}.</Text>
        <Text style={styles.text1}>Modelo do Caminhão:</Text>
        <Text style={styles.text2}>{modeloCaminhao}.</Text>
        <Text style={styles.text1}>Média de Consumo:</Text>
        <Text style={styles.text2}>{mediaConsumo} Km/L</Text>

        <Link href="/form" asChild>
          <Button title='Atualizar dados' />
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text1: {
    fontSize: 16,
    marginLeft: 50,
    marginRight: 50,
    width: '90%',
  },
  text2: {
    fontSize: 20,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 50,
    width: '90%',
    fontWeight: 'bold',
    backgroundColor: '#cccccc',
    padding: 5,
  },
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    marginTop: 50,
    alignItems: 'center',
  },
  title: {
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 12,
  },
})

export default Details


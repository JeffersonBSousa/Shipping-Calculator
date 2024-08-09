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
    <View style={styles.container}>
      <Text style={styles.text}>Nome do Motorista: {nomeMotorista}</Text>
      <Text style={styles.text}>Modelo do Caminhão: {modeloCaminhao}</Text>
      <Text style={styles.text}>Média de Consumo: {mediaConsumo} Km/L</Text>

      <Link href="/form" asChild>
        <Button title='Atualizar dados' />
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e8e8e8',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
})

export default Details


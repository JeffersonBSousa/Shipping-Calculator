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
          <Button title='Editar informações' />
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text1: {
    fontSize: 16,
    width: '100%',
  },
  text2: {
    fontSize: 20,
    marginBottom: 50,
    width: '100%',
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
    padding: 5,
  },
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    marginTop: 120,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 6,
  },
})

export default Details


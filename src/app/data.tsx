import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Details: {
    nomeMotorista: string;
    modeloCaminhao: string;
    mediaConsumo: string;
  };
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type DetailsProps = {
  route: DetailsScreenRouteProp;
};

const Details: React.FC<DetailsProps> = ({ route }) => {
  // Recuperar os parâmetros passados
  const { nomeMotorista, modeloCaminhao, mediaConsumo } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nome do Motorista: {nomeMotorista}</Text>
      <Text style={styles.text}>Modelo do Caminhão: {modeloCaminhao}</Text>
      <Text style={styles.text}>Média de Consumo: {mediaConsumo} Km/L</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Details;

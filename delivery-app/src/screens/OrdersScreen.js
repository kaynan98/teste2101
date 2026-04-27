import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const orders = [
  { id: '1', restaurant: 'Pizza Hut', address: 'Rua A, 123', status: 'Pronto para retirada' },
  { id: '2', restaurant: 'McDonald\'s', address: 'Av. B, 456', status: 'Em preparo' },
  { id: '3', restaurant: 'Sushi House', address: 'Rua C, 789', status: 'Aguardando' },
];

export default function OrdersScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Map', { order: item })}
    >
      <Text style={styles.restaurant}>{item.restaurant}</Text>
      <Text style={styles.address}>{item.address}</Text>
      <Text style={styles.status}>{item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurant: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  status: {
    fontSize: 12,
    color: '#f97316',
    marginTop: 8,
    fontWeight: '600',
  },
});

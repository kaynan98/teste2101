import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function StatusScreen({ route, navigation }) {
  const { order } = route.params;

  const statuses = [
    { label: 'Aguardando', icon: '⏳', active: true },
    { label: 'Em preparo', icon: '🍳', active: false },
    { label: 'Pronto para retirada', icon: '📦', active: false },
    { label: 'Saiu para entrega', icon: '🚴', active: false },
    { label: 'Entregue', icon: '✅', active: false },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Status do Pedido</Text>
      <Text style={styles.restaurant}>{order.restaurant}</Text>
      <View style={styles.timeline}>
        {statuses.map((s, index) => (
          <View key={index} style={styles.step}>
            <Text style={[styles.icon, s.active && styles.activeIcon]}>{s.icon}</Text>
            <Text style={[styles.label, s.active && styles.activeLabel]}>{s.label}</Text>
            {index < statuses.length - 1 && <View style={styles.line} />}
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  restaurant: {
    fontSize: 18,
    color: '#666',
    marginBottom: 24,
  },
  timeline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  step: {
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 32,
    marginBottom: 4,
    opacity: 0.4,
  },
  activeIcon: {
    opacity: 1,
  },
  label: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  activeLabel: {
    color: '#f97316',
    fontWeight: '600',
  },
  line: {
    width: 2,
    height: 20,
    backgroundColor: '#ddd',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#f97316',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

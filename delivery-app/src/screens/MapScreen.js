import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen({ route, navigation }) {
  const { order } = route.params;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão de localização negada');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <MapView style={styles.map} initialRegion={location}>
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Sua localização"
            description="Você está aqui"
          />
          <Marker
            coordinate={{
              latitude: location.latitude + 0.002,
              longitude: location.longitude + 0.002,
            }}
            title={order.restaurant}
            description={order.address}
            pinColor="orange"
          />
        </MapView>
      ) : (
        <Text style={styles.loading}>Carregando mapa...</Text>
      )}
      <View style={styles.footer}>
        <Text style={styles.info}>{order.restaurant} - {order.address}</Text>
        <Button
          title="Atualizar Status"
          onPress={() => navigation.navigate('Status', { order })}
          color="#f97316"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loading: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    color: '#666',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  info: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
});

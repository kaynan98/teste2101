import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrdersScreen from './src/screens/OrdersScreen';
import MapScreen from './src/screens/MapScreen';
import StatusScreen from './src/screens/StatusScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Orders">
        <Stack.Screen
          name="Orders"
          component={OrdersScreen}
          options={{ title: 'Pedidos Disponíveis' }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ title: 'Navegação' }}
        />
        <Stack.Screen
          name="Status"
          component={StatusScreen}
          options={{ title: 'Status da Entrega' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React, { useState } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 1. Definimos la estructura de los datos para que TS no se queje
interface MenuItem {
  id: string;
  name: string;
  price: number;
}

const MENU_ITEMS: MenuItem[] = [
  { id: '1', name: 'Hamburguesa Clásica', price: 120 },
  { id: '2', name: 'Pizza Pepperoni', price: 180 },
  { id: '3', name: 'Tacos al Pastor (Orden)', price: 80 },
];

export default function DeliveryApp() {
  // 2. Le indicamos al estado que el carrito almacenará un arreglo de MenuItem
  const [cart, setCart] = useState<MenuItem[]>([]);

  // 3. Tipamos el parámetro item
  const addToCart = (item: MenuItem) => {
    setCart([...cart, item]);
    Alert.alert("Agregado", `${item.name} se agregó a tu pedido.`);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const processPayment = () => {
    // 4. BUG INTENCIONAL: Forzamos el tipo "any" para saltarnos la validación
    // de TypeScript. Así compila, pero al dar clic la app crasheará.
    const paymentGateway: any = null;
    paymentGateway.initiateTransaction(); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Rodnix Delivery</Text>
      </View>

      <FlatList
        data={MENU_ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price} MXN</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
              <Text style={styles.buttonText}>Agregar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.cartSection}>
        <Text style={styles.cartTotal}>Total a pagar: ${calculateTotal()} MXN</Text>
        <TouchableOpacity 
          style={[styles.payButton, cart.length === 0 && styles.disabledButton]} 
          disabled={cart.length === 0}
          onPress={processPayment}
        >
          <Text style={styles.buttonText}>Proceder al Pago</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 20, backgroundColor: '#1a1a1a', alignItems: 'center' },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  itemCard: { backgroundColor: '#fff', padding: 15, margin: 10, borderRadius: 8, elevation: 2 },
  itemName: { fontSize: 18, fontWeight: '600' },
  itemPrice: { fontSize: 16, color: '#666', marginVertical: 5 },
  addButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  cartSection: { padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#ddd' },
  cartTotal: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  payButton: { backgroundColor: '#E53935', padding: 15, borderRadius: 8, alignItems: 'center' },
  disabledButton: { backgroundColor: '#ccc' }
});
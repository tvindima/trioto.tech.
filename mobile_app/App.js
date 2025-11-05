import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  const [pair, setPair] = useState('');
  const [entryPrice, setEntryPrice] = useState('');
  const [tpPercent, setTpPercent] = useState('');
  const [slPercent, setSlPercent] = useState('');
  const [response, setResponse] = useState(null);

  const openOrder = async () => {
    try {
      const res = await fetch('http://<your-server>:8000/open_order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pair: pair,
          entry_price: parseFloat(entryPrice),
          tp_percent: parseFloat(tpPercent),
          sl_percent: parseFloat(slPercent)
        })
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: err.toString() });
    }
  };

  const simulate = async () => {
    try {
      const res = await fetch('http://<your-server>:8000/simulate', {
        method: 'POST'
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: err.toString() });
    }
  };

  return (
    <View style={styles.container}>
      <Text>Simulated Forex Bot</Text>
      <TextInput
        placeholder="Pair (e.g. EUR/USD)"
        value={pair}
        onChangeText={setPair}
        style={styles.input}
      />
      <TextInput
        placeholder="Entry price"
        value={entryPrice}
        onChangeText={setEntryPrice}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="TP % (e.g. 0.02)"
        value={tpPercent}
        onChangeText={setTpPercent}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="SL % (e.g. -0.01)"
        value={slPercent}
        onChangeText={setSlPercent}
        style={styles.input}
        keyboardType="numeric"
      />
      <Button title="Open Order" onPress={openOrder} />
      <Button title="Simulate & Close" onPress={simulate} />
      {response && <Text>{JSON.stringify(response)}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10
  }
});

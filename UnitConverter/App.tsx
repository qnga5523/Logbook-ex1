import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

const App = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputUnit, setInputUnit] = useState<string>("Metre");
  const [outputUnit, setOutputUnit] = useState<string>("Metre");
  const [result, setResult] = useState<string>("");

  const units = ["Metre", "Millimetre", "Mile", "Foot"];

  const convertUnits = (value: number, fromUnit: string, toUnit: string) => {
    const conversionRates: { [key: string]: number } = {
      Metre: 1,
      Millimetre: 1000,
      Mile: 0.000621371,
      Foot: 3.28084,
    };

    const inMetres = value / conversionRates[fromUnit];
    const resultValue = inMetres * conversionRates[toUnit];
    return resultValue;
  };

  const handleResult = () => {
    const numericValue = parseFloat(inputValue);

    if (isNaN(numericValue)) {
      Alert.alert("Invalid Input", "Please enter a valid number.");
      return;
    }

    const convertedValue = convertUnits(numericValue, inputUnit, outputUnit);
    setResult(`${convertedValue.toFixed(4)} ${outputUnit}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unit Converter</Text>

      {/* Input Section */}
      <View style={styles.section}>
        <Text style={styles.label}>Input Value</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter value"
          keyboardType="numeric"
          value={inputValue}
          onChangeText={setInputValue}
        />

        <Text style={styles.label}>Input Unit</Text>
        <Picker
          selectedValue={inputUnit}
          style={styles.picker}
          onValueChange={(itemValue) => setInputUnit(itemValue)}
        >
          {units.map((unit) => (
            <Picker.Item key={unit} label={unit} value={unit} />
          ))}
        </Picker>
      </View>

      {/* Output Section */}
      <View style={styles.section}>
        <Text style={styles.label}>Output Unit</Text>
        <Picker
          selectedValue={outputUnit}
          style={styles.picker}
          onValueChange={(itemValue) => setOutputUnit(itemValue)}
        >
          {units.map((unit) => (
            <Picker.Item key={unit} label={unit} value={unit} />
          ))}
        </Picker>
      </View>

      {/* Convert Button */}
      <Button title="Convert" onPress={handleResult} color="#808080" />

      {/* Result Display */}
      {result !== "" && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Result:</Text>
          <Text style={styles.resultValue}>{result}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: "#f0f8ff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#555",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  picker: {
    height: 50,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
  resultContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "#d3f8d3",
    borderRadius: 10,
    alignItems: "center",
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  resultValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e8b57",
    marginTop: 10,
  },
});

export default App;

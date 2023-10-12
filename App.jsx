// @ts-nocheck
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import Graphic from "./components/graphic";
import Table from "./components/table";
import styles from "./styles";

const App = () => {
  const [values, setValues] = useState([
    {
      id: 0,
      ic: 0,
      ts: 0,
      cpf: 0,
      eps: 0,
      sps: 0,
    },
  ]);

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={styles.background}>
        <ScrollView contentContainerStyle={styles.screen}>
          
          <Text style={styles.title}>Fila M/M/1</Text> 
          
          <Table values={values} setValues={setValues}/>

          <Graphic values={values}/>

        </ScrollView >
      </SafeAreaView >
    </>
  );
};

export default App;
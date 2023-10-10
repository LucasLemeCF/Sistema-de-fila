// @ts-nocheck
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import Graphic from "./components/graphic";
import Table from "./components/table";
import styles from "./styles";

const App = () => {
  const [valores, setValores] = useState([
    {
      id: 0,
      ic: "",
      ts: "",
    },
  ]);
  const [items, setItems] = useState([
    {
      id: 0,
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
          
          <Table valores={valores} setValores={setValores} items={items} setItems={setItems}/>

          <Graphic items={items}/>

        </ScrollView >
      </SafeAreaView >
    </>
  );
};

export default App;
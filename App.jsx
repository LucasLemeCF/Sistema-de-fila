import React, { useState } from "react";
import { Button, Text, TextInput, View, SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import styles from "./styles";

const App = () => {
  const [items, setItems] = useState([
    {
      id: 0,
      ic: "",
      ts: "",
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
          
          <Table items={items} setItems={setItems}/>

        </ScrollView >
      </SafeAreaView >
    </>
  );
};

const Table = ({ items, setItems }) => {
  const handleChange = (items) => {
    let previousCpf = 0;
    let previousSps = 0;

    const newState = items.map((item) => {
      convertstringToNumeric(item);

      item.cpf = previousCpf + item.ic;
      item.eps = previousSps > item.cpf ? previousSps : item.cpf;
      item.sps = item.ts + item.eps;

      previousCpf = item.cpf;
      previousSps = item.sps;

      return item;
    });

    function convertstringToNumeric(item) {
      if (item.ic === "") {
       item.ic = 0;
      } 
      if (item.ts === "") {
       item.ts = 0;
      }
    }
  
    setItems(newState);
  };

  return (
    <View style={styles.container} value={items}>
      <Header/>

      <ItemsTable items={items} setItems={setItems}/>

      <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 20 }}>
        <NewLineButton items={items} setItems={setItems}/>
        <DeleteLineButton items={items} setItems={setItems}/>
      </View>

      <View style={{marginTop: 20,}} > 
        <Button onPress={() => handleChange(items)} color="#23036A" title={'Atualizar tabela'}></Button>
      </View>
      </View>
  );
}


const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.cellHeader}>P</Text>
      <Text style={styles.cellHeader}>ic</Text>
      <Text style={styles.cellHeader}>ts</Text>
      <Text style={styles.cellHeader}>cpf</Text>
      <Text style={styles.cellHeader}>eps</Text>
      <Text style={styles.cellHeader}>sps</Text>
    </View>
  );
}

const ItemsTable = ({ items, setItems }) => {
  const onChanged = (value, items, id, type) => {
    const convertValueToNumeric = (value) => {
      return value == "" ? "" : parseInt(value, 10);
    };

    const updateItem = (item, type, value) => {
      if (item.id === id) {
        if (type === "ic") {
          item.ic = value;
        } else if (type === "ts") {
          item.ts = value;
        }
      }

      return item;
    };
  
    const newState = items.map((item) => updateItem(item, type, convertValueToNumeric(value)));
    setItems(newState);
  }

  return (
    <View>
      {items.map((item) => (
        <View key={item.id} style={styles.body}>
          <Text style={[styles.cell, [item.id == items.length - 1 ? { borderBottomLeftRadius: 5 } : { borderBottomLeftRadius: 0 }], {marginLeft: 0}]}>{item.id}</Text>
          <TextInput style={styles.cellInput} onChangeText={value => onChanged(value, items, item.id, "ic")} keyboardType='numeric' maxLength={5}>{item.ic}</TextInput>
          <TextInput style={styles.cellInput} onChangeText={value => onChanged(value, items, item.id, "ts")} keyboardType='numeric' maxLength={5}>{item.ts}</TextInput>
          <Text style={styles.cell}>{item.cpf}</Text>
          <Text style={styles.cell}>{item.eps}</Text>
          <Text style={[styles.cell, [item.id == items.length - 1 ? { borderBottomRightRadius: 5 } : { borderBottomRightRadius: 0 }], {marginRight: 0}]}>{item.sps}</Text>
        </View>
      ))}
     </View>
  );
};

const NewLineButton = ({ items, setItems }) => {
  const newLine = (items) => {
    const novaListaDeItens = Array.from(items);

    const novoItem = {
      id: novaListaDeItens.length,
      ic: "",
      ts: "",
      cpf: 0,
      eps: 0,
      sps: 0,
    };

    novaListaDeItens.push(novoItem);
    setItems(novaListaDeItens);
  };

  return (
    <Button
      onPress={() => newLine(items)}
      color="#3700B3"
      title={'Adicionar Linha'}
      style={styles.button}
    ></Button>
  );
}

const DeleteLineButton = ({ items, setItems }) => {
  return (
    <Button
    onPress={() => setItems(items.slice(0, items.length - 1))}
    color="#6c6c6c"
    title={'Remover Linha'}
    style={styles.button}
  ></Button>
  );
}

export default App;
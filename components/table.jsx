// @ts-ignore
import React from "react";
// @ts-ignore
import { Button, Text, TextInput, View } from "react-native";
import styles from "../styles";


export default function Table({ valores, setValores, items, setItems }) {
    const handleChange = (items) => {
      let previousCpf = 0;
      let previousSps = 0;
  
      const newState = items.map((item) => {
        valores.map((valor) => {
          if (item.id === valor.id) {
            convertstringToNumeric(valor);
  
            item.cpf = previousCpf + valor.ic;
            item.eps = previousSps > item.cpf ? previousSps : item.cpf;
            item.sps = valor.ts + item.eps;
  
            previousCpf = item.cpf;
            previousSps = item.sps;
          }
        });
  
        return item;
      });
  
      function convertstringToNumeric(valor) {
        if (valor.ic === "") {
          valor.ic = 0;
        } 
        if (valor.ts === "") {
          valor.ts = 0;
        }
      }
    
      setItems(newState);
    };
  
    return (
      <View style={styles.container} 
// @ts-ignore
      value={items}>
        <Header/>
  
        <ItemsTable valores={valores} setValores={setValores} items={items}/>
  
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 20 }}>
          <NewLineButton valores={valores} setValores={setValores} items={items} setItems={setItems}/>
          <DeleteLineButton valores={valores} setValores={setValores} items={items} setItems={setItems}/>
        </View>
  
        <View style={{marginTop: 20,}} > 
          <Button onPress={() => handleChange(items)} color="#23036A" title={'Atualizar tabela'}></Button>
        </View>
        </View>
    );
}

export const ItemsTable = ({ valores, setValores, items }) => {
    const onChanged = (number, valores, id, type) => {
      const convertValueToNumeric = (number) => {
        return number == "" ? "" : parseInt(number, 10);
      };
  
      const updateValor = (valor, type, number) => {
        if (valor.id === id) {
          if (type === "ic") {
            valor.ic = number;
          } else if (type === "ts") {
            valor.ts = number;
          }
        }
  
        return valor;
      };
    
      const newState = valores.map((valor) => updateValor(valor, type, convertValueToNumeric(number)));
      setValores(newState);
    }
  
    return (
      <View>
        {valores.map((valor) => (
          <View key={valor.id} style={styles.body}>
            <Text style={[styles.cell, [valor.id == valores.length - 1 ? { borderBottomLeftRadius: 5 } : { borderBottomLeftRadius: 0 }], {marginLeft: 0}]}>{valor.id}</Text>
            <TextInput style={styles.cellInput} onChangeText={number => onChanged(number, valores, valor.id, "ic")} keyboardType='numeric' maxLength={5}>{valor.ic}</TextInput>
            <TextInput style={styles.cellInput} onChangeText={number => onChanged(number, valores, valor.id, "ts")} keyboardType='numeric' maxLength={5}>{valor.ts}</TextInput>
            <Text style={styles.cell}>{items[valor.id].cpf}</Text>
            <Text style={styles.cell}>{items[valor.id].eps}</Text>
            <Text style={[styles.cell, [items[valor.id].id == valores.length - 1 ? { borderBottomRightRadius: 5 } : { borderBottomRightRadius: 0 }], {marginRight: 0}]}>{items[valor.id].sps}</Text>
          </View>
        ))}
       </View>
    );
};
  

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

const NewLineButton = ({ valores, setValores, items, setItems }) => {
    const newLine = (valores, items) => {
        const novaListaDeValores = Array.from(valores);
        const novaListaDeItens = Array.from(items);

        const novoValor = {
        id: novaListaDeItens.length,
        ic: "",
        ts: "",
        };

        const novoItem = {
        id: novaListaDeItens.length,
        cpf: 0,
        eps: 0,
        sps: 0,
        };

        novaListaDeValores.push(novoValor);
        novaListaDeItens.push(novoItem);

        setValores(novaListaDeValores);
        setItems(novaListaDeItens);
    };

    return (
        <Button
        onPress={() => newLine(valores, items)}
        color="#3700B3"
        title={'Adicionar Linha'}
        // @ts-ignore
        style={styles.button}
        ></Button>
    );
}

const DeleteLineButton = ({ valores, setValores, items, setItems }) => {
    const deleteLine = (valores, items) => {
        let novaListaDeValores = Array.from(valores);
        let novaListaDeItens = Array.from(items);

        novaListaDeValores.pop();
        novaListaDeItens.pop();

        setValores(novaListaDeValores);
        setItems(novaListaDeItens);
    }

    return (
        <Button
        onPress={() => deleteLine(valores, items)}
        color="#6c6c6c"
        title={'Remover Linha'}
        // @ts-ignore
        style={styles.button}
    ></Button>
    );
}
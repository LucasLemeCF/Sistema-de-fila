// @ts-ignore
import React from "react";
// @ts-ignore
import { Button, Text, TextInput, View } from "react-native";
import styles from "../styles";


export default function Table({ values, setValues }) {
    const handleChange = (values) => {
      let previousCpf = 0;
      let previousSps = 0;
  
      const newState = values.map((value) => {
        convertstringToNumeric(value);

        value.cpf = previousCpf + value.ic;
        value.eps = previousSps > value.cpf ? previousSps : value.cpf;
        value.sps = value.ts + value.eps;

        previousCpf = value.cpf;
        previousSps = value.sps;
    
        return value;
      });
  
      function convertstringToNumeric(value) {
        if (value.ic === "") {
          value.ic = 0;
        } 
        if (value.ts === "") {
          value.ts = 0;
        }
      }
    
      setValues(newState);
    };
  
    return (
      <View style={styles.container} 
      // @ts-ignore   
      value={values}>
        <Header/>
  
        <ValuesTable values={values} setValues={setValues}/>
  
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 20 }}>
          <NewLineButton values={values} setValues={setValues}/>
          <DeleteLineButton values={values} setValues={setValues}/>
        </View>
      </View>
    );
}

export const ValuesTable = ({ values, setValues }) => {
    const onChanged = (number, values, id, type) => {
      const convertValueToNumeric = (number) => {
        return number == "" ? "" : parseInt(number, 10);
      };

      const updateValue = (number, values, id, type) => {
        values.map((value) => {
          if (value.id === id) {
            if (type === "ic") {
              value.ic = number;
            } else if (type === "ts") {
              value.ts = number;
            }
          }
    
          return value;
        });
        console.log(values);
        return values;
      };

      setValues(updateValue(convertValueToNumeric(number), values, id, type));

      let previousCpf = 0;
      let previousSps = 0;
  
      const newState = values.map((value) => {   
        convertstringToNumeric(value);

        value.cpf = previousCpf + value.ic;
        value.eps = previousSps > value.cpf ? previousSps : value.cpf;
        value.sps = value.ts + value.eps;

        previousCpf = value.cpf;
        previousSps = value.sps;
  
        return value;
      });

      function convertstringToNumeric(value) {
        if (value.ic === "") {
          value.ic = 0;
        } 
        if (value.ts === "") {
          value.ts = 0;
        }
      }
  
      setValues(newState);
    }
  
    return (
      <View>
        {values.map((value) => (
          <View key={value.id} style={styles.body}>
            <Text style={[styles.cell, [value.id == values.length - 1 ? { borderBottomLeftRadius: 5 } : { borderBottomLeftRadius: 0 }], {marginLeft: 0}]}>{value.id}</Text>
            <TextInput style={styles.cellInput} onChangeText={number => onChanged(number, values, value.id, "ic")} keyboardType='numeric' maxLength={5}>{value.ic}</TextInput>
            <TextInput style={styles.cellInput} onChangeText={number => onChanged(number, values, value.id, "ts")} keyboardType='numeric' maxLength={5}>{value.ts}</TextInput>
            <Text style={styles.cell}>{values[value.id].cpf}</Text>
            <Text style={styles.cell}>{values[value.id].eps}</Text>
            <Text style={[styles.cell, [values[value.id].id == values.length - 1 ? { borderBottomRightRadius: 5 } : { borderBottomRightRadius: 0 }], {marginRight: 0}]}>{values[value.id].sps}</Text>
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

const NewLineButton = ({ values, setValues }) => {
    const newLine = (values) => {
        const newValuesList = Array.from(values);

        const newValue = {
        id: newValuesList.length,
        ic: 0,
        ts: 0,
        cpf: 0,
        eps: 0,
        sps: 0,
        };

        newValuesList.push(newValue);

        setValues(newValuesList);
    };

    return (
        <Button
        onPress={() => newLine(values)}
        color="#3700B3"
        title={'Adicionar Linha'}
        // @ts-ignore
        style={styles.button}
        ></Button>
    );
}

const DeleteLineButton = ({ values, setValues }) => {
    const deleteLine = (values) => {
        let newValueList = Array.from(values);

        newValueList.pop();

        setValues(newValueList);
    }

    return (
        <Button
        onPress={() => deleteLine(values)}
        color="#6c6c6c"
        title={'Remover Linha'}
        // @ts-ignore
        style={styles.button}
    ></Button>
    );
}
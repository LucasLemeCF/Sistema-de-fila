// @ts-nocheck
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, ScrollView, Text } from "react-native";
import { LineChart, } from "react-native-chart-kit";
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

    // console.log("\n");
    // valores.map((valor) => {
    //   console.log("Valores: Id:" + valor.id + " ic:" + valor.ic + " ts:" + valor.ts);
    //   console.log("Items: Id:" + items[valor.id].id + " cpf:" + items[valor.id].cpf + " eps:" + items[valor.id].eps + " sps:" + items[valor.id].sps);
    // });

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

const Graphic = ({ items }) => {
  if (items.length == 0) {
    return null;
  } 

  useEffect(() => {
    arrLabel();
    arrData();
  }, [items]);

  const [label, setLabel] = useState([0]);
  const [dataCpf, setDataCpf] = useState([0]);
  const [dataEps, setDataEps] = useState([0]);
  const [dataSps, setDataSps] = useState([0]);

  const arrLabel = () => {
    setLabel(Array(items.length).fill(1).map((_, index) => String(index)));
  };

  const arrData = () => {
    const cpf = [];
    const eps = [];
    const sps = [];
   
    items.map((item) => (
      cpf.push(item.cpf),
      eps.push(item.eps),
      sps.push(item.sps)
    ));

    setDataCpf(cpf);
    setDataEps(eps);
    setDataSps(sps);
  };

  chartConfig={
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#23036A",
    backgroundGradientTo: "#352A62",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForDots: {
      r: "3",
      strokeWidth: "0",
      stroke: "#fff"
    }
  }

  return (
    <LineChart
      data={{
        labels: label,
        datasets: [
          {data: dataCpf, color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`}, 
          {data: dataEps, color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`}, 
          {data: dataSps, color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`}
        ]
      }}
      width={Dimensions.get("window").width * 0.85}
      height={220}
      yAxisInterval={1}
      chartConfig={chartConfig}
      bezier
      style={{
        marginVertical: 10,
        borderRadius: 5
      }}
    />
  );
}

export default App;
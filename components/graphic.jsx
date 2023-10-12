import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { LineChart, } from "react-native-chart-kit";

export default function Graphic({ values }) {
    if (values.length == 0) {
      return null;
    } 
  
    useEffect(() => {
      arrLabel();
      arrData();
    }, [values]);
  
    const [label, setLabel] = useState([0]);
    const [dataCpf, setDataCpf] = useState([0]);
    const [dataEps, setDataEps] = useState([0]);
    const [dataSps, setDataSps] = useState([0]);
  
    const arrLabel = () => {
      setLabel(Array(values.length).fill(1).map((_, index) => Number(index)));
    };
  
    const arrData = () => {
      const cpf = [];
      const eps = [];
      const sps = [];
     
      values.map((value) => (
        cpf.push(value.cpf),
        eps.push(value.eps),
        sps.push(value.sps)
      ));
  
      setDataCpf(cpf);
      setDataEps(eps);
      setDataSps(sps);
    };
  
    const chartConfig={
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
          // @ts-ignore
          labels: label,
          datasets: [
            {data: dataCpf, color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`}, 
            {data: dataEps, color: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`}, 
            {data: dataSps, color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`}
          ],
          legend: ["cpf", "eps", "sps"]
          
        }}
        width={Dimensions.get("window").width * 0.9}
        height={220}
        yAxisInterval={1}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 20,
          borderRadius: 5
        }}
      />
    );
  }
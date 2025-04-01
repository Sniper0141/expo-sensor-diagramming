import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { Accelerometer } from 'expo-sensors';

export default function HomeScreen() {
  const [chartData, setChartData] = useState<number[]>([0]);
  
  useEffect(() => {
    Accelerometer.setUpdateInterval(1000);
    const sub = Accelerometer.addListener(addData);
    return () => sub.remove();
  });

  function addData(data: {x:number, y:number, z:number}){
    setChartData(d => [data.x, ...d].slice(0, 30));
  }

  return (
    <View style={styles.view}>
      <Text style={styles.title}>Accelerometer</Text>
      <LineChart 
        data={{
          labels: ["0s ago", "5s", "10s", "15s", "20s", "25s", "30s"],
          datasets: [
            {
              data: chartData
            }
          ]
        }}
        width={400}
        height={300}
        chartConfig={{
          color: () => `rgba(255, 255, 255, 1)`
        }}
        style={{marginTop: 100}}>
      </LineChart>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    marginTop: 100
  },
  title: {
    color: 'white', 
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold'
  }
});

import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { Accelerometer } from 'expo-sensors';

export default function HomeScreen() {
  const [chartData, setChartData] = useState<number[]>([]);
  
  useEffect(() => {
    Accelerometer.setUpdateInterval(1000);
    const sub = Accelerometer.addListener(addData);
    return () => sub.remove();
  });

  function addData(data: {x:number, y:number, z:number}){
    setChartData(d => [data.x, ...d].slice(0, 30));
  }

  return (
    <LineChart 
      data={{
        labels: ["0s ago", "5s", "10s", "15s", "20s"],
        datasets: [
          {
            data: chartData
          }
        ]
      }}
      width={400}
      height={300}
      chartConfig={{
        color: () => `rgba(255, 255, 255, 1)`,
        style: {
          margin: 100
        }
      }}>
    </LineChart>
  );
}

const styles = StyleSheet.create({
});

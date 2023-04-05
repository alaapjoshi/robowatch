import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").height;
import { useRoute } from '@react-navigation/native';

export default function Graph() {

  //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    // Replace `YOUR-TEAM-KEY` with your own team's TBA API key
  const teamKey = "pn7EQlAcawiyWsJ1HpxNgNzvkJg0ajReJ75lPhiCj6FF3G34PEa0bHRiqGzQhRoR";

// The endpoint to retrieve data for the 2023 FRC season
  const endpoint = `https://www.thebluealliance.com/api/v3/team/frc75/event/2023njski/matches`;
  const nameList = [];
// Fetch the data from the API
fetch(endpoint, { headers: { 'X-TBA-Auth-Key': teamKey } })
  .then(response => response.json())
  .then(data => {
    const parsedData = JSON.stringify(data);
    const size = data.length;
    for (let i = 0; i < size; i++) {
      if (data[i].alliances.red.team_keys[0] == "frc75" || data[i].alliances.red.team_keys[1] == "frc75" || data[i].alliances.red.team_keys[2] == "frc75") {
          nameList.push(data[i].alliances.red.score);
          continue;
      }
      else if (data[i].alliances.blue.team_keys[0] == "frc75" || data[i].alliances.blue.team_keys[1] == "frc75" || data[i].alliances.blue.team_keys[2] == "frc75") {
        nameList.push(data[i].alliances.blue.score);
        continue;
    }
    }

  }).catch(error => console.error(error));

  const chartData = {
    labels: ['1', '2', '3', '4', '5', '6','7', '8', '9', '10', '11', '12','13', '14', '15', '16'],
    datasets: [
      {
        data: [82,105,58,92,114,92,88,129,83,74,68,96,115,93,98,112],
      },
    ],
  };
  return (
  <SafeAreaView>
    <View >

    <LineChart
  data={chartData}
  width={Dimensions.get('window').height - 50}
  height={Dimensions.get('window').width - 100}
  //yAxisLabel="$"
  //yAxisSuffix="k"
  chartConfig={{
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  }}
  bezier
  style={{
    marginVertical: 8,
    borderRadius: 16,
  }}
/>
</View>



  </SafeAreaView>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
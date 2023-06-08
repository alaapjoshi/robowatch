import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const data = [
    {"Game Piece": "cube", "Success/Fail": "1", "x.position": "5", "y.position": "1"},
    {"Game Piece": "cone", "Success/Fail": "1", "x.position": " 9", "y.position": "1"},
    {"Game Piece": "cone", "Success/Fail": "1", "x.position": " 6", "y.position": "1"},
    {"Game Piece": "cone", "Success/Fail": "1", "x.position": " 4", "y.position": "1"},
    {"Game Piece": "cone", "Success/Fail": "1", "x.position": " 7", "y.position": "1"}
  ];
  
  const ViewScout = () => {
    const cells = [];
    for (let y = 1; y <= 3; y++) {
      const row = [];
      for (let x = 1; x <= 9; x++) {
        const cellData = data.find(item => item['x.position'] === x.toString() && item['y.position'] === y.toString());
        row.push(
          <View key={`${x},${y}`} style={styles.cell}>
            {cellData && (
              <Text style={styles.cellText}>
                {cellData['Game Piece']} {cellData['Success/Fail']}
              </Text>
            )}
          </View>
        );
      }
      cells.push(<View key={y} style={styles.row}>{row}</View>);
    }
    return <View style={styles.container}>{cells}</View>;
  };
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: '#f0f0f0',
    },
    row: {
      flexDirection: 'row',
    },
    cell: {
      width: '11.1%',
      aspectRatio: 1,
      borderWidth: 1,
      borderColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cellText: {
      fontSize: 12,
      fontWeight: 'bold',
    },
  });
  
  export default ViewScout;
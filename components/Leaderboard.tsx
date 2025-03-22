import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VerticalBarChart = ({ data }) => {
  // Find the maximum value to scale the bars
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <View style={styles.container}>
        {data.map((item, index) => (
            <View key={index} style={styles.barContainer}>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.value}>{item.value}</Text>
                <View style={styles.bar}>
                    <View
                        style={{
                            height: (item.value / maxValue) * 100 + '%',
                            backgroundColor: 'blue',
                            borderTopLeftRadius: 20,
                            borderTopEndRadius: 20,
                            width: '100%',
                            marginTop: "auto"
                        }}
                    />
                </View>
            </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around', // To span the whole width
    // alignItems: 'flex-end',
    width: '100%', // To span the whole width,
    marginBottom: 0,
  },
  barContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    
  },
  bar: {
    width: 70,
    height: 150, // Adjust the height as needed
    // backgroundColor: '#ddd',
    borderRadius: 5,
    // overflow: 'hidden',
  },
  value: {
    fontSize: 14,
    // marginTop: 5,
  },
});

export default VerticalBarChart;

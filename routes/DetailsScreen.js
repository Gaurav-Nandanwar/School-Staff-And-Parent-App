// DetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const examData = ['JT-01', 'JT-02', 'JT-03'];

const DetailsScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.examBox}>
      <Text style={styles.examText}>{item}</Text>
      <TouchableOpacity style={styles.resultButton}>
        <Text style={styles.resultButtonText}>View Result</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Previous Exam Result</Text>
      <FlatList
        data={examData}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  examBox: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  examText: { fontSize: 16 },
  resultButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  resultButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default DetailsScreen;

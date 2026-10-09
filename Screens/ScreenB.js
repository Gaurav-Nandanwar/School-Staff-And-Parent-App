//result tab

import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,  // Add ScrollView import
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import BarChart from '../src/BarGraph';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: () => '#000',
};

const data = {
  labels: ['JT-01', 'JT-02', 'JT-03', 'JT-O4'],
  datasets: [
    {
      data: [93.7, 95.3, 79.7, 0.3],
    },
  ],
};

const examList = ['JT-01', 'JT-02', 'JT-03'];

const ScreenB = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const navigation = useNavigation();

  const renderExamBox = ({ item }) => (
    <View style={styles.examBox}>
      <Text style={styles.examText}>{item}</Text>
      <TouchableOpacity
        style={styles.resultButton}
        onPress={() => setSelectedTest(item)}
      >
        <Text style={styles.resultButtonText}>View Result</Text>
      </TouchableOpacity>
    </View>
  );

  const testResults = {
    'JT-01': {
      testCode: 'JT-01',
      mode: 'Offline',
      subjects: {
        Physics: 100,
        Chemistry: 78,
        Maths: 100,
      },
      total: 278,
      highest: { Physics: 100, Chemistry: 88, Maths: 100 },
      average: { Physics: 86, Chemistry: 68, Maths: 70 },
      pcmHighest: 281,
      pcmAverage: 225,
    },
    'JT-02': {
      testCode: 'JT-02',
      mode: 'Offline',
      subjects: {
        Physics: 100,
        Chemistry: 78,
        Maths: 100,
      },
      total: 278,
      highest: { Physics: 100, Chemistry: 88, Maths: 100 },
      average: { Physics: 86, Chemistry: 68, Maths: 70 },
      pcmHighest: 281,
      pcmAverage: 225,
    },
    'JT-03': {
      testCode: 'JT-03',
      mode: 'Offline',
      subjects: {
        Physics: 100,
        Chemistry: 78,
        Maths: 100,
      },
      total: 278,
      highest: { Physics: 100, Chemistry: 88, Maths: 100 },
      average: { Physics: 86, Chemistry: 68, Maths: 70 },
      pcmHighest: 281,
      pcmAverage: 225,
    },
  };

  return (
    <View style={styles.container}>
      {!showDetails && !selectedTest && (
        <>
          <Text style={styles.title}>REPORT CARD</Text>
          <View style={styles.infoBoxContainer}>
            <View style={styles.infoBox}>
              <Text style={styles.rankText}>2</Text>
              <Text>Out of 50 Students</Text>
            </View>
            <View style={[styles.statusBox, { backgroundColor: '#b6e3b6' }]}>
              <Text>Assignment Submission</Text>
              <Text></Text>
              <Text style={styles.statusText}>REGULAR</Text>
            </View>
            <View style={[styles.statusBox, { backgroundColor: '#f5c3c3' }]}>
              <Text>Attendance</Text>
              <Text></Text>
              <Text style={styles.statusText}>REGULAR</Text>
            </View>
          </View>
          <Text style={styles.remark}>Remark: NA</Text>
          <Text style={styles.graphTitle}>OVERALL GRAPHICAL ANALYSIS</Text>
          <LineChart
            data={data}
            width={screenWidth - 40}
            height={240}
            chartConfig={chartConfig}
            style={styles.chart}
          />
          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() => setShowDetails(true)}
          >
            <Text style={styles.viewDetailsText}>VIEW EXAM RESULT</Text>
          </TouchableOpacity>
        </>
      )}

      {showDetails && !selectedTest && (
        <>
          {/* Back to Report Card */}
          <TouchableOpacity onPress={() => setShowDetails(false)}>
            <Text style={styles.backButton}>← Back to Report Card</Text>
          </TouchableOpacity>
          <Text style={styles.subHeading}>Previous Exam Result</Text>

          <FlatList
            data={examList}
            renderItem={renderExamBox}
            keyExtractor={(item) => item}
          />
        </>
      )}

      {selectedTest && (
        <>
          {/* Detailed View for Selected Test */}
          <TouchableOpacity onPress={() => setSelectedTest(null)}>
            <Text style={styles.backButton}>← Back to Exam List</Text>
          </TouchableOpacity>
          <Text style={styles.title}>PREVIOUS EXAM RESULTS</Text>

          <ScrollView contentContainerStyle={styles.detailsContainer}>
            <View style={styles.testHeader}>
              <Text style={styles.testTitle}>{selectedTest}</Text>
              <Text>Test Code: {testResults[selectedTest].testCode}</Text>
              <Text>Test Mode: {testResults[selectedTest].mode}</Text>
            </View>
            <View style={styles.resultCard}>
              {Object.entries(testResults[selectedTest].subjects).map(([subject, score]) => (
                <Text key={subject} style={styles.subjectText}>
                  {subject}: {score}
                </Text>
              ))}
              <View style={styles.totalCircle}>
                <Text style={{ color: '#fff' }}>Marks</Text>
                <Text style={{ fontSize: 24, color: '#fff' }}>
                  {testResults[selectedTest].total}
                </Text>
                <Text style={{ color: '#fff' }}>Out of 300</Text>
              </View>
            </View>

            {/* Highest and Average Subject-wise */}
            {['Highest', 'Average'].map((type) => (
              <View key={type}>
                <Text style={styles.sectionHeading}>{`${type} Subject-wise`}</Text>
                {Object.entries(testResults[selectedTest][type.toLowerCase()]).map(([subject, score]) => (
                  <View style={[styles.subjectBox, { backgroundColor: '#5F83C7' }]} key={subject}>
                    <Text style={styles.subjectName}>{subject}</Text>
                    <Text style={styles.subjectScore}>{score}</Text>
                    <View style={styles.progressContainer}>
                      <View
                        style={[styles.progressBar, { width: `${(score / 100) * 100}%` }]}
                      />
                    </View>
                  </View>
                ))}
              </View>
            ))}

            {/* PCM Scores */}
            <View style={styles.pcmContainer}>
              <View style={[styles.pcmBox, { backgroundColor: 'red' }]}>
                <Text style={styles.pcmText}>{testResults[selectedTest].pcmHighest}</Text>
                <Text style={styles.pcmLabel}>Highest PCM/B</Text>
              </View>
              <View style={[styles.pcmBox, { backgroundColor: 'green' }]}>
                <Text style={styles.pcmText}>{testResults[selectedTest].pcmAverage}</Text>
                <Text style={styles.pcmLabel}>Avg PCM/B</Text>
              </View>
            </View>
            <BarChart />
          </ScrollView>
        </>

      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  detailsContainer: {
    paddingBottom: 10, // Adds space at the bottom for scrolling
  },
  infoBoxContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  infoBox: {
    width: '30%',
    backgroundColor: '#e0f7fa',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  rankText: { fontSize: 32, fontWeight: 'bold' },
  statusBox: {
    width: '30%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  statusText: { fontWeight: 'bold', fontSize: 16 },
  remark: { fontSize: 14, marginBottom: 10, backgroundColor: '#2795d3', padding: 10, borderRadius: 10, fontWeight: 'bold' },
  graphTitle: { fontWeight: 'bold', marginVertical: 10 },
  chart: { borderRadius: 10 },
  viewDetailsButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 25,
  },
  viewDetailsText: { color: '#fff', fontSize: 16 },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
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
  backButton: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 10,
  },
  testHeader: { alignItems: 'center', marginVertical: 10 },
  testTitle: { fontSize: 18, fontWeight: 'bold' },
  resultCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'column', // Aligning items in a column
    justifyContent: 'flex-start', // Align content at the start of the container
    alignItems: 'flex-start', // Align items to the start (left)
    width: '100%',
    height: 130,
  },
  subjectText: {
    fontWeight: 'bold', // Make the subject bold
    fontSize: 16,
    marginBottom: 5, // Space between subject/score pairs
  },
  totalCircle: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'purple',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeading: { marginTop: 15, fontWeight: 'bold' },
  pcmContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginBottom: 20,
  },
  pcmBox: {
    width: 100,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pcmText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  pcmLabel: { color: 'white', fontSize: 12 },
  subjectBox: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  subjectName: { fontWeight: 'bold', color: '#fff' },
  subjectScore: { fontSize: 16, color: '#fff' },
  progressContainer: {
    height: 5,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 5,
  },
  progressBar: {
    height: 5,
    backgroundColor: '#ff9800',
    borderRadius: 5,
  },
});

export default ScreenB;

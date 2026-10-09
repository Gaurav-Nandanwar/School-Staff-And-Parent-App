//fees tab

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Dimensions.get('window').width;

const monthsData = [
  { month: 'January', status: 'Paid' },
  { month: 'February', status: 'UnPaid' },
  { month: 'March', status: 'Paid' },
  { month: 'April', status: 'UnPaid' },
  { month: 'May', status: 'Paid' },
  { month: 'June', status: 'Paid' },
  { month: 'July', status: 'UnPaid' },
];

function getRandomAmount() {
  return Math.floor(10000 + 9000);
}

const FeeBox = ({ item, expanded, toggleExpand }) => {
  return (
    <View style={styles.feeBox}>
      <View style={styles.feeBoxHeader}>
        <Text style={styles.monthText}>{item.month}</Text>
        <View style={styles.statusAndButton}>
          <View
            style={[
              styles.statusBox,
              item.status === 'Paid' ? styles.paidBox : styles.unpaidBox,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                item.status === 'Paid' ? styles.paidText : styles.unpaidText,
              ]}
            >
              {item.status}
            </Text>
          </View>
          <TouchableOpacity onPress={toggleExpand}>
            <Icon
              name={expanded ? 'expand-less' : 'expand-more'}
              size={28}
              color="#333"
            />
          </TouchableOpacity>
        </View>
      </View>
      {expanded && (
        <View style={styles.feeDetails}>
          <View style={styles.feeRow}>
            <Text>Monthly Fee</Text>
            <Text style={styles.feeValue}>₹2,000</Text>
          </View>
          <View style={styles.feeRow}>
            <Text>Admission Fee</Text>
            <Text style={styles.feeValue}>₹1,500</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.feeRow}>
            <Text style={{ fontWeight: 'bold' }}>Total Fee</Text>
            <Text style={[styles.feeValue, { fontWeight: 'bold' }]}>₹3,500</Text>
          </View>
        </View>
      )}

    </View>
  );
};

export default function ScreenC() {
  const [expandedMonth, setExpandedMonth] = useState(null);
  const balance = getRandomAmount();

  const toggleExpand = (month) => {
    setExpandedMonth(expandedMonth === month ? null : month);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.balanceLabel}>Your Balance</Text>
        <Text style={styles.balanceAmount}>₹{balance}</Text>
        <Text style={styles.lastPayment}>Last payment: ₹3,500</Text>
      </View>

      <Pressable
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => [
          styles.schoolLabelContainer,
          { opacity: pressed ? 0.8 : 1 },
        ]}
      >
        <Text style={styles.schoolLabel}>School Fees</Text>
      </Pressable>

      <View style={styles.monthsContainer}>
        {monthsData.map((item) => (
          <FeeBox
            key={item.month}
            item={item}
            expanded={expandedMonth === item.month}
            toggleExpand={() => toggleExpand(item.month)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 28,
  },
  balanceLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
  },
  lastPayment: {
    fontSize: 16,
    color: '#888',
  },
  schoolLabelContainer: {
    backgroundColor: '#5f83c7',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 50,
    marginBottom: 18,
    alignSelf: 'flex-start',
    elevation: 2,
  },
  schoolLabel: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthsContainer: {
    flexDirection: 'column',
    rowGap: 5, // smaller gap
  },
  feeBox: {
    borderWidth: 1.2,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 16,
    marginBottom: 4,
    backgroundColor: '#fff',
    elevation: 1,
  },
  feeBoxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 18,
    fontWeight: '500',
  },
  statusAndButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBox: {
    height: 25,
    width: 70,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  paidBox: {
    backgroundColor: '#d4f7d6',
  },
  unpaidBox: {
    backgroundColor: '#fddede',
  },
  statusText: {
    fontWeight: '600',
    fontSize: 13,
  },
  paidText: {
    color: 'green',
  },
  unpaidText: {
    color: 'red',
  },
  feeDetails: {
    marginTop: 12,
    paddingLeft: 10,
  },
  feeDetails: {
    marginTop: 12,
    paddingLeft: 10,
    paddingRight: 10,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  feeValue: {
    textAlign: 'right',
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 6,
  },

});

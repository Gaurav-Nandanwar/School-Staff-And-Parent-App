import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const NotificationsScreen = () => {
  // Sample notification data - replace with your actual data
  const notifications = [
    { id: '1', title: 'New assignment', message: 'Physics assignment due tomorrow' },
    { id: '2', title: 'Fee reminder', message: 'Please pay your quarterly fees' },
    { id: '3', title: 'Holiday notice', message: 'School closed on Monday for Republic Day' },
    // Add more notifications as needed
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationMessage}>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  notificationItem: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#555',
  },
});

export default NotificationsScreen;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageDetail = ({ route }) => {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{user.name}</Text>
      <Text style={styles.message}>{user.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
  },
});

export default MessageDetail;

import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const categories = [
    { id: '1', icon: 'home', title: 'Home' },
    { id: '2', icon: 'users', title: 'Users' },
    { id: '3', icon: 'cogs', title: 'Settings' },
    { id: '4', icon: 'calendar', title: 'Calendar' },
    { id: '5', icon: 'chart-bar', title: 'Analytics' },
    { id: '6', icon: 'bell', title: 'Notifications' },
    { id: '7', icon: 'folder', title: 'Documents' },
    { id: '8', icon: 'comments', title: 'Messages' },
    { id: '9', icon: 'camera', title: 'Camera' },
    { id: '10', icon: 'user-cog', title: 'Admin' },
    { id: '11', icon: 'clipboard-list', title: 'Tasks' },
    { id: '12', icon: 'rocket', title: 'Launch' },
    { id: '13', icon: 'cloud', title: 'Cloud' },
    { id: '14', icon: 'question-circle', title: 'Help' },
    { id: '15', icon: 'folder-open', title: 'Files' },
    { id: '16', icon: 'bitcoin', title: 'Bitcoin' },
  ];
  
  const CategoryTab = () => {
    return (
          <View style={styles.container}>
            <FlatList
              data={categories}
              renderItem={({ item }) => (
                <View style={styles.box1}>
                  <FontAwesome5 name={item.icon} size={30} color="#5F83C7" />
                  <Text style={styles.title}>{item.title}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
              numColumns={4}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        );
  };

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
      },
      listContainer: {
        justifyContent: 'space-between',
        paddingBottom: 10,
      },
      box1: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        margin: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        height: 100,  // Set the height for each box
        borderColor: '#5F83C7',
        borderWidth: 1,
      },
      title: {
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 5,
        textAlign: 'center',
        flexWrap: 'wrap',
        textAlignVertical: 'auto',
        width: '165%',
        color: '#000'
      },
  });
  
  export default CategoryTab;

import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, FlatList, StyleSheet, TextInput, Image,
  TouchableOpacity, Animated, Easing, KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const dummyMessages = [
  {
    id: '1',
    name: 'Alice',
    message: 'Hey! Are we meeting today?',
    time: '10:15 AM',
    image: require('../assets/profile1.png'),
  },
  {
    id: '2',
    name: 'Bob',
    message: 'Sent you the documents.',
    time: '09:42 AM',
    image: require('../assets/profile2.png'),
  },
  {
    id: '3',
    name: 'Charlie',
    message: 'Let me know your thoughts.',
    time: '11:30 AM',
    image: require('../assets/profile3.png'),
  },
  {
    id: '4',
    name: 'Daisy',
    message: 'Thanks for your help!',
    time: '12:05 PM',
    image: require('../assets/profile4.png'),
  },
  {
    id: '5',
    name: 'Guddu',
    message: 'Thanks bruh!',
    time: '2:45 PM',
    image: require('../assets/profile5.png'),
  },
];

const dummyNotifications = [
  'New message from Admin',
  'Reminder: Submit your form',
  'Update available for download',
];

const MessagesTab = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [replyText, setReplyText] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const animateIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (selectedMessage) animateIn();
  }, [selectedMessage]);

  const renderSearchHeader = () => (
    <View style={styles.searchWrapper}>
      <View style={styles.searchContainer}>
        <FontAwesome5 name="search" size={16} color="#555" style={styles.searchIcon} />
        <TextInput placeholder="Search" style={styles.searchInput} placeholderTextColor="#999" />
      </View>
      <TouchableOpacity style={styles.bellCircle} onPress={() => setShowNotifications(!showNotifications)}>
        <FontAwesome5 name="bell" size={18} color="#fff" />
      </TouchableOpacity>
      {showNotifications && (
        <View style={styles.notificationDropdown}>
          {dummyNotifications.map((note, index) => (
            <Text key={index} style={styles.notificationItem}>{note}</Text>
          ))}
        </View>
      )}
    </View>
  );

  const renderMessageDetail = () => (
    <KeyboardAvoidingView
      style={styles.messageDetailContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <TouchableOpacity onPress={() => setSelectedMessage(null)} style={styles.backButton}>
            <FontAwesome5 name="arrow-left" size={18} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.messageDetailTitle}>{selectedMessage.name}</Text>
          <Text style={styles.messageDetailText}>{selectedMessage.message}</Text>
        </ScrollView>
      </Animated.View>

      {/* 📥 Reply Box pinned at the bottom */}
      <View style={styles.replyBoxContainer}>
        <View style={styles.replyBox}>
          <TextInput
            value={replyText}
            onChangeText={setReplyText}
            style={styles.replyInput}
            placeholder="Type your message..."
            placeholderTextColor="#666"
          />
          <TouchableOpacity onPress={() => setReplyText('')}>
            <FontAwesome5 name="paper-plane" size={20} color="#4c6bbf" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );

  return (
    <View style={styles.container}>
      {renderSearchHeader()}
      {selectedMessage ? renderMessageDetail() : (
        <FlatList
          data={dummyMessages}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.chatBox} onPress={() => setSelectedMessage(item)}>
              <Image source={item.image} style={styles.profilePic} />
              <View style={styles.chatContent}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatMessage}>{item.message}</Text>
              </View>
              <Text style={styles.chatTime}>{item.time}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchWrapper: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, height: 40 },
  bellCircle: {
    marginLeft: 10,
    backgroundColor: '#5F83C7',
    padding: 10,
    borderRadius: 25,
  },
  notificationDropdown: {
    position: 'absolute',
    top: 60,
    right: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
    width: 220,
    zIndex: 1,
  },
  notificationItem: {
    fontSize: 14,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  chatBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 10,
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    elevation: 1,
  },
  profilePic: { width: 50, height: 50, borderRadius: 25 },
  chatContent: { flex: 1, marginHorizontal: 10 },
  chatName: { fontSize: 16, fontWeight: 'bold' },
  chatMessage: { fontSize: 14, color: '#555' },
  chatTime: { fontSize: 12, color: '#888' },
  messageDetailContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 20,
    backgroundColor: '#4c6bbf',
    padding: 10,
    borderRadius: 50,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
  },
  messageDetailTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, marginHorizontal: 20 },
  messageDetailText: { fontSize: 16, color: '#000', marginBottom: 20, marginHorizontal: 20 },
  replyBoxContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  replyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
  },
  replyInput: { flex: 1, marginRight: 10 },
});

export default MessagesTab;

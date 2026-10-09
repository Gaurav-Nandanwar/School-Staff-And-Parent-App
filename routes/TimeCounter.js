import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { TouchableOpacity } from 'react-native';
export default function TimeCounter() {
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false); // To toggle between start/stop

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1); 
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval); 
    }
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [isRunning, time]);

  const toggleTimer = () => {
    setIsRunning(!isRunning); // Toggle between start and stop
  };

  return (
    <View style={styles.body}>
      <View style={styles.box}>
        
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(time)}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: isRunning ? '#FF6F61' : '#1F8f61' }]}
        onPress={toggleTimer}
      >
        <Text style={styles.buttonText}>{isRunning ? 'Stop Timer' : 'Start Timer'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // This makes the timer appear in the top-right corner
                  // Distance from the top of the screen           // Distance from the right side of the screen
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  timeBox: {
    padding: 15,
    backgroundColor: '#5F83C7',
    borderRadius: 10,
    
  },
  timeText: {
    fontSize: 33,
    fontWeight: 'bold',
    color: '#5F83C7',
    marginRight:10
  },
  
  button: {
    marginTop: 5,
    marginRight:8, // Space above the button
    paddingVertical: 5, // Vertical padding for the button
    borderRadius: 10, // Rounded corners for the button
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.8, // Shadow opacity
    shadowRadius: 3, // Shadow radius
  },
  buttonText: {
    color: '#fff', // White text color
    fontSize: 18, // Font size for the button text
    fontWeight: 'bold', // Bold text
  },
});



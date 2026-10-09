import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HomeTab from '../components/HomeTab';
import CategoryTab from '../components/CategoryTab';
import QrTab from '../components/QrTab';
import MessagesTab from '../components/MessagesTab';
import ProfileTab from '../components/ProfileTab';

import { navigationRef } from '../routes/RootNavigation';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        tabBarActiveTintColor: '#C4C4C4',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#5F83C7',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab" // Changed from "Home" to "HomeTab"
        component={HomeTab}
        options={{
          tabBarLabel: 'Home', // Keep the label as "Home" for UI
          tabBarIcon: () => <FontAwesome5 name="home" size={20} color="#fff" />,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoryTab}
        options={{
          tabBarIcon: () => <FontAwesome5 name="th-large" size={20} color="#fff" />,
        }}
      />
      <Tab.Screen
        name="QR"
        component={QrTab}
        options={{
          tabBarIcon: () => <FontAwesome5 name="qrcode" size={20} color="#fff" />,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesTab}
        options={{
          tabBarIcon: () => <FontAwesome5 name="envelope-open-text" size={20} color="#fff" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTab}
        options={{
          tabBarIcon: () => <FontAwesome5 name="user-alt" size={20} color="#fff" />,
        }}
      />
    </Tab.Navigator>
  );
};

const ScreenA = ({ route }) => {
  const [tabKey, setTabKey] = useState(0); // key for forcing BottomTabs reset

  useFocusEffect(
    React.useCallback(() => {
      setTabKey(prevKey => prevKey + 1); // re-render BottomTabs to reset to Home

      setTimeout(() => {
        if (navigationRef.isReady()) {
          navigationRef.navigate('HomeTab'); // Updated to match the new screen name
        }
      }, 50);

    }, [])
  );

  return <BottomTabs key={tabKey} />;
};

export default ScreenA;
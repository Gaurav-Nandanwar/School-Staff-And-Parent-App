import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import BarChartScreen from './src/BarGraph';

import ScreenA from './screens/ScreenA';
import ScreenB from './screens/ScreenB';
import ScreenC from './screens/ScreenC';
import ScreenD from './screens/ScreenD';
import ScreenE from './screens/ScreenE';
import ScreenF from './screens/ScreenF';

import MessageDetail from './routes/MessageDetail';
import { navigationRef } from './routes/RootNavigation';

import DetailsScreen from './routes/DetailsScreen';
import BarGraph from './src/BarGraph';
import NotificationsScreen from './routes/NotificationsScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Sample notification data - this would typically come from your app's state or context
const notificationCount = 3;

// Custom header with bell icon and notification counter
const CustomHeaderTitle = ({ navigation }) => (
  <View style={styles.headerRow}>
    <View style={styles.headerTextContainer}>
      <Text style={styles.headerText1}>Home</Text>
    </View>
    <Text style={styles.classText}>KARAN    XII - A</Text>
    <TouchableOpacity 
      style={styles.bellIconContainer}
      onPress={() => navigation.navigate('Notifications')}
    >
      <FontAwesome5 name="bell" size={24} color="#fff" />
      {notificationCount > 0 && (
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationCount}>{notificationCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  </View>
);

// Custom drawer content with profile image
const CustomDrawerContent = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.drawerProfileContainer}>
        <Image 
          source={require('./assets/profile.png')} 
          style={styles.drawerProfileImage} 
        />
        <Text style={styles.drawerProfileName}>Madhur Sharma</Text>
      </View>
      <View style={{ flex: 1, marginTop: 20 }}>
        {props.state.routes.map((route, index) => {
          const { options } = props.descriptors[route.key];
          const label = options.drawerLabel || options.title || route.name;
          const isFocused = props.state.index === index;
          
          const onPress = () => {
            const event = props.navigation.emit({
              type: 'drawerItemPress',
              target: route.key,
            });
            if (!isFocused && !event.defaultPrevented) {
              props.navigation.navigate(route.name);
            }
          };
          
          // Get the drawer icon from options
          let drawerIcon;
          if (options.drawerIcon) {
            drawerIcon = options.drawerIcon({ focused: isFocused });
          }
          
          return (
            <TouchableOpacity
              key={route.key}
              style={[
                styles.drawerItem,
                isFocused && styles.drawerItemFocused
              ]}
              onPress={onPress}
            >
              <View style={styles.drawerIconContainer}>
                {drawerIcon}
              </View>
              <Text style={styles.drawerItemLabel}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// Drawer Navigator wrapped inside a functional component
const DrawerScreens = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      headerTitleAlign: 'left',
      headerShown: true,
      headerStyle: { 
        backgroundColor: '#5F83C7', 
        elevation: 0,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
      },
      headerTintColor: '#fff',
      drawerPosition: 'left',
      drawerType: 'front',
      drawerStyle: {
        marginTop: 24,
        backgroundColor: '#5F83C7',
        width: 270,
        borderTopRightRadius: 80,
        borderBottomRightRadius: 80,
      },
      drawerLabelStyle: { fontSize: 15, color: 'white' },
      drawerActiveTintColor: 'black',
      drawerInactiveTintColor: 'gray',
      drawerItemStyle: { marginVertical: 1, marginTop: 10 },
    }}
  >
    <Drawer.Screen
      name="Home"
      component={ScreenA}
      options={({ navigation }) => ({
        drawerIcon: () => <FontAwesome5 name="home" size={20} color="#fff" />,
        headerTitle: () => <CustomHeaderTitle navigation={navigation} />,
      })}
    />
    <Drawer.Screen
      name="Results"
      component={ScreenB}
      options={{
        drawerIcon: () => <FontAwesome5 name="book-open" size={20} color="#fff" />,
        headerTitle: 'Results',
      }}
    />
    <Drawer.Screen
      name="Fees"
      component={ScreenC}
      options={{
        drawerIcon: () => <FontAwesome5 name="rupee-sign" size={20} color="#fff" />,
        headerTitle: 'Fees',
      }}
    />
    <Drawer.Screen
      name="Study Material"
      component={ScreenD}
      options={{
        drawerIcon: () => <FontAwesome5 name="book" size={20} color="#fff" />,
        headerTitle: 'Study Material',
      }}
    />
    <Drawer.Screen
      name="Contact Us"
      component={ScreenE}
      options={{
        drawerIcon: () => <FontAwesome5 name="phone" size={20} color="#fff" />,
        headerTitle: 'Contact Us',
      }}
    />
    <Drawer.Screen
      name="Log In / Sign Up"
      component={ScreenF}
      options={{
        drawerIcon: () => <FontAwesome5 name="user" size={20} color="#fff" />,
        headerTitle: 'Log In / Sign Up',
      }}
    />
  </Drawer.Navigator>
);

// Create a Notifications Screen with a back button in header
const NotificationsScreenWithHeader = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="NotificationsContent"
        component={NotificationsScreen}
        options={{
          title: '   Notifications',
          headerStyle: {
            backgroundColor: '#5F83C7',
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <FontAwesome5 name="arrow-left" size={20} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <>
      <StatusBar style="auto" backgroundColor="#5F83C7" />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Drawer" component={DrawerScreens} />
          <Stack.Screen name="MessageDetail" component={MessageDetail} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="BarChart" component={BarGraph} options={{ title: 'Bar Chart' }} />
          <Stack.Screen name="Notifications" component={NotificationsScreenWithHeader} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerTextContainer: {
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerText1: {
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: '#fff',
  },
  bellIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',  // To position the badge properly
  },
  classText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 150,
    fontWeight: 'bold',
  },
  backButton: {
    marginLeft: 5,
    padding: 1,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF4040',  // Red color for notification badge
    width: 18,
    height: 18,
    borderRadius: 9,  // Make it a circle
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  notificationCount: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  drawerProfileContainer: {
    paddingTop: 30,
    paddingBottom: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  drawerProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
  },
  drawerProfileName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  drawerItemFocused: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  drawerIconContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 24,
  },
  drawerItemLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default App;
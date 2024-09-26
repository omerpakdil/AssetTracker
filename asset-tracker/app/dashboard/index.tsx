import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DashboardHomeScreen from '../../components/DashboardHomeScreen';
import AssetsScreen from '../../components/AssetsScreen';
import AlarmsScreen from '../../components/AlarmsScreen';
import ProfileScreen from '../../components/ProfileScreen';
import { useRouter } from 'expo-router';
import { isTokenValid } from '../../utils/auth';

const Tab = createBottomTabNavigator();

export default function DashboardLayout() {

  const router = useRouter();

   useEffect(() => {
    const checkToken = () => {
      if (!isTokenValid()) {
        router.push('/');
      }
    };

    checkToken();
  }, []);

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = '';

            if (route.name === 'Home') {
              return <Ionicons name="home" size={size} color={color} />;
            } else if (route.name === 'Assets') {
              return <Ionicons name="briefcase" size={size} color={color} />;
            } else if (route.name === 'Alarms') {
              return <Ionicons name="alarm" size={size} color={color} />;
            } else if (route.name === 'Profile') {
              return <Ionicons name="person" size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: '#4A4A4A',
          tabBarInactiveTintColor: '#8e8e8e',
          headerShown: false 
        })}
      >
        <Tab.Screen name="Home" component={DashboardHomeScreen} />
        <Tab.Screen name="Assets" component={AssetsScreen} />
        <Tab.Screen name="Alarms" component={AlarmsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

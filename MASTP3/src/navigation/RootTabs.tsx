import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import AddItemScreen from '../screens/AddItemScreen';
import MenuListScreen from '../screens/MenuListScreen';
import ItemDetailsScreen from '../screens/ItemDetailsScreen';
import ManageMenuScreen from '../screens/ChefPanelScreen';
import FilterMenuScreen from '../screens/FilterScreen';

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#A0A0A0',
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          height: 70,
          backgroundColor: '#FFFFFF',
          borderRadius: 25,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.15,
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginTop: -2,
          marginBottom: 2,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'ManageMenu') {
            iconName = focused ? 'albums' : 'albums-outline';
          } else if (route.name === 'Create Dish') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'My Menu') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Filter') {
            iconName = focused ? 'funnel' : 'funnel-outline';
          }

          return (
            <View style={[
              styles.iconContainer,
              focused && styles.iconContainerActive
            ]}>
              <Ionicons 
                name={iconName} 
                size={focused ? 26 : 24} 
                color={color} 
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          tabBarLabel: 'Home',
        }} 
      />
      <Tab.Screen 
        name="ManageMenu" 
        component={ManageMenuScreen} 
        options={{ 
          tabBarLabel: 'Manage',
        }} 
      />
      <Tab.Screen 
        name="Create Dish" 
        component={AddItemScreen} 
        options={{ 
          tabBarLabel: 'Create',
        }} 
      />
      <Tab.Screen 
        name="My Menu" 
        component={MenuListScreen} 
        options={{ 
          tabBarLabel: 'My Menu',
        }} 
      />
      <Tab.Screen 
        name="Filter" 
        component={FilterMenuScreen} 
        options={{ 
          tabBarLabel: 'Filter',
        }} 
      />
      <Tab.Screen 
        name="ItemDetails" 
        component={ItemDetailsScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 36,
    borderRadius: 12,
  },
  iconContainerActive: {
    backgroundColor: '#FFE8E8',
  },
});
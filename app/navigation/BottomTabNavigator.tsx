import * as React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Button, Icon} from '@rneui/base';
import {ActiveStack, DashboardStack, CompletedStack} from './StackNavigator';

const Tab = createBottomTabNavigator();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          const adjustedSize = focused ? size + 6 : size;

          if (route.name === 'Dashboard') {
            return (
              <Icon
                type="material-community"
                name="view-dashboard"
                size={adjustedSize}
                color={focused ? '#FFB5A7' : color}
              />
            );
          } else if (route.name === 'Active') {
            return (
              <Icon
                type="font-awesome-5"
                name="tasks"
                size={adjustedSize}
                color={focused ? '#B9FBC0' : color}
              />
            );
          } else if (route.name === 'Completed') {
            return (
              <Icon
                type="material-community"
                name="clipboard-check-multiple-outline"
                size={adjustedSize}
                color={focused ? '#90DBF4' : color}
              />
            );
          }
        },
        headerShown: false,
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      <Tab.Screen name="Active" component={ActiveStack} />
      <Tab.Screen name="Completed" component={CompletedStack} />
    </Tab.Navigator>
  );
}

/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Dashboard} from '../screens/Dashboard/Dashboard';
import {Active} from '../screens/Active/Active';
import {Completed} from '../screens/Completed/Completed';

export type StackParamList = {
  DashboardScreen: undefined;
  ActiveScreen: undefined;
  CompletedScreen: undefined;
};

const Stack = createStackNavigator<StackParamList>();

export function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DashboardScreen"
        component={Dashboard}
        options={{
          headerTitle: 'Dashboard',
          headerTitleStyle: {
            color: '#FFB5A7',
            fontWeight: '700',
            letterSpacing: 1.1,
          }
        }}
      />
    </Stack.Navigator>
  );
}

export function ActiveStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ActiveScreen"
        component={Active}
        options={{
          headerTitle: 'Active Tasks',
          headerTitleStyle: {
            color: '#B9FBC0',
            fontWeight: '700',
            letterSpacing: 1.1,
          }
        }}
      />
    </Stack.Navigator>
  );
}



export function CompletedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CompletedScreen"
        component={Completed}
        options={{
          headerTitle: 'Completed Tasks',
          headerTitleStyle: {
            color: '#90DBF4',
            fontWeight: '700',
            letterSpacing: 1.1,
          }
        }}
      />
    </Stack.Navigator>
  );
}

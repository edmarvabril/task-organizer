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
          headerStyle: {
            backgroundColor: '#B9FBC0',
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
          headerStyle: {
            backgroundColor: '#90DBF4',
          }
        }}
      />
    </Stack.Navigator>
  );
}

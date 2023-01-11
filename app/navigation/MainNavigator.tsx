import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomTabNavigator} from './BottomTabNavigator';

type Props = {};

export const MainNavigator = (props: Props) => {
  return <BottomTabNavigator />;
};

const styles = StyleSheet.create({
  //
});

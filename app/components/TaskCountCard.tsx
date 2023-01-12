import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  count: number;
  label: string;
  colorCode: string;
};

const TaskCountCard = ({count, label, colorCode}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, {color: colorCode}]}>{label}</Text>
      <Text style={[styles.count, {color: colorCode}]}>{count}</Text>
    </View>
  );
};

export default TaskCountCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  label: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowRadius: 1,
    textShadowOffset: {
      height: 1.1,
      width: 0.2,
    },
    textShadowColor: 'dimgrey',
  },
  count: {
    fontSize: 70,
    fontWeight: '600',
    textShadowRadius: 1,
    textShadowOffset: {
      height: 1.1,
      width: 0.2,
    },
    textShadowColor: 'dimgrey',
  }
});

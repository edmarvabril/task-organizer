import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';

import {daysOfWeek, months} from '../constants/dates';

type Props = {};

const BannerCard = (props: Props) => {
  const today = new Date();
  const dayOfWeek = daysOfWeek[today.getDay()];
  const month = months[today.getMonth()];
  const day = today.getDay();
  const hour = today.getHours();

  const timeOfDay = useMemo(() => {
    if (hour < 12) {
      return 'morning';
    } else if (hour < 18) {
      return 'afternoon';
    } else {
      return 'evening';
    }
  }, [hour]);

  return (
    <View style={styles.container}>
      <View style={styles.dates}>
        <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
        <Text style={styles.dateText}>{`${month} ${day}`}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Good {timeOfDay}!</Text>
        <Text style={styles.text}>here are your tasks overview.</Text>
      </View>
    </View>
  );
};

export default BannerCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-around',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  dates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayOfWeek: {
    fontSize: 18,
    letterSpacing: 1,
    color: '#F07167',
  },
  dateText: {
    fontSize: 18,
    color: '#F07167',
  },
  textContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    color: '#0081A7',
    fontWeight: '500',
  },
});

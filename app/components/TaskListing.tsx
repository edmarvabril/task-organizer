import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {sortBy} from 'lodash';

import TaskListItem from './TaskListItem';
import {TaskDetails} from '../store/slices/taskSlice';

type Props = {
  data: TaskDetails[];
  onTaskPress: (item: TaskDetails) => void;
};

const TaskListing = ({data, onTaskPress}: Props) => {
  const [sortedBy, setSortedBy] = useState<'name' | 'prio'>('prio');

  const sortedData = useMemo(() => {
    if (sortedBy === 'name') {
      return sortBy(data, item => item.title);
    } else if (sortedBy === 'prio') {
      return sortBy(data, item => item.urgency);
    }
  }, [data, sortedBy]);

  return (
    <View>
      <View style={styles.sortContainer}>
        <Text style={styles.label}>Sort by</Text>
        <View style={styles.buttonsContainer}>
          <Pressable
            onPress={() => setSortedBy('prio')}
            style={[
              styles.button,
              sortedBy === 'prio' && {backgroundColor: '#0081A7'},
            ]}>
            <Text style={sortedBy === 'prio' && {color: '#fff'}}>Priority</Text>
          </Pressable>
          <Pressable
            onPress={() => setSortedBy('name')}
            style={[
              styles.button,
              sortedBy === 'name' && {backgroundColor: '#0081A7'},
            ]}>
            <Text style={sortedBy === 'name' && {color: '#fff'}}>Name</Text>
          </Pressable>
        </View>
      </View>
      <FlatList
        data={sortedData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TaskListItem onTaskPress={() => onTaskPress(item)} task={item} />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default TaskListing;

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 100,
    paddingTop: 10,
  },
  sortContainer: {
    flexDirection: 'row',
    margin: 15,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flex: 2,
  },
  label: {
    flex: 1,
    fontSize: 18,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 3,
    borderRadius: 3,
    borderColor: 'dimgrey',
    paddingVertical: 3,
    backgroundColor: '#fff',
  },
});

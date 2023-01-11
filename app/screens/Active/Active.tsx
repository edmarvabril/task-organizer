import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';

import {RootState} from '../../store/store';
import {FlatList} from 'react-native-gesture-handler';
import TaskListItem from '../../components/TaskListItem';
import {Icon} from '@rneui/base';
import TaskModal from '../../components/TaskModal';
import {selectTask, TaskDetails} from '../../store/slices/taskSlice';

type Props = {};

export const Active = (props: Props) => {
  const dispatch = useDispatch();

  const tasksList = useSelector((state: RootState) =>
    state.task.tasks.filter(item => !item.isCompleted),
  );

  const [showTaskModal, setShowTaskModal] = useState(false);

  const onTaskPress = useCallback(
    (item: TaskDetails) => {
      dispatch(selectTask(item));
      setShowTaskModal(true);
    },
    [dispatch],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasksList}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TaskListItem onTaskPress={() => onTaskPress(item)} task={item} />
        )}
        contentContainerStyle={{paddingBottom: 100}}
      />
      <TouchableOpacity
        onPress={() => setShowTaskModal(true)}
        style={styles.addButton}>
        <Icon type="material" name="add-task" color="#fff" size={36} />
      </TouchableOpacity>
      <TaskModal
        visible={showTaskModal}
        closeModal={() => setShowTaskModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#B9FBC0',
    flex: 1,
  },
  addButton: {
    backgroundColor: '#0081A7',
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {RootState} from '../../store/store';
import {Icon} from '@rneui/base';
import TaskModal from '../../components/TaskModal';
import {selectTask, TaskDetails} from '../../store/slices/taskSlice';
import TaskListing from '../../components/TaskListing';

type Props = {};

export const Active = ({}: Props) => {
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
      <TaskListing data={tasksList} onTaskPress={onTaskPress} />
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
  listContainer: {
    paddingBottom: 100,
    paddingTop: 10,
  },
});

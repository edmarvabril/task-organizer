import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import TaskListItem from '../../components/TaskListItem';
import {RootState} from '../../store/store';
import TaskModal from '../../components/TaskModal';
import {TaskDetails, selectTask} from '../../store/slices/taskSlice';

type Props = {};

export const Completed = (props: Props) => {
  const dispatch = useDispatch();

  const tasksList = useSelector((state: RootState) =>
    state.task.tasks.filter(item => item.isCompleted),
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
      <TaskModal
        visible={showTaskModal}
        closeModal={() => setShowTaskModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#90DBF4',
    flex: 1,
  },
});

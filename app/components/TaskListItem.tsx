import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useCallback} from 'react';
import {deleteTask, TaskDetails, updateTask} from '../store/slices/taskSlice';
import {Icon} from '@rneui/base';
import {useDispatch} from 'react-redux';
import Animated, {FadeInUp, SlideOutLeft} from 'react-native-reanimated';

type Props = {
  task: TaskDetails;
  onTaskPress: () => void;
};

const TaskListItem = ({task, onTaskPress}: Props) => {
  const dispatch = useDispatch();

  const onDeletePress = useCallback(() => {
    Alert.alert('', 'Are you sure you want to delete this task?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => {
          dispatch(deleteTask(task.id));
        },
      },
    ]);
  }, [dispatch, task]);

  const onCompletePress = useCallback(() => {
    Alert.alert(
      '',
      `Mark this task as ${task.isCompleted ? 'active' : 'completed'}?`,
      [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: () => {
            dispatch(
              updateTask({
                ...task,
                isCompleted: !task.isCompleted,
              }),
            );
          },
        },
      ],
    );
  }, [dispatch, task]);

  return (
    <Animated.View entering={FadeInUp} exiting={SlideOutLeft}>
      <TouchableOpacity onPress={onTaskPress} style={[styles.container]}>
        <View style={styles.taskInfo}>
          <View>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.desc}>{task.description}</Text>
          </View>
          <Text style={styles.urgency}>Priority: {task.urgency}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={onCompletePress}>
            <Icon
              type="feather"
              name={task.isCompleted ? 'circle' : 'check-circle'}
              size={26}
              color={task.isCompleted ? '#B9FBC0' : '#90DBF4'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeletePress}>
            <Icon type="feather" name="trash" size={26} color="#F07167" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default TaskListItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 8,
    minHeight: 90,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  taskInfo: {
    flex: 6,
    justifyContent: 'space-between',
  },
  buttons: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  desc: {
    fontStyle: 'italic',
    marginBottom: 5,
  },
  urgency: {
    color: '#F07167',
  },
});

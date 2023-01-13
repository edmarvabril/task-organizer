import {StyleSheet, View} from 'react-native';
import React from 'react';
import BannerCard from '../../components/BannerCard';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import TaskCountCard from '../../components/TaskCountCard';

type Props = {};

export const Dashboard = ({}: Props) => {
  const allTasks = useSelector((state: RootState) => state.task.tasks);

  const totalTasksCount = allTasks.length;
  const activeTasksCount = allTasks.filter(item => !item.isCompleted).length;
  const completedTasksCount = allTasks.filter(item => item.isCompleted).length;

  return (
    <View style={styles.container}>
      <BannerCard />
      <View style={styles.taskCountCardContainer}>
        <TaskCountCard
          label="ACTIVE"
          count={activeTasksCount}
          colorCode="#B9FBC0"
        />
        <TaskCountCard
          label="COMPLETED"
          count={completedTasksCount}
          colorCode="#90DBF4"
        />
      </View>
      <View style={styles.taskCountCardContainer}>
        <TaskCountCard
          label="TOTAL"
          count={totalTasksCount}
          colorCode="#0081A7"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFB5A7',
    flex: 1,
    justifyContent: 'center',
  },
  taskCountCardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '30%',
    marginTop: 20,
  },
});

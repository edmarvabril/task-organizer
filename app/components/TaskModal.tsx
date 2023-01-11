import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../store/store';
import {
  addTask,
  selectTask,
  TaskDetails,
  updateTask,
} from '../store/slices/taskSlice';

type Props = {
  visible: boolean;
  closeModal: () => void;
};

const TaskModal = ({visible, closeModal}: Props) => {
  const dispatch = useDispatch();

  const selectedTask = useSelector(
    (state: RootState) => state.task.selectedTask,
  );

  console.log({selectedTask});

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<TaskDetails['urgency']>(1);

  useEffect(() => {
    setTitle(selectedTask?.title ?? '');
    setDescription(selectedTask?.description ?? '');
    setUrgency(selectedTask?.urgency ?? 1);
  }, [selectedTask]);

  const resetForm = useCallback(() => {
    setTitle('');
    setDescription('');
    setUrgency(1);
    dispatch(selectTask(undefined));
  }, [dispatch]);

  const onModalClose = useCallback(() => {
    resetForm();
    closeModal();
  }, [closeModal, resetForm]);

  const onSavePress = useCallback(() => {
    if (title.trim() === '') {
      Alert.alert('Title is required.', 'Please fill out the task title.');
      return;
    } else {
      if (selectedTask) {
        dispatch(
          updateTask({
            id: selectedTask.id,
            title,
            description,
            urgency,
            isCompleted: selectedTask.isCompleted,
          }),
        );
      } else {
        dispatch(
          addTask({
            id: Date.now().toString(),
            title,
            description,
            urgency,
            isCompleted: false,
          }),
        );
      }
      onModalClose();
    }
  }, [description, dispatch, onModalClose, selectedTask, title, urgency]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onModalClose}>
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.header}>Task Details</Text>
          <TextInput
            placeholder="Task Title"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Task Description (optional)"
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
          <View>
            <Text style={styles.prioText}>Priority Level</Text>
            <View style={styles.prioButtonsContainer}>
              <Pressable
                style={[
                  styles.prioButton,
                  {backgroundColor: urgency === 1 ? '#F07167' : '#fff'},
                ]}
                onPress={() => setUrgency(1)}>
                <Text style={styles.prioLevelText}>1</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.prioButton,
                  {backgroundColor: urgency === 2 ? '#F07167' : '#fff'},
                ]}
                onPress={() => setUrgency(2)}>
                <Text style={styles.prioLevelText}>2</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.prioButton,
                  {backgroundColor: urgency === 3 ? '#F07167' : '#fff'},
                ]}
                onPress={() => setUrgency(3)}>
                <Text style={styles.prioLevelText}>3</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              onPress={onModalClose}
              style={styles.actionButtons}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSavePress}
              style={styles.actionButtons}>
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default TaskModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    alignItems: 'center',
  },
  form: {
    backgroundColor: '#fff',
    width: '90%',
    height: 300,
    borderRadius: 10,
    padding: 15,
    marginTop: '20%',
  },
  header: {
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginBottom: 15,
  },
  prioText: {
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
  prioButtonsContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  prioButton: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 3,
    borderRadius: 3,
    borderWidth: 1,
    paddingVertical: 3,
  },
  prioLevelText: {
    fontWeight: '800',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  actionButtons: {
    backgroundColor: '#FED9B7',
    width: '49%',
    alignItems: 'center',
    margin: 5,
    paddingVertical: 8,
    borderRadius: 5,
  },
});

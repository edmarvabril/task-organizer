import {createSlice} from '@reduxjs/toolkit';

export type TaskDetails = {
  id: string;
  title: string;
  description: string;
  urgency: 1 | 2 | 3;
  isCompleted: boolean;
};

const dummyData: TaskDetails[] = [
  {
    id: 'aaa0001',
    title: 'Take out the trash',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    urgency: 1,
    isCompleted: false,
  },
  {
    id: 'aaa0002',
    title: 'Wash dishes',
    description: '',
    urgency: 2,
    isCompleted: false,
  },
  {
    id: 'aaa0003',
    title: 'Feed the cat',
    description: 'one scoop of dry kibbles',
    urgency: 3,
    isCompleted: false,
  },
  {
    id: 'aaa0004',
    title: 'Sweep the floor',
    description: 'use vacuum cleaner on living room',
    urgency: 1,
    isCompleted: true,
  },
  {
    id: 'aaa0005',
    title: 'Water the plants',
    description: 'moisten soil, not too much',
    urgency: 2,
    isCompleted: false,
  },
  {
    id: 'aaa0006',
    title: 'Feed the dog',
    description: 'two scoops of dry kibbles',
    urgency: 3,
    isCompleted: true,
  },
];

export interface TaskState {
  tasks: TaskDetails[];
  selectedTask: TaskDetails | undefined;
}

const initialState: TaskState = {
  tasks: dummyData,
  selectedTask: undefined,
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    selectTask: (state, {payload}: {payload: TaskDetails | undefined}) => {
      // select task for editing
      state.selectedTask = payload;
    },
    addTask: (state, {payload}: {payload: TaskDetails}) => {
      // push task payload into existing tasks array
      state.tasks.push(payload);
    },
    updateTask: (state, {payload}: {payload: TaskDetails}) => {
      // for modifying tasks
      // this will also be used when marking tasks as completed/active
      state.tasks = state.tasks.map(item => {
        if (item.id === payload.id) {
          return payload;
        } else {
          return item;
        }
      });
    },
    deleteTask: (state, {payload}: {payload: string}) => {
      // remove the task item from the array
      state.tasks = state.tasks.filter(item => item.id !== payload);
    },
  },
});

export const {addTask, updateTask, deleteTask, selectTask} = taskSlice.actions;

export default taskSlice.reducer;

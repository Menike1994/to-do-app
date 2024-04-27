import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "./TaskApi";

export type TaskState = {
    tasks: Task[];
};

const initialState: TaskState = {
    tasks: [],
};

export const taskSlice = createSlice({
    name: "task",
    initialState: initialState,
    reducers: {
        setTaskList: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        },
    },
});

export const { setTaskList } = taskSlice.actions;

export default taskSlice.reducer;

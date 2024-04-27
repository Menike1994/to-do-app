import { configureStore } from "@reduxjs/toolkit";
import AppApi from "./AppApi";
import taskReducer from "../features/tasks/TaskSlice"

export const store = configureStore({
    reducer: {
        task: taskReducer,
        [AppApi.reducerPath]: AppApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(AppApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

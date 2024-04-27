import AppApi from "../../app/AppApi";

export interface Task {
    id?: number;
    title: string;
    description: string;
    ownerId: number;
    status: boolean;
    dueDate: string;
}

export const TaskApi = AppApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTasks: builder.query<Task[], string>({
            query: () => ({
                url: "tasks",
                method: "GET"
            }),
            transformErrorResponse: (error: any) => {
                return { error: { code: error.data.code, message: error.data.message } };
            },
            providesTags: ["tasks"],
        }),
        getTask: builder.query<Task, number>({
            query: (id) => ({
                url: `tasks/${id}`,
                method: "GET"
            }),
            transformErrorResponse: (error: any) => {
                return { error: { code: error.data.code, message: error.data.message } };
            },
            providesTags: ["task"]
        }),
        searchTasks: builder.mutation<Task[], string>({
            query: (searchTerm) => ({
                url: `tasks/search/${searchTerm}`,
                method: "GET"
            }),
            transformErrorResponse: (error: any) => {
                return { error: { code: error.data.code, message: error.data.message } };
            },
        }),
        filterTasks: builder.mutation<Task[], string>({
            query: (status) => ({
                url: `tasks/filter/${status ? 1 : 0}`,
                method: "GET"
            }),
            transformErrorResponse: (error: any) => {
                return { error: { code: error.data.code, message: error.data.message } };
            },
        }),
        deleteTask: builder.mutation<{ data: string }, number>({
            query: (Id) => ({
                url: `tasks`,
                method: "DELETE",
                body: { taskId: Id }
            }),
            transformErrorResponse: (error: any) => {
                console.log("error => ", error);
                return { error: { code: error.data.code, message: error.data.message } };
            },
            invalidatesTags: ["tasks"]
        }),
        createTask: builder.mutation<{ data: string }, Task>({
            query: (task) => ({
                url: `tasks/create`,
                method: "POST",
                body: task
            }),
            transformErrorResponse: (error: any) => {
                console.log("error => ", error);
                return { error: { code: error.data.code, message: error.data.message } };
            },
            invalidatesTags: ["tasks"]
        }),
        updateTask: builder.mutation<{ data: string }, Task>({
            query: (task) => ({
                url: `tasks/update`,
                method: "POST",
                body: task
            }),
            transformErrorResponse: (error: any) => {
                return { error: { code: error.data.code, message: error.data.message } };
            },
            invalidatesTags: ["tasks", "task"]
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetAllTasksQuery,
    useSearchTasksMutation,
    useDeleteTaskMutation,
    useFilterTasksMutation,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useLazyGetTaskQuery } = TaskApi;

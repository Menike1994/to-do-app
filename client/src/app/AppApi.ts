import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useAuth } from "../hooks/useAuth";

const AppApi = createApi({
    reducerPath: "AppApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers) => {
            const { auth, token } = useAuth();
            if (auth) {
                headers.set("Authorization", `Bearer ${token}`);
                headers.set("Access-Control-Allow-Origin", "*");
            }
            return headers;
        },
    }),
    tagTypes: ["tasks", "task", "search", "filter"],
    endpoints: () => ({}),
});

export default AppApi;
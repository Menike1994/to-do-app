import AppApi from "../../app/AppApi";

interface authInput {
  password: string;
  email: string;
}

interface authResponse {
  token: string;
}

export const AuthApi = AppApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<authResponse, authInput>({
      query: ({ password, email }) => ({
        url: "auth/signin",
        method: "POST",
        body: {
          password,
          email,
        },
      }),
      transformErrorResponse: (error: any) => {
        console.log("signin error res ==> ", error);
        return { error: { code: error.data.code, message: error.data.message } };
      },
    }),
    register: builder.mutation<authResponse, authInput>({
      query: ({ password, email }) => ({
        url: "auth/signup",
        method: "POST",
        body: {
          password,
          email,
        },
      }),
      transformErrorResponse: (error: any) => {
        console.log("signup error res ==> ", error);
        return { error: { code: error.data.code, message: error.data.message } };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation } = AuthApi;

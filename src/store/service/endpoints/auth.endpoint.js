import { ApiService } from "../ApiService";

 const AuthEndpoint = ApiService.injectEndpoints({
    endpoints : (builder) =>   ({
        signIn : builder.mutation({
            query : (data) =>  ({
                url : "/login",
                method : "POST",
                body : data,
            }) ,
            // invalidatesTags : ["auth"]
        }),

        signUp : builder.mutation({
            query : (data) => ({
                url : "/register",
                method : "POST",
                body : data,

            })  ,
            // invalidatesTags : ["auth"]
        }),
        profile : builder.query({
            query : () => "/user-profile" ,
            providesTags : ["auth"]
        }),
        userLogout : builder.mutation({
            query : () => ({
                url : "/user-logout",
                method : "POST"
            }),
            invalidatesTags : ["auth"]

        })
    }) 
})

export const {useSignInMutation,useSignUpMutation,useProfileQuery,useUserLogoutMutation} = AuthEndpoint;
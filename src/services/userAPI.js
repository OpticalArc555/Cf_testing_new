import { apiSlice } from "./apiSlice";


export const UserAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    GetUserById: builder.query({
      query: (userProfileId) => ({
        url: `/user/getUser/${userProfileId}`,
        transferResponse: console.log(userProfileId),
        method: "GET",
      }),
      providesTags:["User"]
  
       // You probably want providesTags here instead of invalidatesTags for queries
    }),

    Userupdate: builder.mutation({
      query: ({userProfileId ,userupdate})  => ({
        url: `user/edit/${userProfileId}`,
       
        method: 'PUT',
        body:userupdate
      }),
      invalidatesTags:["User"],
    }),


    changePassword : builder.mutation({
      query : ({passChange,userProfileId}) => ({
        url : `/user/changePassword/${userProfileId}`,
        method: "PUT",
        body : passChange,
       
       
      })
      
    }),
    invalidatesTags:["User"],
  }),
});

export const { useGetUserByIdQuery ,
useUserupdateMutation,
useChangePasswordMutation
 } = UserAPI;

import { ApiService } from "../ApiService";

const ContactEndpoint = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (arg) => ({
        url: "/contact",
        method: "POST",
        body: arg,
      }),
      invalidatesTags :["contact"] //caching
    }),
    get : builder.query({
        
        query : () => ({
         url : "/contact",
        }),
        providesTags : ["contact"]  // caching
    }),
    delete : builder.mutation({
      query : (id) => ({
        url : `/contact/${id}`,
        method : "DELETE"
      }),
      invalidatesTags : ["contact"] //caching
    }),
    update : builder.mutation({
      query : (data) => ({
        url : `/contact/${data.id}`,
        method : "PATCH",
        body : data,
      }),
      invalidatesTags : ["contact"] //caching
    })
  }),
});

export const { useCreateMutation,useGetQuery,useDeleteMutation,useUpdateMutation } = ContactEndpoint;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseUrl';

// API für Reviews definieren
export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${getBaseUrl()}/api/reviews`,
    credentials: 'include',
  }),
  tagTypes: ['Reviews'],
  endpoints: (builder) => ({
    // ✅ Eine neue Bewertung posten
    postReview: builder.mutation({
        query: (reviewData) => ({
            url: "/post-review",
            method: "POST",
            body: reviewData,
        }),
        invalidatesTags: (result, error, { productId }) => 
            result ? [{ type: 'Reviews', id: productId }, { type: 'Reviews' }] : [],
    }),

    // ✅ Gesamtanzahl der Bewertungen abrufen
    getReviewsCount: builder.query({
        query: () => ({
            url: "/total-review",
        }),
        providesTags: ['Reviews'], // Aktualisiert sich automatisch
    }),

    // ✅ Bewertungen eines Benutzers abrufen
    getReviewsByUserId: builder.query({
        query: (userId) => ({
            url: `/${userId}`,
        }),
        providesTags: (result) => 
            result && result.length > 0 
                ? result.map(review => ({ type: "Reviews", id: review._id })) 
                : [{ type: "Reviews" }],
    }),
  }),
});

export const { 
    usePostReviewMutation, 
    useGetReviewsCountQuery, 
    useGetReviewsByUserIdQuery 
} = reviewApi;

export default reviewApi;

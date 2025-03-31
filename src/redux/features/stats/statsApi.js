import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseUrl';

export const statsApi = createApi({
  reducerPath: 'statsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${getBaseUrl()}/api/stats`,
    credentials: "include"
  }),
  tagTypes: ['Stats'],
  endpoints: (builder) => ({
    // ✅ Benutzerstatistiken abrufen
    getUserStats: builder.query({
      query: (email) => `/user-stats/${email}`, // 🛠️ Korrigierter Pfad
      providesTags: ["Stats"],
      transformResponse: (response) => response || {} // 🛠️ Falls keine Daten zurückkommen
    }),

    // ✅ Admin-Statistiken abrufen (Korrektur des Endpunkts)
    getAdminStats: builder.query({
      query: () => '/admin-stats', // 🛠️ Endpunkt angepasst (vorher `/admin-state`)
      providesTags: ["Stats"],
      transformResponse: (response) => response || {}
    }),
  }),
});

export const { 
  useGetUserStatsQuery, 
  useGetAdminStatsQuery 
} = statsApi;

export default statsApi;

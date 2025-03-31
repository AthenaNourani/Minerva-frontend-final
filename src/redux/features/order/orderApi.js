import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseUrl';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`,
    credentials: 'include', // Authentifizierte Anfragen ermöglichen
  }),
  tagTypes: ['Orders'], // Cache für Bestellungen
  endpoints: (builder) => ({
    // 🔹 Checkout-Session erstellen
    createCheckoutSession: builder.mutation({
      query: (products) => ({
        url: '/create-checkout-session',
        method: 'POST',
        body: { products },
      }),
      invalidatesTags: ['Orders'],
    }),

    // 🔹 Zahlung bestätigen
    confirmPayment: builder.mutation({
      query: (sessionId) => ({
        url: '/confirm-payment',
        method: 'POST',
        body: { session_id: sessionId },
      }),
      invalidatesTags: ['Orders'],
    }),

    // 🔹 Bestellung per E-Mail abrufen
    getOrderByEmail: builder.query({
      query: (email) => `/${email}`,
      providesTags: ['Orders'],
    }),

    // 🔹 Bestellung per ID abrufen
    getOrderById: builder.query({
      query: (id) => `/order/${id}`,
      providesTags: ['Orders'],
    }),

    // 🔹 Alle Bestellungen abrufen
    getAllOrders: builder.query({
      query: () => '/',
      providesTags: ['Orders'],
    }),

    // 🔹 Bestellstatus aktualisieren
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-order-status/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Orders'],
    }),

    // 🔹 Bestellung löschen
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/delete-order/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

// 🔹 Exportiere die Hooks zur Nutzung in Komponenten
export const {
  useCreateCheckoutSessionMutation,
  useConfirmPaymentMutation,
  useGetOrderByEmailQuery,
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;

export default orderApi;

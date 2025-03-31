import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseUrl';

// 🔧 Erstelle eine API-Schnittstelle mit RTK Query für Authentifizierungsfunktionen
const authApi = createApi({
    reducerPath: 'authApi', // 🔗 Name des Slices im Redux Store
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/auth`, // 🌐 Basis-URL für alle Auth-Anfragen
        credentials: 'include', // 🍪 Cookies mitsenden (für Login/Logout mit Sessions)
    }),
    tagTypes: ['User'], // 🏷️ Zum Aktualisieren und Zwischenspeichern von Benutzerabfragen

    endpoints: (builder) => ({

        // 🔹 Registrierung eines neuen Benutzers
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: '/register',
                method: 'POST',
                body: newUser,
            }),
        }),

        // 🔹 Login eines Benutzers
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        // 🔹 Logout des aktuellen Benutzers
        logoutUser: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),

        // 🔹 Passwort-Vergessen-Funktion (E-Mail mit Reset-Link versenden)
        forgotPassword: builder.mutation({
            query: (email) => ({
                url: '/forgot-password',
                method: 'POST',
                body: { email: email.trim() },
            }),
        }),

        // 🔹 Passwort zurücksetzen über Token-Link
        resetPassword: builder.mutation({
            query: ({ token, newPassword }) => ({
                url: `/reset-password/${token}`,
                method: 'POST',
                body: { newPassword },
            }),
        }),

        // 🔹 Alle Benutzer abrufen (z. B. für Admin-Panel)
        getUser: builder.query({
            query: () => ({
                url: '/users',
                method: 'GET',
            }),
            providesTags: ['User'],
        }),

        // 🔹 Benutzer anhand der ID löschen
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),

        // 🔹 Rolle eines Benutzers aktualisieren (z. B. „user“ → „admin“)
        updateUserRole: builder.mutation({
            query: ({ userId, role }) => ({
                url: `/users/${userId}`,
                method: 'PUT',
                body: { role },
            }),
            invalidatesTags: ['User'],
        }),

        // 🔹 Benutzerprofil aktualisieren (z. B. Bild, Name, Bio)
        updateUserProfile: builder.mutation({
            query: (profileData) => ({
                url: '/users/edit-profile',
                method: 'PATCH',
                body: profileData,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

// 🧩 Exportiere automatisch generierte React-Hooks zur Verwendung in Komponenten
export const { 
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useGetUserQuery,
    useDeleteUserMutation,
    useUpdateUserRoleMutation,
    useUpdateUserProfileMutation
} = authApi;

export default authApi;

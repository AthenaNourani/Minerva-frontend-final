import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseUrl';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/products`, 
        credentials: 'include',
    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        // ✅ Alle Produkte abrufen mit Filtern & Paginierung
        fetchAllProducts: builder.query({
            query: ({ category, color, minPrice, maxPrice, page = 1, limit = 10 }) => {
                const queryParams = new URLSearchParams({
                    category: category || '',
                    color: color || '',
                    minPrice: minPrice || '',
                    maxPrice: maxPrice || '',
                    page: page.toString(),
                    limit: limit.toString()
                }).toString();

                return `/?${queryParams}`;
            },
            providesTags: ["Products"]
        }),
        
        // ✅ Ein Produkt per ID abrufen
        fetchProductsById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => result ? [{ type: "Products", id }] : [],
        }),

        // ✅ Ein neues Produkt hinzufügen
        addProduct: builder.mutation({
            query: (newProduct) => ({
                url: "/create-product",
                method: "POST",
                body: newProduct,
            }),
            invalidatesTags: ["Products"],
        }),

        // ✅ Produkte abrufen, die mit einem Produkt verwandt sind
        fetchRelatedProducts: builder.query({
            query: (id) => `/related/${id}`,
            providesTags: (result, error, id) => result ? [{ type: "Products", id }] : [],
        }),

        // ✅ Ein Produkt aktualisieren
        updateProduct: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/update-product/${id}`,
                method: "PATCH",
                body: rest,
            }),
            invalidatesTags: ["Products"],
        }),        

        // ✅ Ein Produkt löschen
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        }),
    }),
});

export const { 
    useFetchAllProductsQuery,      
    useFetchProductsByIdQuery,     
    useAddProductMutation,         
    useFetchRelatedProductsQuery,  
    useUpdateProductMutation,      
    useDeleteProductMutation       
} = productsApi;

export default productsApi;

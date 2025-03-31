import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDeleteProductMutation, useFetchAllProductsQuery } from '../../../redux/features/products/productsApi';
import { formatDate } from '../../../utils/formatDate'; // Formatierungsfunktion importieren

const ManageProduct = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12);
    const [deleteProduct] = useDeleteProductMutation();

    // Produkte abrufen
    const { data: { products = [], totalPages = 0, totalProducts = 0 } = {}, isLoading, error, refetch } = useFetchAllProductsQuery({
        category: '',
        color: '',
        minPrice: '',
        maxPrice: '',
        page: currentPage,
        limit: productsPerPage
    });

    console.log("Fetched products:", products);

    // Berechnung mit useMemo für bessere Performance
    const startProduct = useMemo(() => products.length > 0 ? (currentPage - 1) * productsPerPage + 1 : 0, [currentPage, products]);
    const endProduct = useMemo(() => startProduct + products.length - 1, [startProduct, products]);

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Produkt löschen
    const handleDeleteProduct = async (id) => {
        try {
           await deleteProduct(id).unwrap();
           alert('Product deleted successfully');
           await refetch(); // Aktualisieren der Produktliste
        } catch (error) {
            console.error('Error deleting Product:', error);
        }
    };

    return (
        <>
            {isLoading && <div>Loading products...</div>}
            {error && <div>Error loading products: {error.message}</div>}

            <section className="py-1 bg-blueGray-50">
                <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">All Products</h3>
                                </div>
                            </div>
                            <h3 className="my-4 text-sm">
                                Showing {startProduct} to {endProduct} of {totalProducts} products
                            </h3>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-blueGray-100 py-3 text-xs uppercase font-semibold text-left">NO.</th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-blueGray-100 py-3 text-xs uppercase font-semibold text-left">PRODUCT NAME</th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-blueGray-100 py-3 text-xs uppercase font-semibold text-left">PUBLISHING DATE</th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-blueGray-100 py-3 text-xs uppercase font-semibold text-left">EDIT OR MANAGE</th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-blueGray-100 py-3 text-xs uppercase font-semibold text-left">DELETE</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.length > 0 ? (
                                        products.map((product, index) => (
                                            <tr key={product._id}>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                                    {startProduct + index}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {product?.name}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {formatDate(product?.createdAt)}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <Link to={`/dashboard/update-product/${product._id}`} className="text-blue-500 hover:text-primary-dark">Edit</Link>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <button 
                                                        className="bg-red-500 text-white py-1 px-2 rounded-sm"
                                                        onClick={() => handleDeleteProduct(product._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>   
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4">No products found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Pagination Buttons */}
                <div className="flex justify-center mt-6 items-center">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="mx-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
                    >
                        Previous
                    </button>
                    {
                        [...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md mx-1`}
                            >
                                {index + 1}
                            </button>
                        ))
                    }
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="mx-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
                    >
                        Next
                    </button>
                </div>
            </section>
        </>
    );
};

export default ManageProduct;

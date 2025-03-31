import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import TextInput from '../addProduct/TextInput';
import SelectInput from '../addProduct/SelectInput';
import UploadImage from '../addProduct/UploadImage';
import { useFetchProductsByIdQuery, useUpdateProductMutation } from '../../../redux/features/products/productsApi';

const UpdateProduct = () => {
    const { id } = useParams(); 
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: '',
        category: '',
        color: '',
        price: '',
        description: '',
        image: ''
    });

    const [newImage, setNewImage] = useState(null);
    
    // Produkt per ID abrufen
    const { data: productData, isLoading, error } = useFetchProductsByIdQuery(id, { skip: !id });

    // Mutation für Produkt-Update
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

    // Produkt-Daten setzen, wenn verfügbar
    useEffect(() => {
        if (productData?.product) {
            setProduct({
                name: productData.product.name || '',
                category: productData.product.category || '',
                color: productData.product.color || '',
                price: productData.product.price || '',
                description: productData.product.description || '',
                image: productData.product.image || ''
            });
        }
    }, [productData]);

    // `categories` und `colors` als `useMemo`, um unnötige Neuberechnungen zu vermeiden
    const categories = useMemo(() => [
        { label: 'Select Category', value: '' },
        { label: 'Accessories', value: 'accessories' },
        { label: 'Dress', value: 'dress' },
        { label: 'Jewelry', value: 'jewelry' },
        { label: 'Cosmetics', value: 'cosmetics' },
        { label: 'Skin Care', value: 'skin-care' },
    ], []);

    const colors = useMemo(() => [
        { label: 'Select Color', value: '' },
        { label: 'Black', value: 'black' },
        { label: 'Red', value: 'red' },
        { label: 'Gold', value: 'gold' },
        { label: 'Blue', value: 'blue' },
        { label: 'Silver', value: 'silver' },
        { label: 'Beige', value: 'beige' },
        { label: 'Green', value: 'green' },
    ], []);

    // Eingabewerte ändern
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    // Neues Bild speichern
    const handleImageChange = (image) => {
        setNewImage(image);
    };

    // Formular absenden
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedProduct = {
            ...product,
            image: newImage || product.image,
            author: user?._id
        };

        try {
            await updateProduct({ id, ...updatedProduct }).unwrap();
            alert('Product updated successfully');
            navigate('/dashboard/manage-products'); // Weiterleitung zur Produktliste
        } catch (error) {
            console.error('Failed to update product', error);
            alert('Failed to update product. Please try again.');
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching product...</div>;

    return (
        <div className='container mx-auto mt-8 shadow-lg w-full h-auto p-6'>
            <h2 className='text-2xl font-bold mb-6'>Update Product</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <TextInput label="Product Name" name="name" value={product.name} onChange={handleInputChange} type="text" placeholder="Product Name" />
                <SelectInput label="Category" name="category" value={product.category} onChange={handleInputChange} options={categories} />
                <SelectInput label="Color" name="color" value={product.color} onChange={handleInputChange} options={colors} />
                <TextInput label="Price" name="price" value={product.price} onChange={handleInputChange} type="number" placeholder="50" />
                <UploadImage name="image" id="image" setImage={handleImageChange} placeholder="image" value={newImage || product.image} />
                <div>
                    <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description</label>
                    <textarea name="description" id="description" value={product.description} placeholder="Write a product description" onChange={handleInputChange} className='add-product-InputCSS' />
                </div>
                <button type='submit' className='add-product-btn'>
                    {isUpdating ? 'Updating...' : 'Update Product'}
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // 🔹 Navigationshook für Weiterleitung
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import UploadImage from './UploadImage';
import { useAddProductMutation } from '../../../redux/features/products/productsApi';

// 🔹 Vordefinierte Kategorien
const categories = [
    { label: 'Select Category', value: '' },
    { label: 'Accessories', value: 'accessories' },
    { label: 'Dress', value: 'dress' },
    { label: 'Jewelry', value: 'jewelry' },
    { label: 'Cosmetics', value: 'cosmetics' },
    { label: 'Skin Care', value: 'skin-care' },
];

// 🔹 Vordefinierte Farben
const colors = [
    { label: 'Select Color', value: '' },
    { label: 'Black', value: 'black' },
    { label: 'Red', value: 'red' },
    { label: 'Gold', value: 'gold' },
    { label: 'Blue', value: 'blue' },
    { label: 'Silver', value: 'silver' },
    { label: 'Beige', value: 'beige' },
    { label: 'Green', value: 'green' },
];

const AddProduct = () => {
    const { user } = useSelector((state) => state.auth); // 🔹 Benutzer aus Redux-Store abrufen
    const navigate = useNavigate();
    
    // 🔹 State für Produktinformationen
    const [product, setProduct] = useState({
        name: '',
        category: '',
        color: '',
        price: '',
        description: '',
    });

    const [addProduct, { isLoading, error }] = useAddProductMutation(); // 🔹 Korrekte Mutation
    const [image, setImage] = useState(''); // 🔹 Bild-URL speichern

    // 🔹 Änderungen in den Eingabefeldern verarbeiten
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    // 🔹 Produkt absenden
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🔹 Validierung: Überprüfen, ob alle Felder ausgefüllt sind
        if (!product.name || !product.category || !product.color || !product.price || !product.description) {
            alert('Please fill all the required fields');
            return;
        }

        try {
            // 🔹 Produkt mit Bild und Autor absenden
            await addProduct({ ...product, image, author: user?._id }).unwrap();
            alert('Product added successfully');

            // 🔹 Formular zurücksetzen
            setProduct({
                name: '',
                category: '',
                color: '',
                price: '',
                description: '',
            });
            setImage('');
            navigate('/shop'); // 🔹 Weiterleitung nach erfolgreichem Erstellen
        } catch (error) {
            console.log('Failed to submit product', error);
        }
    };

    return (
        <div className='container mx-auto mt-8 shadow-lg w-full h-auto p-6'>
            <h2 className='text-2xl font-bold mb-6'>Add New Product</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                {/* 🔹 Produktname */}
                <TextInput 
                    label="Product Name" 
                    name="name" 
                    value={product.name} 
                    onChange={handleInputChange} 
                    type="text" 
                    placeholder="Product Name" 
                />

                {/* 🔹 Kategorie auswählen */}
                <SelectInput 
                    label="Category" 
                    name="category" 
                    value={product.category} 
                    onChange={handleInputChange} 
                    options={categories} 
                />

                {/* 🔹 Farbe auswählen */}
                <SelectInput 
                    label="Color" 
                    name="color" 
                    value={product.color} 
                    onChange={handleInputChange} 
                    options={colors} 
                />

                {/* 🔹 Preis */}
                <TextInput 
                    label="Price" 
                    name="price" 
                    value={product.price} 
                    onChange={handleInputChange} 
                    type="number" 
                    placeholder="50" 
                />

                {/* 🔹 Bild-Upload */}
                <UploadImage 
                    name="image" 
                    id="image" 
                    setImage={setImage} 
                    placeholder="Upload product image" 
                />

                {/* 🔹 Beschreibung */}
                <div>
                    <label htmlFor="description" className='block text-sm font-medium text-gray-700'>
                        Description
                    </label>
                    <textarea 
                        name="description" 
                        id="description" 
                        value={product.description} 
                        placeholder="Write a product description" 
                        onChange={handleInputChange} 
                        className='add-product-InputCSS'
                    />
                </div>

                {/* 🔹 Absenden-Button */}
                <button type='submit' className='add-product-btn'>
                    {isLoading ? 'Adding...' : 'Add Product'}
                </button>

                {/* 🔹 Fehlermeldung anzeigen */}
                {error && <p className="text-red-500">{error.message}</p>}
            </form>
        </div>
    );
};

export default AddProduct;

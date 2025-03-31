import React, { useState } from 'react';
import axios from 'axios';
import { getBaseUrl } from '../../../utils/baseUrl';

const UploadImage = ({ name, setImage }) => {
    const [loading, setLoading] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]); // 🟢 Speichert die hochgeladenen Bilder

    // 🔹 Datei in Base64 konvertieren
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // 🔹 Einzelnes Bild hochladen
    const uploadSingleImage = async (base64) => {
        try {
            const res = await axios.post(`${getBaseUrl()}/uploadImage`, { image: base64 });
            return res.data.imageUrl; // ✅ Image-URL aus der API-Antwort zurückgeben
        } catch (error) {
            console.error("Fehler beim Hochladen des Bildes:", error.response?.data || error.message);
            return null; // ✅ Falls der Upload fehlschlägt
        }
    };

    // 🔹 Bilder hochladen & verwalten
    const uploadImage = async (event) => {
        const files = event.target.files;
        if (!files.length) return;

        setLoading(true); // 🔹 Lade-Status aktivieren
        try {
            // 🔹 Alle Bilder in Base64 umwandeln
            const base64s = await Promise.all([...files].map(file => convertBase64(file)));
            
            // 🔹 Alle Bilder hochladen und URLs erhalten
            const uploadedUrls = await Promise.all(base64s.map(base64 => uploadSingleImage(base64)));

            // 🔹 Fehlgeschlagene Uploads filtern
            const validUrls = uploadedUrls.filter(url => url !== null);
            if (validUrls.length > 0) {
                setUploadedImages([...uploadedImages, ...validUrls]); // 🔹 Bilder speichern
                setImage(validUrls); // 🔹 Die `setImage`-Funktion mit den neuen URLs aktualisieren
            }
        } catch (error) {
            console.error("Fehler beim Verarbeiten der Bilder:", error);
        } finally {
            setLoading(false); // 🔹 Lade-Status deaktivieren
        }
    };

    return (
        <div>
            {/* 🔹 Eingabefeld für das Hochladen */}
            <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
                Upload Image
            </label>
            <input 
                type="file" 
                name={name}
                id={name}
                onChange={uploadImage}
                className='w-full rounded-md bg-gray-200 p-2'
                multiple // 🔹 Mehrere Bilder erlauben
            />

            {/* 🔹 Ladeanzeige */}
            {loading && (
                <div className='mt-2 text-sm text-blue-600'>Uploading image...</div>
            )}

            {/* 🔹 Vorschau der hochgeladenen Bilder */}
            {uploadedImages.length > 0 && (
                <div className='mt-4 grid grid-cols-3 gap-2'>
                    {uploadedImages.map((img, index) => (
                        <img key={index} src={img} alt='uploaded' className="w-32 h-32 object-cover rounded-md" />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UploadImage;

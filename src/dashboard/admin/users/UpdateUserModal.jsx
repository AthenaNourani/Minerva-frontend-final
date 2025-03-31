import React, { useState, useEffect } from 'react';
import { useUpdateUserRoleMutation } from '../../../redux/features/auth/authApi';

const UpdateUserModal = ({ user, onClose, onRoleUpdate }) => {
    const [role, setRole] = useState("");

    const [updateUserRole] = useUpdateUserRoleMutation();

    // 📌 Benutzerrolle setzen, wenn `user` existiert
    useEffect(() => {
        if (user) {
            setRole(user.role || "user");
        }
    }, [user]);

    // 📌 Funktion zum Aktualisieren der Benutzerrolle
    const handleUpdateRole = async () => {
        try {
            await updateUserRole({ userId: user._id, role }).unwrap(); // userId und role als Objekt übergeben
            alert('Updated role successfully');
            onRoleUpdate(); // Die Benutzerliste nach dem Update neu laden
            onClose(); // Modal schließen
        } catch (error) {
            console.log('Failed to update user role', error);
        }
    };
    
    return (
        // 📌 Modale Hintergrundüberlagerung
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            {/* 📌 Modal-Fenster */}
            <div className='bg-white p-6 rounded shadow-lg w-1/3'>
                <h2 className='text-xl mb-4'>Edit User Role</h2>

                {/* 📌 Feld zur Anzeige der Benutzer-E-Mail (schreibgeschützt) */}
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700' htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id='email' 
                        name='email'
                        value={user?.email || ""}
                        readOnly // Dieses Feld kann nicht bearbeitet werden
                        className='mt-1 bg-gray-100 w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-4 focus:outline-none'
                    />
                </div>

                {/* 📌 Dropdown zur Auswahl der Benutzerrolle */}
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700' htmlFor="role">Role</label>
                    <select 
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className='block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-4 focus:outline-none'
                    >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                    </select>
                </div>

                {/* 📌 Buttons für Abbrechen und Speichern */}
                <div className='flex justify-end'>
                    <button className='bg-gray-500 text-white px-4 py-2 rounded mr-2' onClick={onClose}>Cancel</button>
                    <button className='bg-indigo-500 text-white px-4 py-2 rounded' onClick={handleUpdateRole}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserModal;

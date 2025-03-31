import React, { useState } from 'react';
import { useGetUserQuery, useDeleteUserMutation } from '../../../redux/features/auth/authApi';
import UpdateUserModal from './UpdateUserModal';

const ManageUsers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Zustand für das Modal (geöffnet/geschlossen)
    const [selectedUser, setSelectedUser] = useState(null); // Speichert den ausgewählten Benutzer für die Bearbeitung

    const [deleteUser] = useDeleteUserMutation(); // Mutation zum Löschen eines Benutzers

    // Abrufen der Benutzerliste von der API
    const { data: users = [], isLoading, error, refetch } = useGetUserQuery();

    // 📌 Funktion zum Löschen eines Benutzers
    const handleDelete = async (id) => {
        try {
            await deleteUser(id).unwrap();
            alert('User deleted successfully');
            await refetch(); // Die Benutzerliste nach dem Löschen aktualisieren
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // 📌 Funktion zum Öffnen des Modals und Setzen der Benutzerdaten
    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    // 📌 Funktion zum Schließen des Modals
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <>
            {/* Anzeige von Ladezustand und Fehlern */}
            {isLoading && <div>Laden ...</div>}
            {error && <div>Fehler beim Laden der Benutzerdaten: {error.message}</div>}

            <section className="py-1 bg-blueGray-50">
                <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">All Users</h3>
                                </div>
                            </div>
                        </div>

                        {/* Tabelle zur Anzeige der Benutzer */}
                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-blueGray-100 py-3 text-xs uppercase font-semibold text-left">
                                            NO.
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-blueGray-100 py-3 text-xs uppercase font-semibold text-left">
                                            USER EMAIL
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-blueGray-100 py-3 text-xs uppercase font-semibold text-left">
                                            USER ROLE
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-blueGray-100 py-3 text-xs uppercase font-semibold text-left">
                                            EDIT OR MANAGE
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-blueGray-100 py-3 text-xs uppercase font-semibold text-left">
                                            DELETE
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {/* Überprüfung, ob Benutzer vorhanden sind */}
                                    {users?.length > 0 ? (
                                        users.map((user, index) => (
                                            <tr key={user._id}>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                                    {index + 1}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {user?.email}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {/* 📌 Benutzerrolle mit einer farbigen Markierung */}
                                                    <span 
                                                        className={`py-1 px-3 font-bold text-white inline-block rounded-md
                                                            ${user?.role === "admin" ? "bg-green-500" : "bg-yellow-500"}`}
                                                    >
                                                        {user?.role}
                                                    </span>
                                                </td>

                                                {/* Bearbeiten-Button */}
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <button 
                                                        onClick={() => handleEdit(user)}
                                                        className='flex gap-1 items-center hover:text-red-500'
                                                    >
                                                        <i className="ri-edit-2-line"></i> Edit
                                                    </button>
                                                </td>

                                                {/* Löschen-Button */}
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <button 
                                                        className="bg-red-500 text-white py-1 px-2 rounded-sm"
                                                        onClick={() => handleDelete(user._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>   
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4">Keine Benutzer gefunden.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* 📌 Modal zur Bearbeitung eines Benutzers */}
            {isModalOpen && (
                <UpdateUserModal 
                    user={selectedUser} 
                    onClose={handleCloseModal} 
                    onRoleUpdate={refetch}
                />
            )}
        </>
    );
};

export default ManageUsers;

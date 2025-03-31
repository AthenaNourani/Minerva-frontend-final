import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserProfileMutation } from '../../redux/features/auth/authApi';
import avatar from '../../assets/avatar.png';

const UserProfile = () => {
    // 📌 Holen der Benutzerinformationen aus dem Redux State
    const { user } = useSelector((state) => state.auth);
    
    // 📌 Redux-Dispatch zur Aktualisierung des Benutzerstatus
    const dispatch = useDispatch();

    // 📌 Mutation für das Aktualisieren des Benutzerprofils
    const [updateUserProfile, { isSuccess, isError, isLoading, error }] = useUpdateUserProfileMutation();

    // 📌 State für das Öffnen des Modals
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 📌 State für die Benutzerdaten im Formular
    const [formData, setFormData] = useState({
        username: '',
        profileImage: avatar,
        bio: '',
        profession: '',
        userId: '',
    });

    // 📌 Setzt die Benutzerdaten beim Laden der Komponente oder wenn sich die Benutzerinfos ändern
    useEffect(() => {
        if (user) {
            setFormData({
                username: user?.username || '',
                profileImage: user?.profileImage || user?.avatar || avatar,
                bio: user?.bio || '',
                profession: user?.profession || '',
                userId: user?.id || '',
            });
        }
    }, [user]); 

    // 📌 Aktualisiert den State, wenn der Benutzer ein Feld im Formular ändert
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 📌 Öffnet das Bearbeitungsmodal
    const handleModal = () => setIsModalOpen(true);

    // 📌 Schließt das Bearbeitungsmodal
    const handleCloseModal = () => setIsModalOpen(false);

    // 📌 Funktion zum Speichern der Änderungen
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedUser = {
            username: formData.username,
            profileImage: formData.profileImage,
            bio: formData.bio,
            profession: formData.profession,
            userId: formData.userId,
        };

        try {
            const response = await updateUserProfile(updatedUser).unwrap();
            console.log('Profil aktualisiert:', response.user);

            dispatch(setUser(response.user));
            localStorage.setItem('user', JSON.stringify(response.user));

            alert('Profil erfolgreich aktualisiert');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Fehler beim Aktualisieren des Profils:', error);
            alert('Profilaktualisierung fehlgeschlagen. Bitte versuchen Sie es erneut.');
        }
    };

    return (
        <div className="border shadow-md rounded-md p-10 bg-white">
            {/* 📌 Anzeige der Benutzerinformationen */}
            <div className="border p-3 flex justify-between items-center shadow-md rounded-md">
                <div className="flex items-center">
                    {/* 📌 Benutzerbild */}
                    <img src={formData.profileImage} alt="User Avatar" className="w-24 h-24 rounded-full" />
                    <div className="ml-3">
                        <h2 className="text-l font-bold">Benutzername: {formData.username}</h2>
                        <p className="text-gray-500 text-sm">Bio: {formData.bio || 'Nicht verfügbar'}</p>
                        <p className="text-gray-500 text-sm">Beruf: {formData.profession || 'Nicht verfügbar'}</p>
                    </div>
                </div>
                {/* 📌 Icon für das Bearbeiten des Profils */}
                <i className="ri-profile-line text-gray-500 cursor-pointer" onClick={handleModal}></i>
            </div>

            {/* 📌 Modal zur Bearbeitung des Profils */}
            {isModalOpen && (
                <div className="bg-gray-600 fixed inset-0 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg w-1/3 shadow-lg">

                        <div className="mb-4 flex justify-between items-center">
                            <h2 className='font-semibold text-2xl'>Profil bearbeiten</h2>
                            <button onClick={handleCloseModal} className='cursor-pointer'>
                                <i className="ri-close-large-line"></i>
                            </button>
                        </div>

                        {/* 📌 Formular zur Bearbeitung */}
                        <form onSubmit={handleSubmit}>
                            {/* Benutzername */}
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Benutzername</label>
                                <input type="text" id="username" name="username" placeholder="Benutzername"
                                    className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required value={formData.username} onChange={handleChange} />
                            </div>

                            {/* Profilbild URL */}
                            <div className="mb-4">
                                <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">Profilbild URL</label>
                                <input type="text" id="profileImage" name="profileImage" placeholder="Profilbild"
                                    className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required value={formData.profileImage} onChange={handleChange} />
                            </div>

                            {/* Bio */}
                            <div className="mb-4">
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                                <textarea id="bio" name="bio" placeholder="Bio" rows="4"
                                    className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required value={formData.bio} onChange={handleChange} />
                            </div>

                            {/* Beruf */}
                            <div className="mb-4">
                                <label htmlFor="profession" className="block text-sm font-medium text-gray-700">Beruf</label>
                                <input type="text" id="profession" name="profession" placeholder="Beruf"
                                    className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required value={formData.profession} onChange={handleChange} />
                            </div>

                            {/* Speichern-Button */}
                            <button type='submit'
                                className={`mt-4 w-full bg-blue-500 text-white py-2 px-2 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isLoading}>
                                {isLoading ? 'Speichern...' : 'Änderungen speichern'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;

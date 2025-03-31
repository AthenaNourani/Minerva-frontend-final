import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartModal from '../pages/shop/CartModal';
import avatarImg from '../assets/avatar.png';
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';

const Navbar = () => {
    // Zugriff auf den Warenkorb aus Redux-Store
    const { products, selectedItems } = useSelector((state) => state.cart);
    
    // Zustand für das Warenkorb-Modal
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Benutzerinformationen aus Redux abrufen
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    console.log('Redux User:', user);

    // Logout-Mutation ausführen
    const [logoutUser] = useLogoutUserMutation();
    const navigate = useNavigate();

    // Zustand für das Dropdown-Menü des Benutzers
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    // Funktion zum Öffnen/Schließen des Warenkorbs
    const handleCartToggle = () => {
        setIsCartOpen(!isCartOpen);
    };

    // Funktion zum Öffnen/Schließen des Dropdown-Menüs
    const handleDropDownOpen = () => {
        setIsDropDownOpen(!isDropDownOpen);
    };

    // Admin-Menüoptionen
    const adminDropDownMenus = [
        { label: 'Dashboard', path: '/dashboard/admin' },
        { label: 'Manage Items', path: '/dashboard/manage-products' },
        { label: 'All Orders', path: '/dashboard/manage-orders' },
        { label: 'Add Product', path: '/dashboard/add-product' },
    ];

    // Benutzer-Menüoptionen
    const userDropDownMenus = [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Profile', path: '/dashboard/profile' },
        { label: 'Payments', path: '/dashboard/payment' },
        { label: 'Orders', path: '/dashboard/orders' },
    ];

    // Menü je nach Benutzerrolle auswählen
    const dropDownMenus = user?.role === 'admin' ? [...adminDropDownMenus] : [...userDropDownMenus];

    // Funktion zum Logout
    const handleLogout = async () => {
        try {
            await logoutUser().unwrap(); // Anfrage zum Logout an den Server senden
            dispatch(logout()); // Benutzer aus Redux-Store entfernen
            setIsDropDownOpen(false); // Dropdown-Menü schließen
            navigate('/'); // Zur Startseite navigieren
        } catch (error) {
            console.log('Failed to log out:', error);
        }
    };

    return (
        <header className='w-full bg-white shadow-md fixed top-0 left-0 z-50'>
            <nav className='max-w-screen-2xl mx-auto px-4 justify-between items-center'>
                {/* Navigationslinks */}
                <ul className='nav__links'>
                    <li className='link'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='link'>
                        <Link to='/shop'>Shop</Link>
                    </li>
                    <li className='link'>
                        <Link to='/pages'>Pages</Link>
                    </li>
                    <li className='link'>
                        <Link to='/contact'>Contact</Link>
                    </li>
                </ul>

                {/* Logo */}
                <div className='nav__logo'>
                    <Link to='/'>Minerva<span>.</span></Link>
                </div>

                {/* Icons für Suche, Warenkorb und Benutzer */}
                <div className='nav__icons relative'>
                    {/* Suchsymbol */}
                    <span>
                        <Link to='/search'>
                            <i className="ri-search-line"></i>
                        </Link>
                    </span>

                    {/* Warenkorb-Symbol */}
                    <span>
                        <button onClick={handleCartToggle} className='hover:text-primary'>
                            <i className="ri-shopping-bag-line"></i>
                            {/* Anzahl der Produkte im Warenkorb anzeigen */}
                            <sup className='text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center'>
                                {selectedItems}
                            </sup>
                        </button>
                    </span>

                    {/* Benutzerprofil-Symbol */}
                    <span>
                        {user ? (
                            <img 
                                onClick={handleDropDownOpen} 
                                src={user?.profileImage || avatarImg} 
                                alt='' 
                                className='size-6 rounded-full cursor-pointer'
                            />
                        ) : (
                            <Link to='/login'>
                                <i className="ri-user-line"></i>
                            </Link>
                        )}

                        {/* Dropdown-Menü für Benutzer */}
                        {isDropDownOpen && (
                            <div className='absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
                                <ul className='font-medium space-y-4 p-2'>
                                    {dropDownMenus.map((menu, index) => (
                                        <li key={index}>
                                            <Link to={menu.path} onClick={() => setIsDropDownOpen(false)} className='dropdown-items'>
                                                {menu.label}
                                            </Link>
                                        </li>
                                    ))}
                                    <li>
                                        <button onClick={handleLogout} className='text-left w-full'>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </span>
                </div>
            </nav>

            {/* Warenkorb-Modal */}
            {isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle} />}
        </header>
    );
};

export default Navbar;

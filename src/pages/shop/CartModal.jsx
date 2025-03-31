import React, { useMemo } from 'react';
import OrderSummary from './OrderSummary';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../redux/features/cart/cartSlice';

const CartModal = ({ products = [], isOpen, onClose }) => {
  const dispatch = useDispatch();

  // 🛒 Funktion zum Aktualisieren der Produktmenge (Inkrementieren oder Dekrementieren)
  const handleQuantity = (type, id) => {
    dispatch(updateQuantity({ type, _id: id })); // `_id` statt `id` verwenden
  };

  // ❌ Funktion zum Entfernen eines Produkts aus dem Warenkorb
  const handleRemove = (e, id) => {
    e.preventDefault();
    dispatch(removeFromCart({ _id: id })); // `_id` verwenden
  };

  // 🛍️ Optimierung: Verhindert unnötige Berechnungen und Re-Renderings
  const cartItems = useMemo(() => {
    return products.map((item, index) => (
      <div
        key={item._id || index}
        className="flex flex-col md:flex-row md:justify-between md:items-center shadow-md md:p-5 p-2 border-b"
      >
        {/* 🔢 Position des Produkts im Warenkorb */}
        <span className="mr-4 px-1 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
          0{index + 1}
        </span>

        {/* 🖼️ Produktbild */}
        <img
          src={item.image}
          alt={item.name}
          className="size-12 object-cover rounded-md"
        />

        {/* ℹ️ Produktinformationen */}
        <div>
          <h5 className="text-lg font-medium">{item.name}</h5>
          <p className="text-gray-600 text-sm">${Number(item.price).toFixed(2)}</p>
        </div>

        {/* ➕➖ Mengensteuerung */}
        <div className="flex flex-row md:justify-start justify-end items-center mt-2">
          <button
            onClick={() => handleQuantity('decrement', item._id)}
            className="size-6 rounded-full bg-gray-200 hover:bg-primary p-1.5 flex justify-center items-center text-gray-700 hover:text-white"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-2 mx-1 text-center">{item.quantity}</span>
          <button
            onClick={() => handleQuantity('increment', item._id)}
            className="size-6 rounded-full bg-gray-200 hover:bg-primary p-1.5 flex justify-center items-center text-gray-700 hover:text-white"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* ❌ Produkt entfernen */}
        <div className="ml-5">
          <button
            onClick={(e) => handleRemove(e, item._id)}
            className="text-red-500 hover:text-red-800 mr-4"
            aria-label="Remove product"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  }, [products]); // 📌 Wird nur neu berechnet, wenn sich `products` ändern

  return (
    <div className="relative">
      {/* 🔲 Hintergrund (Backdrop), der das Modal bei Klick schließt */}
      <div
        onClick={onClose} // 👈 Bei Klick auf den schwarzen Hintergrund → Modal schließen
        className={`fixed inset-0 z-50 bg-black bg-opacity-80 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ transition: 'opacity 300ms' }}
      >
        {/* 🧺 Warenkorb-Panel (wird NICHT geschlossen, wenn man hier klickt) */}
        <div
          onClick={(e) => e.stopPropagation()} // 👈 Verhindert, dass Klicks das Modal schließen
          className={`fixed right-0 top-0 bg-white h-full overflow-y-auto transition-transform md:w-1/3 w-full ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            transition: 'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {/* 🔥 Header des Warenkorbs */}
          <div className="p-4 mt-4">
            <div className="flex justify-between items-center mb-0">
              <h4 className="text-xl font-semibold">Your Cart</h4>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-900"
                aria-label="Close cart"
              >
                <i className="ri-close-fill bg-black p-1 text-white rounded-md"></i>
              </button>
            </div>
          </div>
  
          {/* 🛒 Warenkorb-Produkte */}
          <div className="cart-items px-3">
            {products.length === 0 ? (
              <div className="text-center text-gray-500 py-6">Your cart is empty.</div>
            ) : (
              cartItems
            )}
          </div>
  
          {/* 🧾 Zusammenfassung */}
          {products.length > 0 && <OrderSummary />}
        </div>
      </div>
    </div>
  );
  
};

export default CartModal;

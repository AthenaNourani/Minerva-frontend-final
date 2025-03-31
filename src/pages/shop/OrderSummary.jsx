import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/features/cart/cartSlice';
import { loadStripe } from '@stripe/stripe-js';
import { getBaseUrl } from '../../utils/baseUrl';

const OrderSummary = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const products = useSelector((state) => state.cart.products);

  // 🧾 Warenkorb-Daten aus Redux-State holen
  const { selectedItems = 0, totalPrice = 0, tax = 0, grandTotal = 0, taxRate = 0 } = useSelector((state) => state.cart);

  // 👀 Benutzer zur Kontrolle anzeigen (nur für Debugging-Zwecke)
  useEffect(() => {
    console.log('Current user:', user);
  }, [user]);

  // 🗑️ Funktion zum Leeren des Warenkorbs
  const handleClearCart = (e) => {
    e.preventDefault();
    dispatch(clearCart());
  };

  // 💳 Stripe-Zahlung starten
  const makePayment = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
      if (!stripe) {
        console.error('Stripe could not be loaded.');
        return;
      }

      const body = {
        products: products,
        userId: user?._id,
      };

      const response = await fetch(`${getBaseUrl()}/api/orders/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.error('Error creating checkout session:', response.statusText);
        return;
      }

      const session = await response.json();
      console.log('Session created:', session);

      if (!session.id) {
        console.error('Missing session.id in response');
        return;
      }

      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error('Stripe redirect error:', result.error);
      }
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };

  return (
    <div className="bg-primary-light px-3 py-2 mt-5 rounded">
      <div className="px-6 py-4 space-y-5">
        <h2 className="text-xl text-text-dark">Order Summary</h2>

        <p className="text-text-dark">Selected Items: {selectedItems}</p>
        <p className="text-text-dark">Subtotal: ${totalPrice.toFixed(2)}</p>
        <p className="text-text-dark">Tax ({(taxRate * 100).toFixed(0)}%): ${tax.toFixed(2)}</p>
        <h3 className="font-bold">Total: ${grandTotal.toFixed(2)}</h3>

        {/* 🛠️ Buttons für Aktionen */}
        <div className="px-4 mb-6 flex flex-col gap-4">
          {/* ❌ Warenkorb löschen */}
          <button
            onClick={handleClearCart}
            className="bg-red-500 px-3 py-1.5 text-sm text-white rounded-md flex justify-center items-center"
          >
            <span className="mr-2">Clear Cart</span>
            <i className="ri-delete-bin-5-line"></i>
          </button>

          {/* 💳 Zur Kasse gehen */}
          <button
            onClick={makePayment}
            className="bg-green-500 px-3 py-1.5 text-sm text-white rounded-md flex justify-center items-center"
          >
            <span className="mr-2">Checkout</span>
            <i className="ri-bank-card-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

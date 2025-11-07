import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import CartItem from '../components/cart/Cartitem';
import { clearCart } from '../store/slice/cart.slice';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
  const { items, totalPrice, totalQuantity } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toast.success('Order placed successfully!', {
      position: 'top-center',
      autoClose: 3000
    });
    dispatch(clearCart());
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
        <FiShoppingBag size={100} className="text-gray-400 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="border-t border-b border-gray-200 py-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Items ({totalQuantity}):</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tax (10%):</span>
                  <span className="font-semibold">${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between mb-6">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-xl font-bold text-blue-600">
                  ${(totalPrice * 1.1).toFixed(2)}
                </span>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
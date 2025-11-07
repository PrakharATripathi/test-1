import React from 'react';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/slice/cart.slice';
import { toast } from 'react-toastify';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
    toast.info(`${item.title} removed from cart`, {
      position: 'bottom-right',
      autoClose: 2000
    });
  };

  const handleIncrement = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 flex">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-32 h-32 object-cover"
      />
      
      <div className="flex-1 p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-600">${item.price} each</p>
          </div>
          
          <button
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 transition"
          >
            <FiTrash2 size={20} />
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleDecrement}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
            >
              <FiMinus size={16} />
            </button>
            
            <input
              type="text"
              value={item.quantity}
              readOnly
              className="w-12 text-center border border-gray-300 rounded py-1"
            />
            
            <button
              onClick={handleIncrement}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
            >
              <FiPlus size={16} />
            </button>
          </div>
          
          <span className="text-xl font-bold text-gray-800">
            ${item.totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
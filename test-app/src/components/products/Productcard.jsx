import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slice/cart.slice';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`, {
      position: 'bottom-right',
      autoClose: 2000
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <AiFillStar key={i} size={16} className="text-yellow-400" />
        );
      } else {
        stars.push(
          <AiOutlineStar key={i} size={16} className="text-gray-300" />
        );
      }
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate mb-2">
          {product.title}
        </h2>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price}
          </span>
          <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {product.category}
          </span>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          <FiShoppingCart size={20} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
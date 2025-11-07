import React from 'react';
import { FiShoppingCart, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slice/login.slice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { totalQuantity } = useSelector(state => state.cart);
  const { user, isAuthenticated } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleCartClick = () => {
    navigate('/checkout');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div 
            className="text-xl font-bold cursor-pointer hover:text-blue-200 transition"
            onClick={() => navigate('/')}
          >
            E-Commerce Store
          </div>
          
          {isAuthenticated && (
            <div className="flex items-center gap-6">
              <span className="text-sm">
                Welcome, {user?.firstName || 'User'}
              </span>
              
              <button 
                onClick={handleCartClick}
                className="relative hover:text-blue-200 transition"
              >
                <FiShoppingCart size={24} />
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {totalQuantity}
                  </span>
                )}
              </button>
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 hover:text-blue-200 transition"
              >
                <FiLogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
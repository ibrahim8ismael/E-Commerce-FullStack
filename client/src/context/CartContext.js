import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (user && user.token) {
        try {
          setLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.get('/api/cart', config);
          setCartItems(data.cartItems || []);
        } catch (error) {
          setError(
            error.response && error.response.data.message
              ? error.response.data.message
              : 'Failed to fetch cart items'
          );
        } finally {
          setLoading(false);
        }
      } else {
        // If not logged in, get cart from localStorage
        const cartFromStorage = localStorage.getItem('cartItems')
          ? JSON.parse(localStorage.getItem('cartItems'))
          : [];
        setCartItems(cartFromStorage);
      }
    };

    fetchCartItems();
  }, [user]);

  const addToCart = async (product, quantity = 1) => {
    try {
      const existItem = cartItems.find((x) => x.product === product._id);
      
      const item = {
        product: product._id,
        name: product.name,
        image: product.images[0],
        price: product.price,
        qty: existItem ? existItem.qty + quantity : quantity,
      };

      if (user && user.token) {
        setLoading(true);
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        };
        
        await axios.post('/api/cart', { ...item }, config);
        
        // Refresh cart after adding
        const { data } = await axios.get('/api/cart', config);
        setCartItems(data.cartItems);
      } else {
        // Handle guest cart
        if (existItem) {
          setCartItems(
            cartItems.map((x) =>
              x.product === product._id ? { ...x, qty: x.qty + quantity } : x
            )
          );
        } else {
          setCartItems([...cartItems, item]);
        }
        
        localStorage.setItem('cartItems', JSON.stringify([...cartItems, item]));
      }
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Failed to add item to cart'
      );
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (id) => {
    try {
      if (user && user.token) {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        
        await axios.delete(`/api/cart/${id}`, config);
        
        // Refresh cart after removing
        const { data } = await axios.get('/api/cart', config);
        setCartItems(data.cartItems);
      } else {
        // Handle guest cart
        const updatedCart = cartItems.filter((x) => x.product !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      }
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Failed to remove item from cart'
      );
    } finally {
      setLoading(false);
    }
  };

  const updateCartQuantity = async (id, qty) => {
    try {
      if (user && user.token) {
        setLoading(true);
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        };
        
        await axios.put(`/api/cart/${id}`, { qty }, config);
        
        // Refresh cart after updating
        const { data } = await axios.get('/api/cart', config);
        setCartItems(data.cartItems);
      } else {
        // Handle guest cart
        const updatedCart = cartItems.map((item) =>
          item.product === id ? { ...item, qty } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      }
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Failed to update cart quantity'
      );
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      if (user && user.token) {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        
        await axios.delete('/api/cart', config);
        setCartItems([]);
      } else {
        // Handle guest cart
        setCartItems([]);
        localStorage.removeItem('cartItems');
      }
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Failed to clear cart'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
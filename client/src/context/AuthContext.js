import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null;
    
    if (userInfo) {
      setUser(userInfo);
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/users/login', { email, password });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setError(null);
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'An unexpected error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/users', { name, email, password });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setError(null);
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'An unexpected error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put('/api/users/profile', userData, config);
      setUser({ ...data, token: user.token });
      localStorage.setItem('userInfo', JSON.stringify({ ...data, token: user.token }));
      setError(null);
      return true;
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'An unexpected error occurred'
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
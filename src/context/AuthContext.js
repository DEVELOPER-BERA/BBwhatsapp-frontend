// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        const userResponse = await api.get('/users/me');
        setUser(userResponse.data);
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token } = response;
      
      await AsyncStorage.setItem('token', token);
      setToken(token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const userResponse = await api.get('/users/me');
      setUser(userResponse.data);
    } catch (error) {
      throw new Error(error.response?.data?.msg || 'Login failed');
    }
  };

  const register = async (email, password, username) => {
    try {
      const response = await api.post('/auth/register', { email, password, username });
      const { token } = response;
      
      await AsyncStorage.setItem('token', token);
      setToken(token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const userResponse = await api.get('/users/me');
      setUser(userResponse.data);
    } catch (error) {
      throw new Error(error.response?.data?.msg || 'Registration failed');
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setToken(null);
      setUser(null);
      delete api.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

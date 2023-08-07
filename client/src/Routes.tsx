import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import CartPage from './pages/CartPage';
import CatalogPage from './pages/CatalogPage';
import MainPage from './pages/MainPage';
import NewOrderPage from './pages/NewOrderPage';
import OrderPage from './pages/OrderPage';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';

export const useRoutes = (isAutheficated: boolean) => {
  if (isAutheficated) {
    return (
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/order" element={<NewOrderPage />} />
        <Route path="/profile/order/:id" element={<OrderPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CatalogPage />} />
        <Route path="/catalog/product/:id" element={<ProductPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/cart" element={<CartPage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/catalog/:id" element={<CatalogPage />} />
      <Route path="/catalog/product/:id" element={<ProductPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

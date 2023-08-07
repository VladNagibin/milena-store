import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { out } from '../reducers/authReducer';
export default function Header() {
  const { login } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const length = useAppSelector((state) => state.cart.products.length);
  return (
    <div className="header">
      <div className="top">
        <div className="logo">
          <img src="/logo-ms-1.png" />
        </div>
        <div className="catalog">
          <Button startIcon={<DehazeIcon />}>Каталог</Button>
        </div>
        <div className="finder">
          <TextField
            placeholder="Поиск"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="buttons">
          <Button>Корзина</Button>
          <Button>Выйти</Button>
        </div>
      </div>
      <div className="bottom">
        <NavLink to="/">Доставка и оплата</NavLink>
        <NavLink to="/">Контакты</NavLink>
        <NavLink to="/">О компании</NavLink>
        <NavLink to="/">+7 983 564 66 31</NavLink>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Button,
  ClickAwayListener,
  InputAdornment,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { out } from '../reducers/authReducer';
import Categories from './CategoryPanel/Categories';
export default function Header() {
  const { login } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [showCategories, setShowCategories] = useState(false);

  const closeCategories = () => setShowCategories(false);
  return (
    <div className="header">
      <div className="top">
        <div className="logo">
          <NavLink to="/">
            <img src="/logo-ms-1.png" />
          </NavLink>
        </div>
        <div className="catalog">
          <Button
            startIcon={<DehazeIcon />}
            onClick={() => setShowCategories(!showCategories)}
          >
            Каталог
          </Button>
          {showCategories && (
            <ClickAwayListener onClickAway={closeCategories}>
              <div onClick={closeCategories}>
                <Categories />
              </div>
            </ClickAwayListener>
          )}
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
          <Button href="/cart">Корзина</Button>
          {login ? (
            <>
              <Button href="/profile">Профиль</Button>
              <Button onClick={() => dispatch(out())}>Выйти</Button>
            </>
          ) : (
            <Button href="/auth">Войти</Button>
          )}
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

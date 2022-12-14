import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useAuth } from "../hooks/auth.hook";

const Navbar = () => {
  const { out } = useContext(AuthContext);
  return (
    <header className="header">
      <nav>
        <ul className="nav_links">
          <li>
            <Link to={"/"}>Категории</Link>
          </li>
          <li>
            <Link to={"/order"}>Заказы</Link>
          </li>
        </ul>
      </nav>
      <Link to={"/auth"}>
        <button onClick={out}>Выйти</button>
      </Link>
    </header>
  );
};

export default Navbar;

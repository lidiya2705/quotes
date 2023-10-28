import React from "react";
import s from "./Header.module.css";
import Menu, { Item } from "devextreme-react/menu";
import { useLocation } from "react-router-dom";
import { routes } from "routes/routes";

export const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className={s.menu}>
      <Menu orientation="horizontal">
        {routes.map((item) => (
          <Item
            url={item.path}
            selected={item.path === location.pathname}
            text={item.name}
            key={item.id}
            icon={item.icon}
          />
        ))}
      </Menu>
    </header>
  );
};

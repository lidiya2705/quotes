import React from "react";
import s from "./MyMenu.module.css";
import Menu, { Item } from "devextreme-react/menu";
import { useLocation } from "react-router-dom";

interface IMenuItem {
  id: number;
  name: string;
  path: string;
}

const menuItems: IMenuItem[] = [
  { id: 1, name: "Quotes", path: "/" },
  { id: 2, name: "Favorite", path: "/favorite" },
];

export const MyMenu: React.FC = () => {
  const location = useLocation();

  return (
    <div className={s.menu}>
      <Menu orientation="horizontal">
        {menuItems.map((item) => (
          <Item
            url={item.path}
            selected={item.path === location.pathname}
            text={item.name}
            key={item.id}
          />
        ))}
      </Menu>
    </div>
  );
};

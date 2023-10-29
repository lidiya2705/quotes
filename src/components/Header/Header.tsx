import React from "react";
import s from "./Header.module.css";
import Menu, { Item } from "devextreme-react/menu";
import { useLocation, useNavigate } from "react-router-dom";
import { IRoute, routes } from "routes/routes";
import { ItemClickEvent } from "devextreme/ui/menu";

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleItemClick = (e: ItemClickEvent) => {
    const newURL = routes.find((item) => item.name === e.itemData?.text)?.path;
    if (newURL) navigate(newURL);
  };

  const itemRender = (item: IRoute) => {
    return (
      <div className={location.pathname === item.path ? s.activeItem : ""}>
        {item.name}
      </div>
    );
  };

  return (
    <header className={s.menu}>
      <Menu orientation="horizontal" onItemClick={handleItemClick}>
        {routes.map((item) => {
          return (
            <Item
              key={item.id}
              text={item.name}
              component={() => itemRender(item)}
              selectable={false}
            />
          );
        })}
      </Menu>
    </header>
  );
};

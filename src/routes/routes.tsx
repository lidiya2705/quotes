import { Favorite } from "pages/Favorite";
import { Quotes } from "pages/Quotes";

interface IRoute {
  id: number;
  name: string;
  path: string;
  element: React.ReactNode;
  icon?: string;
}

export const routes: IRoute[] = [
  {
    id: 1,
    path: "/",
    name: "Quotes",
    element: <Quotes />,
    icon: "home",
  },
  {
    id: 2,
    path: "/favorite",
    name: "Favorite",
    element: <Favorite />,
    icon: "favorites",
  },
];

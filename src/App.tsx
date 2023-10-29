import { Header } from "components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { routes } from "routes/routes";
import { Main } from "components/Main/Main";
import { useEffect } from "react";
import { rootStore } from "store/rootStore";

function App() {
  useEffect(() => {
    rootStore.loadQuotes();
    const favoriteAsString = localStorage.getItem("favorite");
    favoriteAsString &&
      rootStore.setFavoriteQuoteIds(JSON.parse(favoriteAsString));
  }, []); //eslint-disable-line

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Main>
          <Routes>
            {routes.map((item) => (
              <Route element={item.element} path={item.path} key={item.id} />
            ))}
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </Main>
      </BrowserRouter>
    </div>
  );
}

export default App;

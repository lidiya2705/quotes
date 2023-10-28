import { Header } from "components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { routes } from "routes/routes";
import { Main } from "components/Main/Main";

function App() {
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

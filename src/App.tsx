import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./pages/home";
import { HOME_LINKS } from "./shared/home-links";


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route index element={<HomePage />} />
      {
        HOME_LINKS.map((link, index) => <Route key={index} path={link.path} element={link.element} />)
      }
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;

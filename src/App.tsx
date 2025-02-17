import { Route, Routes } from "react-router-dom";

import AlgoritmicalWidget from "./pages/Algoritmical/AlgoritmicalWidget";
import { ROUTES } from "./utils/constants";
import StandartWidget from "./pages/Standart/StandartWidget";
import { Home } from "./pages/Home/Home";
import { Layout } from "./common/Layout/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.standart} element={<StandartWidget />} />
        <Route path={ROUTES.algoritmical} element={<AlgoritmicalWidget />} />
      </Route>
    </Routes>
  );
}

export default App;

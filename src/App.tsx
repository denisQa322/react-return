import { FC } from "react";
import { Outlet } from "react-router-dom";
import "./assets/styles/global.scss";
import Header from "./components/HeaderComponent";

const App: FC = () => {
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  );
};

export default App;

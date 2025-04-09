// src/pages/Home.tsx
import { FC } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/homepage.scss";

const Home: FC = () => {
  return (
    <>
      <main>
        <div className="main container">
          <div className="main-info">
            <h1 className="main-info-header">
              Добро пожаловать в
              <div className="main-info-header-span">
                систему управления заказами
              </div>
            </h1>
            <p className="main-info-text">
              Данная система предназначена для учета по
              <span>
                {" "}
                <Link to="/returns-page">возвратам</Link>
              </span>{" "}
              и
              <span>
                {" "}
                <Link to="/cancellations-page">отменам</Link>
              </span>{" "}
              заказов
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

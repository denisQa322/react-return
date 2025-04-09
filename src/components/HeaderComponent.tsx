import { FC } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/header.scss";
import HomeImage from "../assets/images/support-main-img.png";

const Header: FC = () => {
  return (
    <header>
      <div className="header container">
        <nav className="header-navigation">
          <div className="header-navigation-home-page">
            <Link to="/">
              <img src={HomeImage} alt="" />
            </Link>
          </div>
          <div className="header-navigation-pages">
            <Link to="/returns-page">Возвраты</Link>

            <Link to="/Cancellations-page">Отмены</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

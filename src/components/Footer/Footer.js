import React from "react";
import "./Footer.css";
import '../../vendor/hover.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__description">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <nav>
        <ul className="footer__list">
          <li>
            <a
              href="https://practicum.yandex.ru"
              className="footer__list-item hover"
              target="_blank"
              rel="noopener noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__list-item">
            <a
              href="https://github.com/GeorgySemeonov"
              className="footer__list-item hover"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </nav>
      <p className="footer__list-item footer__copyright">© 2023</p>
    </footer>
  );
}
export default Footer;

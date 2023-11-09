import React from "react";
import Portfolio from "../Portfolio/Portfolio";
import pic from "../../images/pic.png";
import "./AboutMe.css";
import '../../vendor/hover.css';

function AboutMe() {
  return (
    <section id="about-me" className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__content">
        <img className="about-me__pic" src={pic} alt="фото студента" />
        <div className="about-me__text">
          <h3 className="about-me__content-title">Виталий</h3>
          <p className="about-me__content-subtitle">
            Фронтенд-разработчик, 30 лет
          </p>
          <p className="about-me__subtitle">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a href="https://github.com" target="_blank" className="about-me__link hover">
            Github
          </a>
        </div>
      </div>

      <Portfolio />
    </section>
  );
}
export default AboutMe;

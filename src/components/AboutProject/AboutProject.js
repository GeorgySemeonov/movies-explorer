import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section id="about-project" className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="two-columns">
        <div className="two-columns__item">
          <h3 className="two-columns__title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="two-columns__subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки
          </p>
        </div>
        <div className="two-columns__item">
          <h3 className="two-columns__title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="two-columns__subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>

      <div className="about-project__progress">
        <div className="about-project__progress-item">1 неделя</div>
        <div className="about-project__progress-item">4 недели</div>
        <div className="about-project__progress-item">Back-end</div>
        <div className="about-project__progress-item">Front-end</div>
      </div>
    </section>
  );
}

export default AboutProject;

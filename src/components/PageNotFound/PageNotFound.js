import React from "react";
import './PageNotFound.css';
import { useHistory } from "react-router-dom";
import '../../vendor/hover.css';

function PageNotFound() {
    const history = useHistory();
 
    return (
        <div className="page-not-found">
            <div className="page-not-found__text">
                <h1 className="page-not-found__title">404</h1>
                <p className="page-not-found__message">Страница не найдена</p>
            </div>
            <p onClick={() => history.goBack()} className="page-not-found__link hover">Назад</p>
        </div>
    )
};

export default PageNotFound;
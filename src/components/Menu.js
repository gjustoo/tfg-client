import React, { useState } from 'react';
import './styles/menuStyle.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
function Menu() {

    const [isActive, setActive] = useState(false);
    const navigate = useNavigate();

    const toggleClass = () => {
        setActive(!isActive);
    };

    const logOut = () => {
        Cookies.remove("user_logged");
        Cookies.remove("user_username");
        navigate("/login");
    };
    const toHome = () => {
        navigate("/home");
    };

    const toProfile= () => {
        navigate("/profile");
    };
    return (

        <div className={isActive ? 'menu_active menu_wrapper' : "menu_wrapper"}>
            <div className="menu_pie pie1 " onClick={logOut}>
                <div className="menu_pie-color menu_pie-color1">
                    <svg className="menu_card" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 17l5-5-5-5M19.8 12H9M10 3H4v18h6" /></svg>
                </div>
            </div>
            <div className="menu_pie menu_pie2 " onClick={toProfile} >
                <div className="menu_pie-color menu_pie-color2">
                    <svg className="menu_discount" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" /><circle cx="12" cy="10" r="3" /><circle cx="12" cy="12" r="10" /></svg>
                </div>
            </div>
            <div className="menu_pie menu_pie3 " onClick={toHome} >
                <div className="menu_pie-color menu_pie-color3">

                    <svg className="menu_cart" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" /><path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" /></svg>

                </div>
            </div>
            <div className="menu_menu" onClick={toggleClass}>
                <svg className="menu_hamburger" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
                    <g
                        fill="none"
                        stroke="#000"
                        strokeWidth="7.999"
                        strokeLinecap="round"
                    >
                        <path d="M 55,26.000284 L 24.056276,25.999716" />
                        <path d="M 24.056276,49.999716 L 75.943724,50.000284" />
                        <path d="M 45,73.999716 L 75.943724,74.000284" />
                        <path d="M 75.943724,26.000284 L 45,25.999716" />
                        <path d="M 24.056276,73.999716 L 55,74.000284" />
                    </g>
                </svg>
            </div>

        </div>

    )
}


export default Menu;
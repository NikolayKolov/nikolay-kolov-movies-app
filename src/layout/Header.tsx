import React, { useState } from "react";
import { useNavigate } from "react-router";
import light from "../assets/icons/light.svg";
import dark from "../assets/icons/dark.svg";

const Header = () => {
    const navigate = useNavigate();
    const [theme, setTheme ] = useState(() => {
        const initTheme = document.querySelector("#root")?.getAttribute("data-theme") || "light";
        
        return initTheme;
    });
    const navigateIndex = () => {
        navigate("/");
    }

    let imgSrc;
    if (theme === "light") imgSrc = light;
    else imgSrc = dark;

    const handleTheme = () => {
        if (theme === "light") {
            document.querySelector("#root")?.setAttribute("data-theme", "dark");
            // add CSS spin animation on theme change
            document.querySelector("#themeImg")?.classList.add("spin");
            setTimeout(() => {
                document.querySelector("#themeImg")?.classList.remove("spin");
            }, 250);
            setTheme("dark");
        } else {
            document.querySelector("#root")?.setAttribute("data-theme", "light");
            // add CSS spin animation on theme change
            document.querySelector("#themeImg")?.classList.add("spin");
            setTimeout(() => {
                document.querySelector("#themeImg")?.classList.remove("spin");
            }, 250);
            setTheme("light");
        }
    }

    return (
        <header>
            <div className="header--container">
                <span className="logo" onClick={navigateIndex}>Movies</span>
                <div className="header--container__right">
                    <div className="theme" onClick={handleTheme}>
                        <img
                            src={imgSrc}
                            title={`Set theme to ${theme === "light" ? "dark" : "light"}`}
                            id="themeImg"
                        />
                    </div>
                    <nav className="links">
                        <ul>
                            <li>
                                <a href="/">
                                    <div>
                                        <p>Home</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="link--sign-in">
                                        <p>Sign In</p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
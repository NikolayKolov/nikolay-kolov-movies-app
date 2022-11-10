import React from "react";
import facebook from "../assets/icons/facebook.svg";
import instagram from "../assets/icons/instagram.svg";
import twitter from "../assets/icons/twitter.svg";
import reddit from "../assets/icons/reddit.svg";

const Footer = () => {
    return (
        <footer>
            <nav className="links">
                <ul>
                    <li>
                        <a href="#">
                            <div className="icons">
                                <img src={facebook} title="facebook" />
                                <p>facebook</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div className="icons">
                                <img src={instagram} title="instagram" />
                                <p>instagram</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div className="icons">
                                <img src={twitter} title="twitter" />
                                <p>twitter</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div className="icons">
                                <img src={reddit} title="reddit" />
                                <p>reddit</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </nav>
        </footer>
    );
}

export default Footer;
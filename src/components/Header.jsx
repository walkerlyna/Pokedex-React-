import React from 'react';
import '../styles/header.css';
import { Luna, Sol } from '../assets/Icons';

const Header = () => {
    return (
        <>
            <nav className="header contenedor">
                <img src="/src/assets/pikachu.png" alt="Pikachu" />
                <div className='link'>
                    <div>
                        <a href="https://www.linkedin.com/in/luis-soto72/">
                            <img src="/src/assets/linkedin.svg" alt="Linkedin" />
                        </a>
                        <a href="https://github.com/walkerlyna">
                            <img src="/src/assets/github.svg" alt="Github" />
                        </a>
                    </div>

                    <div className='switch'>
                        <Sol />
                        <label>
                            <input
                                type="checkbox"
                                id="checkbox"
                                hidden />
                            <span></span>
                        </label>
                        <Luna />
                    </div>
                </div>
            </nav>

            <h1>Pokédex</h1>
        </>
    );
};

export default Header;
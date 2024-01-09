import React from 'react';
import '../styles/header.css';

const Header = () => {
    return (
        <>

            <nav className="header contenedor">
                <img src="/src/assets/pikachu.png" alt="Pikachu" />
                <div className='link'>
                    <a href="https://www.linkedin.com/in/luis-soto72/">
                        <img src="/src/assets/linkedin.svg" alt="Linkedin" />
                    </a>
                    <a href="https://github.com/walkerlyna">
                        <img src="/src/assets/github.svg" alt="Github" />
                    </a>
                </div>
            </nav>

            <h1>POKEDEX</h1>
        </>
    );
};

export default Header;
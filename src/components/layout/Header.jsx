/**Header********************************************************* */

import React from 'react';

const Header = (prop) => {

    //toggling navbar upon clicking hamburger icon
    const toggleNavbar = (e) => {
        const element = e.target;
        const bars = element.children;
        const smallerNav = document.querySelector("#forSmallerScreens ul");
        if (element.classList.contains("shown")) {
            element.classList.remove("shown");
            element.classList.add("hidden");
            bars[0].classList.remove("firstBarRotation");
            bars[1].style.opacity = "1";
            bars[2].classList.remove("lastBarRotation");
            smallerNav.classList.remove('shown');
            smallerNav.classList.add('hidden');
        } else {
            element.classList.add("shown");
            element.classList.remove("hidden");
            bars[0].classList.add("firstBarRotation");
            bars[1].style.opacity = "0";
            bars[2].classList.add("lastBarRotation");
            smallerNav.classList.remove('hidden');
            smallerNav.classList.add('shown');
        }
    };

    return (
        <header id="header" style={{ "backgroundImage": prop.background }} className='overflow-hidden'>

            {/* navbar for large screen*************************************************************** */}
            <nav id='forLargerScreens'>
                <ul className='list-unstyled d-flex justify-content-center align-items-center py-3'>
                    <li className='p-3'><a href="#">HOME</a></li>
                    <li className='p-3'><a href="#about">ABOUT</a></li>
                    <li className='p-3'><a href="#portfolio">PORTFOLIO</a></li>
                    <li className='p-3'><a href="#services">SERVICES</a></li>
                    <li className='p-3 logoImg_item'>
                        <a href='#home' className="logoImg d-block px-3">
                            <img src={prop.logo} alt="LOGO IMAGE" className="img-fluid" />
                        </a>
                    </li>
                    <li className='p-3'><a href="#testimonials">CLIENTS</a></li>
                    <li className='p-3'><a href="#gallery">GALLERY</a></li>
                    <li className='p-3'><a href="#latestBlog">BLOG</a></li>
                    <li className='p-3'><a href="#contact">CONTACT</a></li>
                </ul>
            </nav>

            {/* navbar for smalle screen*************************************************************** */}
            <nav id="forSmallerScreens" className='px-3 justify-content-between align-items-center position-relative'>
                <div className='p-3 logoImg'>
                    <a href='#home' className="logoImg">
                        <img src={prop.logo} alt="LOGO IMAGE" className="img-fluid" />
                    </a>
                </div>
                <ul className="list-unstyled position-absolute hidden">
                    <li className='p-3 text-center'><a href="#">HOME</a></li>
                    <li className='p-3 text-center'><a href="#about">ABOUT</a></li>
                    <li className='p-3 text-center'><a href="#services">SERVICES</a></li>
                    <li className='p-3 text-center'><a href="#testimonials">CLIENTS</a></li>
                    <li className='p-3 text-center'><a href="#gallery">GALLERY</a></li>
                    <li className='p-3 text-center'><a href="#latestBlog">BLOG</a></li>
                    <li className='p-3 text-center'><a href="#contact">CONTACT</a></li>
                </ul>
                {/* hamburger icon */}
                <div className="hamburgerIcon d-flex flex-column align-items-center justify-content-between" onClick={toggleNavbar}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </nav>

        </header >
    );
}

export default Header;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../config/env';
import { LogIn } from '../../classes/Login';
import { Crud } from '../../classes/Crud';

const Header = () => {
    const obj = new Crud();
    const navigate = useNavigate();
    const [logo, setLogo] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false);

    //logging out user
    const logout = async () => {
        setLoading(true);
        const obj = new LogIn();
        const data = await obj.logout();
        if (data.success) {
            setLoading(false);
            navigate(`/admin/${ROUTE}/login`);
        }
    };

    useEffect(() => {
        const storedPhotographer = JSON.parse(localStorage.getItem('photographer'));
        setIsLoggedIn(storedPhotographer.data);
        setIsAdmin(verifyAdmin(storedPhotographer.data.authenticationNo));
        fetchLogo();
    }, []);

    const verifyAdmin = (number) => {
        const str = (number.split("2"))[1];
        if (str === '1100') {
            return true;
        }
        return false;
    };

    //fetching logo for header
    const fetchLogo = async () => {
        const data = await obj.get("/layout/api/get");
        if (data.success) {
            setLogo(data.layout[0].lightLogo);
        }
    };

    //showing or hiding menu bar 
    const toggleNavbar = (action = "hidden") => {
        const element = document.querySelector("#forSmallerScreens .hamburgerIcon .icon");
        const bars = element.children;
        if (action === 'show') {
            element.classList.add("shown");
            element.classList.remove("hidden");
            bars[0].classList.add("firstBarRotation");
            bars[1].style.opacity = "0";
            bars[2].classList.add("lastBarRotation");
        } else {
            element.classList.remove("shown");
            element.classList.add("hidden");
            bars[0].classList.remove("firstBarRotation");
            bars[1].style.opacity = "1";
            bars[2].classList.remove("lastBarRotation");
        }
    };

    // toggling menu bar upon hamburger icon click 
    const handleNavbar = () => {
        const smallerNav = document.querySelector("#forSmallerScreens ul");
        const isShown = smallerNav.classList;
        if (isShown.contains('hidden')) {
            smallerNav.classList.remove('hidden');
            smallerNav.classList.add('shown');
            toggleNavbar("show");
        } else {
            smallerNav.classList.remove('shown');
            smallerNav.classList.add('hidden');
            toggleNavbar();
        }
    };

    return (

        <header id="adminHeader">

            {/* for larger screens********************************************* */}
            <nav id='forLargerScreens' className='position-relative'>
                <ul className='list-unstyled d-flex justify-content-center align-items-center py-3'>
                    {
                        isAdmin
                            ?
                            <>
                                <li className='py-2 px-3'><Link to={`/admin/${ROUTE}/`}>DASHBOARD</Link></li>
                                <li className='py-2 px-3'><Link to={`/admin/${ROUTE}/photographers`}>PHOTOGRAPHERS</Link></li>
                                <li className='py-2 px-3'><Link to={`/admin/${ROUTE}/services`}>SERVICES</Link></li>
                                <li className='py-2 px-3'><Link to={`/admin/${ROUTE}/portfolioes`}>PORTFOLIOES</Link></li>
                                <li className='py-2 px-3'><Link to={`/admin/${ROUTE}/blogs`}>BLOGS</Link></li>
                            </>
                            :
                            null
                    }
                    <li className='py-2 px-3'><Link to={`/admin/${ROUTE}/testimonies`}>TESTIMONIES</Link></li>
                    <li className='py-2 px-3'><Link to={`/admin/${ROUTE}/posts`}>POSTS</Link></li>
                    <li>
                        <div className="profilePic overflow-hidden">
                            <Link to={`/admin/${ROUTE}/profile/${isLoggedIn._id}`}><img src={isLoggedIn.avatar} alt="profile picture" className="img-fluid" /></Link>
                        </div>
                    </li>
                </ul>
                <button type="button" className="btn adminBtn bg-danger text-light position-absolute logout_btn" onClick={logout}>
                    {
                        loading
                            ? <div className="spinner-border spinner-border-sm"></div>
                            : <>Logout</>
                    }
                </button>
            </nav>

            {/* for smaller screens **********************************************/}
            <nav id="forSmallerScreens" className='px-3 justify-content-between align-items-center position-relative'>
                <div className='py-2 px-3 logoImg'>
                    <Link to={'/admin/admin'} className="logoImg">
                        <img src={logo} alt="LOGO IMAGE" className="img-fluid" />
                    </Link>
                </div>
                <ul className="list-unstyled position-absolute hidden">
                    {
                        isAdmin
                            ?
                            <>
                                <li className='py-2 px-3'><Link to={`/admin/${ROUTE}`}>DASHBOARD</Link></li>
                                <li className='py-2 px-3'><Link to={`/admin/${ROUTE}/photographers`}>PHOTOGRAPHERS</Link></li>
                                <li className='py-2 px-3'><Link to={`/admin/${ROUTE}/services`}>SERVICES</Link></li>
                                <li className='py-2 px-3'><Link to={`/admin/${ROUTE}/portfolioes`}>PORTFOLIOES</Link></li>
                                <li className='py-2 px-3'><Link to={`/admin/${ROUTE}/blogs`}>BLOGS</Link></li>
                            </>
                            :
                            null
                    }
                    <li className='py-2 px-3'><Link to={`/admin/${ROUTE}/testimonies`}>TESTIMONIES</Link></li>
                    <li className='py-2 px-3'><Link to={`/admin/${ROUTE}/posts`}>POSTS</Link></li>
                    <li className='py-2 px-3'>
                        <button type="button" className="btn adminBtn bg-danger text-light logout_btn" onClick={logout}>
                            {
                                loading
                                    ? <div className="spinner-border spinner-border-sm"></div>
                                    : <>Logout</>
                            }
                        </button>
                    </li>
                </ul>
                <div className="hamburgerIcon d-flex justify-content-center align-items-center">
                    <Link to={`/admin/${ROUTE}/profile/${isLoggedIn._id}`} className="profilePic overflow-hidden">
                        <img src={isLoggedIn.avatar} alt="profile picture" className="img-fluid" />
                    </Link>
                    <div className="icon d-flex flex-column align-items-center justify-content-between" onClick={handleNavbar}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                </div>
            </nav>

        </header>
    );
}

export default Header;
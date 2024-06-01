import React from 'react';
import { ROUTE } from '../../../config/env.js';
import { Link } from 'react-router-dom';
import Header from '../layout/Header';

const Dashboard = () => {
    return (
        <>
            <Header />
            <div className="container py-3">
                <div className="mb-3">
                    <div className="heading mb-2">
                        <h4 className='m-0 p-0'>Edit</h4>
                    </div>
                    <nav className="navbar navbar-expand-md navbar-light bg-light">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className='nav-link px-4' to={`/admin/${ROUTE}/update/logo`}>Logo</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link px-4' to={`/admin/${ROUTE}/update/banner`}>Banner</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link px-4' to={`/admin/${ROUTE}/socials/update`}>Socials</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="mb-3">
                    <div className="heading mb-2">
                        <h4 className='m-0 p-0'>Add</h4>
                    </div>
                    <nav className="navbar navbar-expand-md navbar-light bg-light">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className='nav-link px-4' to={`/admin/${ROUTE}/photographer/add`}>Phtographer</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link px-4' to={`/admin/${ROUTE}/add/services`}>Service</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link px-4' to={`/admin/${ROUTE}/portfolio/add`}>Portfolio</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link px-4' to={`/admin/${ROUTE}/add/blog`}>Blog</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link px-4' to={`/admin/${ROUTE}/add/testimony`}>Testimonial</Link>
                            </li>

                            <li className="nav-item">
                                <Link className='nav-link px-4' to={`/admin/${ROUTE}/post/add`}>Posts</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
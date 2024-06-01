import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../layout/Header.jsx';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loader from '../components/Loader.jsx';
import { ROUTE } from '../../../config/env.js';
import { Crud } from '../../classes/Crud.js';
import Toast from '../components/Toast.jsx';
import { Context } from '../../main.jsx';

const AllPortfolioes = () => {

    const [portfolios, setPortfolios] = useState([]);

    const {
        loading, setLoading,
        arePostsFound, setArePostsFound,
        error,
        isError,
        showAlert
    } = useContext(Context);


    useEffect(() => {
        setLoading(true);
        fetchPortfolios();
    }, []);

    //fetching portfolio data
    const fetchPortfolios = async () => {
        const obj = new Crud();
        const data = await obj.get("/portfolio/api/get");
        setLoading(false);
        if (data.success) {
            setArePostsFound(true);
            setPortfolios(data.portfolioes);
        } else {
            showAlert(data.message);
        }
    };

    return (
        <>
            {
                loading && !arePostsFound
                    ? <Loader />
                    :
                    <>
                        <Header />
                        <section className="py-5" id='allImages'>
                            <div className="container">
                                {
                                    isError
                                        ? <Toast cls={"bg-danger"} message={error} />
                                        : null
                                }
                                <div className="heading d-flex justify-content-between align-items-center py-2">
                                    <h1>Portfolios</h1>
                                    <div className="addBtn">
                                        <Link to={`/admin/${ROUTE}/portfolio/add`} className='rounded text-light adminBtn'>Add</Link>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover table-stripped">
                                        <thead>
                                            <tr className='text-light'>
                                                <th>Sr.no</th>
                                                <th>Title</th>
                                                <th>posts</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                portfolios.map((portfolio, index) =>
                                                    <tr key={++index}>
                                                        <td>{++index}.</td>
                                                        <td>{portfolio.title}</td>
                                                        <td>{portfolio.posts}</td>
                                                        <td>
                                                            <Link to={`/admin/${ROUTE}/portfolio/update/${portfolio._id}`} className="p-0 edit-btn btn btn-sm text-success"><FaEdit /></Link>
                                                            <Link to={`/admin/${ROUTE}/portfolio/delete/${portfolio._id}/${encodeURIComponent(location.pathname)}`} className="p-0 delete-btn btn btn-sm text-danger"><MdDelete /></Link>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    </>
            }
        </>
    );
}

export default AllPortfolioes;
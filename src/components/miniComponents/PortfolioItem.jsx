/**portfolio item ***************************************************** */

import React from 'react';
import { Link } from 'react-router-dom';

const PortfolioItem = (prop) => {
    return (
        <div className="portfolio position-relative">
            <img src={prop.bg} alt="portfolio image" />
            <div className="portfolioEnvelope position-absolute">
                <div className="viewLink position-absolute">
                    <Link to={prop.link}>VIEW PORTFOLIO</Link>
                </div>
            </div>
            <div className="heading py-2 position-absolute">
                <h2 className="m-0 p-0 text-center text-light">{prop.Title}</h2>
            </div>
        </div>
    );
}

export default PortfolioItem;
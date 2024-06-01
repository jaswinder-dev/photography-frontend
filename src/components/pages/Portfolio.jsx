import React, { useEffect, useState } from 'react';
import PortfolioItem from '../miniComponents/PortfolioItem';
import { Crud } from '../../classes/Crud';

const Portfolio = () => {

  const [portfolioes, setPortfolioes] = useState([]);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  //getting the portfolio data
  const fetchPortfolios = async () => {
    const obj = new Crud();
    const data = await obj.get("/portfolio/api/get/frontend");
    if (data.success) {
      setPortfolioes(data.portfolioes);
    }
  };

  return (
    <section className="py-5" id='portfolio'>
      <div className="container">
        <div className="heading mb-3">
          <h1 className="text-center m-0 p-0">~ PORTFOLIO ~</h1>
        </div>
        <div className="portfolios">
          {
            portfolioes.map((portfolio, index) =>
              portfolio.title !== 'Uncategorized'
                ?
                <PortfolioItem key={++index} bg={portfolio.image} Title={portfolio.title} link={`/portfolio/${portfolio.title}/${portfolio._id}`} />
                : null
            )
          }
        </div>
      </div>
    </section>
  )
}

export default Portfolio;
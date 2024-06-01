import React, { useEffect, useState } from 'react';
import About from '../pages/About';
import Portfolio from '../pages/Portfolio';
import Services from '../pages/Services';
import Testimonials from '../pages/Testimonials';
import Gallery from '../pages/Gallery';
import LatestBlog from '../pages/LatestBlog';
import Contact from '../pages/Contact';
import Footer from './Footer';
import Header from './Header';
import { Crud } from '../../classes/Crud';
import AOS from 'aos';
import "aos/dist/aos.css";

const Home = () => {

    const [darkLogo, setDarkLogo] = useState("");
    const [lightLogo, setLightLogo] = useState("");
    const [background, setBackground] = useState("");

    useEffect(() => {
        fetchData();
        AOS.init({ duration: 1000 });
    }, []);

    const fetchData = async () => {
        const obj = new Crud();
        const data = await obj.get("/layout/api/get");
        if (data.success) {
            setLightLogo(data.layout[0].lightLogo);
            setDarkLogo(data.layout[0].darkLogo);
            setBackground("var(--primary-gradient),url(" + data.layout[0].banner + ")");
        }
    };

    return (
        <>
            <Header logo={lightLogo} background={background} />
            <About logo={darkLogo} />
            <Portfolio />
            <Services />
            <Testimonials />
            <Gallery />
            <LatestBlog />
            <Contact logo={darkLogo} />
            <Footer />
        </>
    );
}

export default Home;
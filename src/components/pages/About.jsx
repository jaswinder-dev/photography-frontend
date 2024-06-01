import React from 'react';

const About = (prop) => {

    return (
        <section className="py-5" id='about'>
            <div className="heading mb-3">
                <h1 className="text-center m-0 p-0">WE CAPTURE MOMENTS</h1>
            </div>
            <div className="description text-center px-2 mx-auto">
                <p>
                    Welcome to Sanju studio, where moments become timeless treasures. Our team transforms scenes into extraordinary narratives, ensuring each frame reflects clients' visions. We specialize in capturing raw emotions and genuine moments, weaving a tapestry of cherished memories.
                    <br />
                    Join us in celebrating life's precious moments and immortalizing memories at Sanju Studio.
                </p>
            </div>
            <div className="descriptionLogo py-3 text-center">
                <img src={prop.logo} alt="LOGO" className='mx-auto' />
            </div>
        </section>
    );
}

export default About;
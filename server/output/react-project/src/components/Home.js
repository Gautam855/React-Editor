
    import React from 'react';
    import Typed from 'typed.js';
    import './../index.css';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faInstagram, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

    const Home = () => {
        React.useEffect(() => {
            const options = {
                strings: ['Frontend Developer', 'Coder', 'Full Stack Developer', 'Programmer'],
                typeSpeed: 100,
                backSpeed: 100,
                backDelay: 1000,
                loop: true,
            };
            const typed = new Typed('.typed-text', options);
            return () => {
                typed.destroy();
            };
        }, []);

        return (
            <section id="home" className="home min-h-screen flex items-center px-8 bg-[#212732]">
                <div className="flex gap-8 w-full h-full">
                    <div className="flex flex-col w-3/6 justify-center">
                        <div className="zon">
                            <h2 className="text-3xl font-semibold text-white">Hello, it's me</h2>
                            <h1 className="text-4xl font-semibold text-white">Gautam Verma</h1>
                            <h2 className="text-3xl font-semibold text-white">
                                and I am a <span className="typed-text text-[#00eeff] mt-2"></span>
                            </h2>
                            <p className="mt-4 text-lg font-semibold text-white">
                                I’m a MERN stack developer and here is my portfolio website. Here you’ll learn about my journey as a software developer.
                            </p>
                        </div>
                        <div className="flex justify-center mt-6">
                            <a href="www.google.com" className="mx-2 text-4xl text-white hover:text-[#00eeff] transition-all duration-300">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a href="www.google.com" className="mx-2 text-4xl text-white hover:text-[#00eeff] transition-all duration-300">
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                            <a href="www.google.com" className="mx-2 text-4xl text-white hover:text-[#00eeff] transition-all duration-300">
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                        </div>
                        <button className="mt-6 mx-auto px-10 py-3 bg-[#00eeff] text-[#212732] font-bold rounded-full shadow-lg hover:bg-white hover:text-[#212732] transform hover:scale-105 transition-all duration-300">
                            Download CV
                        </button>
                    </div>
                    <div className="img-box flex-1 flex justify-center items-center">
                        <img src="copy.png" alt="Profile" className="w-11/12 h-auto transform -scale-x-150 animate-floatImage" />
                    </div>
                </div>
            </section>
        );
    };

    export default Home;
    
import React from 'react';
import { Hero } from '../Components/HomePage/Hero';
import { About } from '../Components/HomePage/About';
import { Skills } from '../Components/HomePage/Skills';
import { Projects } from '../Components/HomePage/Projects';
import { Contact } from '../Components/HomePage/Contact';
import { Navbar } from '../Components/Navbar';
import { SocialLinks } from '../Components/SocialLinks';
import { Footer } from '../Components/HomePage/Footer';
import { Bounce, ToastContainer } from 'react-toastify';
import { Achievements } from '../Components/HomePage/Achievements';

const Home: React.FC = () => {
    return (
        <div className="main-bg">
            <Navbar />
            <main className="px-10 sm:px-6">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Achievements />
                <Contact />
                <SocialLinks />
            </main>
            <Footer />
            <ToastContainer position="bottom-right"
                autoClose={5000} hideProgressBar={false} newestOnTop
                closeOnClick rtl={false} pauseOnFocusLoss draggable
                pauseOnHover theme="dark" transition={Bounce}
            />
        </div>
    );
};

export default Home;
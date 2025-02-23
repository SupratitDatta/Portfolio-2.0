import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeSwitcher } from './ThemeSwitcher';
import { MotionHeader } from '../utils/motion';
import { navigationLinks } from '../assets/data';
import Music from './Music';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isRendered, setIsRendered] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        setIsRendered(true);

        const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', checkIfMobile);

        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId.substring(1));
        if (section) {
            const headerHeight = document.querySelector('header')?.clientHeight || 0;
            window.scrollTo({ top: section.offsetTop - headerHeight, behavior: 'smooth' });
        }
        if (isMobile) setIsMenuOpen(false);
    };

    if (!isRendered) return null;

    return (
        <MotionHeader
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className={`fixed left-1/2 transform -translate-x-1/2 z-30 px-10 sm:px-6 backdrop-blur-lg bg-transparent border border-dynamic/30 light:border-black transition-translate duration-1000 ${isScrolled ? 'w-[85%] sm:w-[90%] top-[4vh] sm:top-[3vh] shadow-xl rounded-xl' : 'w-full top-0 rounded-none'}`}
        >
            <div className="mx-auto max-w-5xl">
                <div className="flex h-16 items-center justify-between sm:flex">
                    <Link
                        to={'/'}
                        onClick={(e) => {
                            if (window.location.pathname === '/') {
                                e.preventDefault()
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }
                        }}
                    >
                        <p className="text-3xl font-bold">
                            SD <span className="text-target"></span>
                        </p>
                    </Link>
                    <nav className="relative z-50">
                        {!isMobile && (
                            <ul className="flex items-center gap-8">
                                {navigationLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            className="relative flex items-center text-lg font-bold transition before:absolute before:text-yellow-400 before:opacity-0 before:transition before:content-['{'] after:absolute after:right-0 after:text-yellow-400 after:opacity-0 after:transition after:content-['}'] hover:text-target before:hover:-translate-x-4 before:hover:opacity-100 after:hover:translate-x-4 after:hover:opacity-100"
                                            to={link.path}
                                            onClick={() => scrollToSection(link.path)}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {isMobile && (
                            <div className="fixed top-4 right-4 z-50">
                                <button
                                    className="relative w-8 h-8 flex justify-center items-center"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                                >
                                    <span className={`absolute h-0.5 w-6 bg-current dark:bg-white bg-black transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 text-white' : '-translate-y-1.5'}`}></span>
                                    <span className={`absolute h-0.5 w-6 bg-current dark:bg-white bg-black transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'opacity-0 text-white' : 'opacity-100'}`}></span>
                                    <span className={`absolute h-0.5 w-6 bg-current dark:bg-white bg-black transform transition-transform duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 text-white' : 'translate-y-1.5'}`}></span>
                                </button>
                            </div>
                        )}
                        {isMobile && (
                            <div
                                className={`fixed left-0 top-0 right-0 h-[110vh] w-[110vw] bg-black/95 backdrop-blur-3xl transform transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} ${isScrolled ? 'ml-[-7%] mt-[-10%]' : 'ml-[0%] mt-[0%]'}`}
                            >
                                <div className="flex flex-col h-full justify-center items-center">
                                    <ul className="flex flex-col items-center gap-8">
                                        {navigationLinks.map((link, index) => (
                                            <li
                                                key={index}
                                                className={`transition-transform duration-1000 transform ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[100vw]'}`}
                                                style={{ transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms' }}
                                            >
                                                <Link
                                                    className="text-white relative flex items-center text-2xl transition before:absolute before:text-yellow-400 before:opacity-0 before:transition before:content-['{'] after:absolute after:right-0 after:text-yellow-400 after:opacity-0 after:transition after:content-['}'] hover:text-target before:hover:-translate-x-4 before:hover:opacity-100 after:hover:translate-x-4 after:hover:opacity-100"
                                                    to={link.path}
                                                    onClick={() => scrollToSection(link.path)}
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </nav>
                    <div className="sm:mr-10 flex justify-center items-center">
                        <Music />
                        <ThemeSwitcher />
                    </div>
                </div>
            </div>
        </MotionHeader>
    )
}
import { useEffect, useRef } from 'react';
import { MotionDiv } from '../utils/motion';
import { Github, Linkedin, Instagram, Twitter } from 'lucide-react';
import Progressbar from './ProgressBar';

export const socialData = [
    { link: 'https://github.com/SupratitDatta', icon: <Github />, label: 'GitHub', color: 'hover:text-gray-500' },
    { link: 'https://www.linkedin.com/in/supratit-datta-1b902b258', icon: <Linkedin />, label: 'LinkedIn', color: 'hover:text-blue-700' },
    { link: 'https://www.instagram.com/its_supratit_here', icon: <Instagram />, label: 'Instagram', color: 'hover:text-pink-500' },
    { link: 'https://twitter.com/Supratit_datta', icon: <Twitter />, label: 'Twitter', color: 'hover:text-indigo-400' }
];

export const SocialLinks = () => {
    const containerRef = useRef(null);

    useEffect(() => {
    }, []);

    return (
        <MotionDiv
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[30vh] left-10 flex flex-col items-center gap-y-4 md:hidden"
        >
            {/* <div className="mt-4 w-[2px] bg-target relative" style={{ height: '20vh' }}>
                <div className="absolute bottom-0 w-full bg-accent"
                    style={{ height: `${scrollProgress}%`, transition: 'height 0.1s ease-out' }}
                ></div>
            </div> */}
            {socialData.map((social, index) => (
                <a
                    key={index}
                    className={`transition hover:-translate-x-[-5px] duration-500 ${social.color}`}
                    target="_blank"
                    href={social.link}
                    rel="noreferrer"
                >
                    {social.icon}
                </a>
            ))}
            <div className="w-full flex justify-center items-center bg-white">
                < Progressbar />
            </div>
        </MotionDiv>
    );
};
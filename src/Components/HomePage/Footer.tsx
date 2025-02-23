import { MotionDiv } from '../../utils/motion';
import { Github, Linkedin, Instagram, Twitter } from 'lucide-react';

const iconSize = { width: 28, height: 28 };

export const socialData = [
    { link: 'https://github.com/SupratitDatta', icon: <Github {...iconSize} />, label: 'GitHub', color: 'hover:text-gray-500' },
    { link: 'https://www.linkedin.com/in/supratit-datta-1b902b258', icon: <Linkedin {...iconSize} />, label: 'LinkedIn', color: 'hover:text-blue-700' },
    { link: 'https://www.instagram.com/its_supratit_here', icon: <Instagram {...iconSize} />, label: 'Instagram', color: 'hover:text-pink-500' },
    { link: 'https://twitter.com/Supratit_datta', icon: <Twitter {...iconSize} />, label: 'Twitter', color: 'hover:text-indigo-400' }
];

export const Footer = () => {
    return (
        <footer className="px-10 sm:px-6">
            <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mx-auto flex w-full max-w-5xl items-center justify-between border-t-2 py-4 text-lg sm:flex-col sm:gap-y-6"
            >
                <p className="font-medium flex">© 2025<p className="text-target ml-2 font-bold">SUPRATIT DATTA</p></p>
                <div className="flex items-center gap-4">
                    {socialData.map((social, index) => (
                        <a
                            key={index}
                            className={`${social.color} transition hover:-translate-y-1 p-2 bg-dynamic-rev text-col rounded-full hover:scale-[1.02] active:scale-95 duration-300`}
                            target="_blank"
                            href={social.link}
                            rel="noopener noreferrer"
                            aria-label={social.label}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            </MotionDiv>
        </footer>
    );
};
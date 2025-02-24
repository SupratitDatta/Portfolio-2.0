import { useEffect, useState } from 'react';
import Typed from 'typed.js';
import { MotionDiv, MotionH1, MotionP } from '../../utils/motion';
import { Github, Linkedin } from 'lucide-react';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AnimatedLines from '../AnimatedLines';

export const Hero = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const typed = new Typed('#typed-text', {
            strings: ['A Full Stack Developer', 'A Backend Engineer', 'A Designer', 'An API Developer'],
            typeSpeed: 100,
            backSpeed: 50,
            loop: true,
        });
        return () => typed.destroy();
    }, []);

    const handleDownload = async () => {
        try {
            const resumeUrl = import.meta.env.VITE_RESUME_URL;
            window.open(resumeUrl, "_blank");

            toast.success("Resume Opened successfully🎉", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
        catch (error) {
            toast.error("An unexpected error occurred. Please try again.", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    };


    return (
        <section id="home" className="flex flex-col items-center min-h-screen h-auto pt-[25vh] sm:pt-[16vh]">
            <MotionDiv className="max-w-5xl flex w-full px-6 md:flex-row flex-row sm:flex-col items-center justify-between">
                <div className="flex flex-col items-start justify-center w-[60%] sm:w-full gap-4 text-left sm:text-center">
                    <h3 className="text-2xl text-gray-500 sm:w-full sm:text-center">Hello, I am</h3>
                    <MotionH1
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7, duration: 0.3 }}
                        className="text-7xl font-bold md:text-7xl sm:text-5xl sm:text-center"
                    >
                        Supratit Datta<span className="text-target"></span>
                    </MotionH1>
                    <MotionP
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1, duration: 0.3 }}
                        className="text-4xl sm:text-xl sm:text-center sm:w-full"
                    >
                        <span id="typed-text" className="font-bold text-target sm:text-center"></span>
                    </MotionP>
                    <MotionDiv
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1.3, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.2, duration: 0.3 }}
                        className="mt-4 flex sm:justify-center sm:w-full gap-4"
                    >
                        <a href="#about">
                            <button className="px-6 py-3 sm:px-2 sm:py-1 sm:w-fit text-lg font-semibold rounded-lg card-bg text-col-rev border-dynamic hover:bg-dynamic-rev hover:text-col active:scale-95 transition-all">
                                Know More
                            </button>
                        </a>
                        <a href="#contact">
                            <button className="px-6 py-3 sm:px-2 sm:py-1 sm:w-fit text-lg font-semibold rounded-lg bg-dynamic-rev text-col hover:bg-transparent hover:text-col-rev hover:border-dynamic active:scale-95 transition-all">
                                Contact Me
                            </button>
                        </a>
                    </MotionDiv>
                </div>
                <div className="w-[40%] sm:w-full flex flex-col items-center justify-center">
                    <MotionDiv
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                        className="flex flex-1 justify-end pl-8 sm:pl-0 sm:pt-10"
                    >
                        {/* <div className="w-80 pb-10">
                            <div className="flex flex-wrap justify-center gap-4 opacity-70">
                                <span className="h-3 w-48 rounded-full bg-target"></span>
                                <span className="h-3 w-32 rounded-full bg-dynamic-rev"></span>
                                <span className="h-3 w-20 rounded-full bg-target"></span>
                                <span className="h-3 w-28 rounded-full bg-target"></span>
                                <span className="h-3 w-14 rounded-full bg-dynamic-rev"></span>
                                <span className="h-3 w-20 rounded-full bg-target"></span>
                                <span className="h-3 w-32 rounded-full bg-target"></span>
                                <span className="h-3 w-32 rounded-full bg-dynamic-rev"></span>
                                <span className="h-3 w-32 rounded-full bg-dynamic-rev"></span>
                                <span className="h-3 w-20 rounded-full bg-target"></span>
                                <span className="h-3 w-28 rounded-full bg-target"></span>
                                <span className="h-3 w-14 rounded-full bg-dynamic-rev"></span>
                            </div>
                        </div> */}
                        <AnimatedLines />
                    </MotionDiv>
                </div>
            </MotionDiv>
            <MotionDiv
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.3 }}
                className="flex justify-center items-center gap-4"
            >
                <div className="mt-20 sm:mt-2 w-fit flex sm:flex-col items-center justify-center gap-8 text-white text-lg py-2 px-6 rounded-[50px]">
                    <MotionDiv
                        initial={{ y: 0 }}
                        animate={{ y: [0, 2, 5, 10, 5, 2, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.2,
                            times: [0, 0.2, 0.5, 1],
                            ease: "easeIn",
                            repeatDelay: 0.3
                        }}
                        className="cursor-pointer hover:text-blue-500 transition-colors"
                        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                    >
                        <span className="flex text-col-rev">Scroll Down
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2 font-bold">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                            </svg>
                        </span>
                    </MotionDiv>
                    <div className="flex items-center sm:flex-col gap-4">
                        <div className='flex gap-2'>
                            <a href="https://github.com/SupratitDatta" target='_blank' className="p-2 bg-dynamic-rev rounded-full text-col"><Github size={24} /></a>
                            <a href="https://www.linkedin.com/in/supratit-datta-1b902b258" target='_blank' className="p-2 bg-dynamic-rev rounded-full text-col"><Linkedin size={24} /></a>
                        </div>
                        <button
                            onClick={handleDownload}
                            className="px-4 py-1 bg-target text-col rounded-lg flex items-center gap-2 hover:bg-blue-700 hover:scale-[1.01] active:scale-95 duration-200"
                        >
                            Download Resume
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 font-bold">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                        </button>
                    </div>
                    <span className="ml-auto text-lg font-mono text-col-rev sm:text-center"> Date: {time.toLocaleString()}</span>
                </div></MotionDiv>
        </section >
    );
};
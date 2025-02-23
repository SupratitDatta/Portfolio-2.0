import { useState, useEffect } from 'react';

const Progressbar = () => {
    const [progress, setProgress] = useState(0);

    const onScroll = () => {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        setProgress((window.pageYOffset / totalHeight) * 100);
    };

    useEffect(() => {
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="absolute left-1/2 -translate-x-1/2 top-[100%] h-full w-1 rounded-full bg-gray-500">
            <div className='h-full w-1 rounded-full bg-gradient-to-b from-blue-600 to-teal-300 transition-all duration-75 z-10' style={{ height: `${progress}%` }} />
        </div>
    );
};

export default Progressbar;
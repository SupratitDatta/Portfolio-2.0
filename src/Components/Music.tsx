import { useState, useRef, useEffect } from "react";
import { Disc3 } from "lucide-react";

const Music: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (audioRef.current) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.error("Auto-play was prevented. User interaction required.", error);
                        setIsPlaying(false);
                    });
                }
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    const toggleMusic = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="flex items-center mr-1">
            <button
                onClick={toggleMusic}
                className="p-3 rounded-full text-target transition"
            >
                {isPlaying ? (
                    <Disc3 className="animate-spin w-8 h-8 sm:w-6 sm:h-6" />
                ) : (
                    <Disc3 className="w-8 h-8 sm:w-6 sm:h-6" />
                )}
            </button>
            <audio ref={audioRef} src="/tune.mp3" autoPlay loop />
        </div>
    );
};

export default Music;
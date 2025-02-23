import { useState, useEffect } from "react";
import { Sun, MoonStar } from "lucide-react";

export const ThemeSwitcher: React.FC = () => {
    const [theme, setTheme] = useState<"light" | "dark" | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        const initialTheme = storedTheme || "dark";

        setTheme(initialTheme);
        document.documentElement.setAttribute("data-theme", initialTheme);
        localStorage.setItem("theme", initialTheme);
    }, []);

    const toggleTheme = () => {
        if (!theme) return;

        setIsAnimating(true);
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);

        setTimeout(() => {
            setIsAnimating(false);
        }, 500);
    };

    if (!theme) return null;

    return (
        <button
            onClick={toggleTheme}
            className={`relative flex items-center justify-center transition-transform duration-500 ${isAnimating ? "rotate-[360deg]" : ""
                }`}
        >
            {theme === "dark" ? (
                <Sun className="text-orange-700 w-8 h-8 sm:w-6 sm:h-6" />
            ) : (
                <MoonStar className="text-target w-8 h-8 sm:w-6 sm:h-6" />
            )}
        </button>
    );
};
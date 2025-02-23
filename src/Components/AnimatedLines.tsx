import { motion } from "framer-motion";

interface LineProps {
    width: string;
    bg: string;
}

const AnimatedLines: React.FC = () => {
    const lines: LineProps[] = [
        { width: "w-48", bg: "bg-target" },
        { width: "w-32", bg: "bg-dynamic-rev" },
        { width: "w-20", bg: "bg-target" },
        { width: "w-28", bg: "bg-target" },
        { width: "w-14", bg: "bg-dynamic-rev" },
        { width: "w-20", bg: "bg-target" },
        { width: "w-32", bg: "bg-target" },
        { width: "w-32", bg: "bg-dynamic-rev" },
        { width: "w-32", bg: "bg-dynamic-rev" },
        { width: "w-20", bg: "bg-target" },
        { width: "w-28", bg: "bg-target" },
        { width: "w-14", bg: "bg-dynamic-rev" },
    ];

    return (
        <div className="w-80 pb-10">
            <div className="flex flex-wrap justify-center gap-4 opacity-70">
                {lines.map((line, index) => (
                    <div key={index} className={`h-3 ${line.width} rounded-full bg-gray-300 relative overflow-hidden`}>
                        <motion.div
                            className={`absolute inset-0 ${line.bg}`}
                            initial={{ width: "0%" }}
                            whileInView={{
                                width: "100%",
                                transition: { duration: 1, delay: 2, ease: "easeInOut" },
                            }}
                            viewport={{ once: true, amount: 1 }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnimatedLines;
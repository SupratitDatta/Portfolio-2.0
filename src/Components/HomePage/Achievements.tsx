import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, SquareArrowOutUpRight } from "lucide-react";
import { MotionDiv } from "../../utils/motion";
import { SectionContainer } from "../SectionContainer";
import { achievements } from "../../assets/data";

interface Achievement {
    year: string;
    title: string;
    description: string;
    url: string;
}

const itemVariants = (delay: number) => ({
    hidden: { opacity: 0, x: -100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: "easeOut", delay },
    },
});

const AchievementItem: React.FC<{ achievement: Achievement; index: number }> = ({
    achievement,
    index,
}) => {
    return (
        <MotionDiv
            variants={itemVariants(index * 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="group relative flex items-start w-full max-w-full"
        >
            <MotionDiv
                className="relative z-10 flex items-center justify-center w-12 h-12"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <CheckCircle className="w-8 h-8 text-blue-500 group-hover:text-col bg-dynamic-rev px-1 rounded-full transition-colors duration-300" />
            </MotionDiv>

            <div className="ml-12 sm:ml-3 -mt-1 w-full">
                <MotionDiv className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-blue-500 py-1 rounded-full">
                        {achievement.year}
                    </span>
                    {achievement.url && <a href={achievement.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors duration-300">
                        <SquareArrowOutUpRight className="w-5 h-5" />
                    </a>}
                </MotionDiv>
                <motion.h3 className="text-2xl font-bold text-col-rev group-hover:text-blue-500 transition-colors duration-300">
                    {achievement.title}
                </motion.h3>
                <motion.p className="text-gray-600 text-lg leading-[16px] sm:leading-[18px] tracking-wide">
                    {achievement.description}
                </motion.p>
            </div>
        </MotionDiv>
    );
};

export const Achievements: React.FC = () => {
    return (
        <SectionContainer id="achievements" title="ACHIEVEMENTS & EXPERIENCE">
            <div className="relative flex flex-col space-y-10 py-12 px-4 sm:px-0">
                <div className="absolute mx-5 sm:mx-4 top-0 w-1 h-full bg-dynamic-rev" />

                {achievements.map((achievement, index) => (
                    <AchievementItem key={index} achievement={achievement} index={index} />
                ))}
            </div>
        </SectionContainer>
    );
};

export default Achievements;
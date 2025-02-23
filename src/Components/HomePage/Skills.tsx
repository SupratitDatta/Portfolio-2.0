import { useState, useRef, useEffect } from 'react';
import { MotionDiv } from '../../utils/motion.ts';
import { SectionContainer } from '../SectionContainer';
import { skillsData } from '../../assets/data.ts';

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

interface Skill {
    img: string;
    name: string;
}

interface SkillSectionProps {
    title: string;
    data: Skill[];
    description: string;
}

const SkillSection = ({ title, data, description }: SkillSectionProps) => (
    <MotionDiv
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-8"
    >
        <MotionDiv variants={item} className="flex flex-col">
            <h2 className="text-3xl font-semibold mb-6 text-center text-col-rev">{title}</h2>
            <div className="flex flex-wrap justify-center">
                {data.map((skill, index) => (
                    <MotionDiv
                        key={index}
                        variants={item}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-3 rounded-lg px-1 py-1 font-bold"
                    >
                        <img
                            src={skill.img}
                            alt={skill.name}
                            width={0}
                            height={30}
                            className="h-[30px] sm:h-[20px] w-auto"
                        />
                    </MotionDiv>
                ))}
            </div>
            <p className="mt-6 leading-relaxed font-bold sm:font-medium text-justify text-col-rev/80">{description}</p>
        </MotionDiv>
    </MotionDiv>
);

export const Skills = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mounted]);

    useEffect(() => {
        if (!mounted) return;

        cardRefs.current.forEach(card => {
            if (!card) return;

            const rect = card.getBoundingClientRect();

            const relativeX = mousePosition.x - rect.left;
            const relativeY = mousePosition.y - rect.top;

            const padding = 100;
            const isNearCard =
                relativeX >= -padding &&
                relativeX <= rect.width + padding &&
                relativeY >= -padding &&
                relativeY <= rect.height + padding;

            const blurCircle = card.querySelector('.blur-circle') as HTMLElement | null;
            if (!blurCircle) return;

            if (isNearCard) {
                blurCircle.style.transform = `translate(${relativeX - 50}px, ${relativeY - 50}px)`;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const distance = Math.sqrt(
                    Math.pow(relativeX - centerX, 2) +
                    Math.pow(relativeY - centerY, 2)
                );
                const maxDistance = Math.sqrt(Math.pow(rect.width / 2 + padding, 2) + Math.pow(rect.height / 2 + padding, 2));
                const opacity = Math.max(0, 1 - distance / maxDistance);

                blurCircle.style.opacity = opacity.toString();
            }
            else {
                blurCircle.style.opacity = '0';
            }
        });
    }, [mousePosition, mounted]);

    const renderSkillCard = (section: typeof skillsData[0], index: number, refIndex: number) => (
        <div
            key={index}
            ref={el => { cardRefs.current[refIndex] = el; }}
            className="rounded-xl p-6 backdrop-blur-xl bg-transparent bg-blur-3xl sm:bg-blur-sm border border-dynamic/30 shadow-dynamic
                     hover:shadow-[0_10px_30px_rgba(31,34,50,0.3),0_0_20px_rgba(100,130,255,0.2)] 
                     transition-all duration-300 ease-out overflow-hidden relative group w-1/2 sm:w-full"
            style={{ backdropFilter: 'blur(20px)', boxShadow: '0 4px 16px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.05)' }} >
            <div className="blur-circle absolute w-40 h-40 rounded-full bg-target/90 filter blur-2xl transition-transform duration-75 opacity-0 pointer-events-none" />
            <div className="absolute inset-0 card-bg opacity-100 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative z-10">
                <SkillSection
                    title={section.title}
                    data={section.data}
                    description={section.description}
                />
            </div>
        </div>
    );

    return (
        <SectionContainer id="skills" title="SKILLS">
            <div className="flex flex-row sm:flex-col items-center justify-center gap-4 sm:mb-3">
                {skillsData.slice(0, 2).map((section, index) =>
                    renderSkillCard(section, index, index)
                )}
            </div>
            <div className="flex flex-row sm:flex-col items-center justify-center gap-4 sm:mb-3 mt-2">
                {skillsData.slice(2, 4).map((section, index) =>
                    renderSkillCard(section, index, index + 2)
                )}
            </div>
        </SectionContainer>
    );
};
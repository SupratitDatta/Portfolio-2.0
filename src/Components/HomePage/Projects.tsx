import { useEffect, useRef, useState } from 'react'
import { useAnimation, useInView } from 'framer-motion'
import { Code2, ExternalLink } from 'lucide-react'
import { MotionDiv, MotionNav } from '../../utils/motion.ts'
import { SectionContainer } from '../../Components/SectionContainer'
import { projectsData, projectType } from "../../assets/data.ts";

const categories = ['All', 'Frontend', 'Backend', 'Full Stack', 'MERN', 'Android Dev'];

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    added: { y: 0, opacity: 1 }
};

type Props = {
    projectData: projectType
}

const projectitem = {
    initial: {
        opacity: 0,
        y: 24
    },
    animate: {
        opacity: 1,
        y: 0
    }
}


const ProjectCard = ({ projectData }: Props) => {
    return (
        <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex flex-col gap-3 sm:max-w-xs">

            <div className="relative flex-col gap-4 text-center cursor-pointer">
                <img
                    src={projectData.image}
                    alt={`${projectData.name} image`}
                    width={320}
                    height={220}
                    className='rounded-t-xl'
                />
                <MotionDiv
                    initial="initial"
                    animate="initial"
                    whileHover="animate"
                    className="absolute flex items-center justify-center left-0 top-0 z-10 h-full w-full bg-black rounded-t-[15px] bg-opacity-80 p-3 opacity-0 transition hover:opacity-100 md:hidden"
                >
                    <MotionNav
                        variants={projectitem}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-center gap-x-4"
                    >
                        <a
                            target="_blank"
                            href={projectData.repo}
                            className="rounded-lg bg-textLight p-2 text-black transition hover:text-target"
                            rel="noreferrer"
                        >
                            <Code2 />
                        </a>
                        {projectData.url && (
                            <a
                                target="_blank"
                                href={projectData.url}
                                className="rounded-lg bg-textLight p-2 text-black transition hover:text-target"
                                rel="noreferrer"
                            >
                                <ExternalLink />
                            </a>
                        )}
                    </MotionNav>
                </MotionDiv>
                <div className="absolute left-0 top-0 z-10 flex justify-center items-center h-full w-full bg-black rounded-t-[15px] bg-opacity-80 p-3 opacity-0 transition hover:opacity-100">
                    <nav className="flex justify-center items-center gap-x-4">
                        {projectData.repo && (
                            <a
                                target="_blank"
                                href={projectData.repo}
                                className="rounded-lg bg-textLight p-2 text-black transition hover:text-target"
                                rel="noreferrer"
                            >
                                <Code2 />
                            </a>
                        )}
                        {projectData.url && (
                            <a
                                target="_blank"
                                href={projectData.url}
                                className="rounded-lg bg-textLight p-2 text-black transition hover:text-target"
                                rel="noreferrer"
                            >
                                <ExternalLink />
                            </a>
                        )}
                    </nav>
                </div>
            </div>
            <div className="flex flex-col gap-3 p-4">
                <h3 className="text-xl font-bold text-center">{projectData.name}</h3>
                <p className="text-sm text-justify">{projectData.description}</p>
                <div className="flex flex-wrap gap-2 justify-center items-center">
                    {projectData.tags.map((tag, index) => (
                        <span className={`rounded-3xl px-2 py-1 text-xs font-bold ${tag.name === "Express.js" ? "text-black" : "text-white"} ${tag.color}`} key={index} >
                            {tag.name}
                        </span>
                    ))}
                </div>
            </div>
        </MotionDiv>
    );
};

export const Projects = () => {
    const [showMore, setShowMore] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isMobile, setIsMobile] = useState(false);

    const ref = useRef(null);
    const isInView = useInView(ref);
    const controls = useAnimation();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView]);

    useEffect(() => {
        controls.start('hidden').then(() => {
            controls.start('visible');
        });
        setShowMore(false);
    }, [selectedCategory, controls]);

    const filteredProjects = selectedCategory === 'All'
        ? projectsData
        : projectsData.filter((project: projectType) => project.type === selectedCategory);
    const projectsPerPage = isMobile ? 4 : 6;
    const initialProjects = filteredProjects.slice(0, projectsPerPage);
    const additionalProjects = filteredProjects.slice(projectsPerPage);

    return (
        <SectionContainer id="projects" title="PROJECTS">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`
                        px-6 py-2 sm:px-4 sm:py-1 text-md rounded-md font-bold tracking-wide transition-all duration-300 border-2
                        ${selectedCategory === category
                                ? 'bg-dynamic text-col-rev border-dynamic'
                                : 'bg-dynamic-rev text-col border-dynamic-rev'
                            }
                        hover:scale-95 active:scale-90 shadow-sm hover:shadow-md 
                    `}
                        onClick={() => setSelectedCategory(category)} >
                        {category}
                    </button>
                ))}
            </div>

            <div ref={ref}>
                {filteredProjects.length > 0 ? (
                    <MotionDiv
                        key={selectedCategory}
                        variants={container}
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="grid grid-cols-3 gap-10 lg:grid-cols-2 md:grid-cols-1 sm:justify-items-center"
                    >
                        {initialProjects.map((project: projectType, index: number) => (
                            <MotionDiv
                                variants={item}
                                transition={{ duration: 0.3 }}
                                key={`${selectedCategory}-${index}`}
                                className="relative flex flex-col gap-3 border-2 rounded-[15px] transition-shadow-transform hover:scale-[1.02] hover:shadow-dynamic duration-1000 border-dynamic"
                            >
                                <ProjectCard projectData={project} />
                            </MotionDiv>
                        ))}
                        {showMore && additionalProjects.map((project: projectType, index: number) => (
                            <MotionDiv
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3, delay: 0.1 * index }}
                                key={`${selectedCategory}-additional-${index}`}
                                className="relative flex flex-col gap-3 border-2 rounded-[15px] transition-shadow-transform hover:scale-[1.02] hover:shadow-dynamic duration-700 border-dynamic"
                            >
                                <ProjectCard projectData={project} />
                            </MotionDiv>
                        ))}
                    </MotionDiv>
                ) : (
                    <MotionDiv
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center items-center py-20"
                    >
                        <p className="text-lg text-gray-500 font-medium">No projects available for this category</p>
                    </MotionDiv>
                )}

                {filteredProjects.length > projectsPerPage && (
                    <MotionDiv
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="border-t-1 mt-14 flex justify-center"
                    >
                        <div
                            className="flex items-center gap-x-2 rounded-lg text-lg transition hover:bg-opacity-80 hover:text-target hover:scale-110 active:scale-95"
                            onClick={() => setShowMore(!showMore)}
                        >
                            <button onClick={() => setShowMore(prev => !prev)} className="flex items-center gap-2">
                                Show {showMore ? 'Less' : 'More'}
                                {showMore ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 font-bold">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 font-bold">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </MotionDiv>
                )}
            </div>
        </SectionContainer>
    );
};
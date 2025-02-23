import { MotionDiv } from '../../utils/motion'
import { MoveRight } from 'lucide-react'
import { SectionContainer } from '../SectionContainer'
import supra from "/Supra.jpg"

export const About = () => {
    return (
        <SectionContainer id="about" title="ABOUT ME">
            <div className="flex flex-row-reverse items-start justify-between gap-12 sm:flex-col-reverse md:gap-8">
                <MotionDiv
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className="flex-1 flex flex-col gap-5 text-lg text-justify md:text-center md:max-w-full sm:text-base"
                >
                    <p className="sm:text-justify">I am currently a third-year undergraduate student at IIIT Nagpur, with a strong passion for competitive programming and problem-solving. I have gained solid experience in data structures and algorithms.</p>
                    <p className="sm:text-justify">I specialize in creating robust, scalable, and user-friendly software solutions that are tailored to meet the unique needs of each project. From frontend interfaces to backend architecture, I ensure every part of the application runs smoothly, securely, and efficiently. As a DevOps practitioner, I streamline the software development lifecycle, automating processes for faster, more reliable deployments.</p>

                    <div className="flex justify-center mt-2">
                        <a href="#projects"
                            className="flex items-center gap-x-2 text-dynamic transition-all hover:gap-x-3 hover:text-light-dynamic dark:hover:text-dark-dynamic font-bold border-dynamic border-2 px-4 py-1 rounded-lg bg-transparent hover:bg-dynamic">
                            View Projects <MoveRight />
                        </a>
                    </div>

                </MotionDiv>

                <MotionDiv
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className="w-1/4 md:w-1/3 sm:w-2/3 flex justify-center items-center mx-auto"
                >
                    <div className="relative w-full max-w-sm aspect-square rounded-full overflow-hidden border-2 border-dynamic shadow-dynamic ">
                        <img
                            src={supra}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </MotionDiv>
            </div>
        </SectionContainer>
    )
}
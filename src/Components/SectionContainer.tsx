import { ReactNode } from "react";
import { MotionH2 } from "../utils/motion";

type Props = {
    id: string;
    title: string;
    children: ReactNode;
};

export const SectionContainer = ({ id, title, children }: Props) => {
    const titleWords = title.split(" ");

    return (
        <section id={id} className="pb-8 mt-[8vh] sm:mt-[6vh] min-h-screen">
            <div className="max-w-5xl border-b-2 border-dynamic mx-auto mb-14"></div>
            <div className="mx-auto max-w-5xl">
                <MotionH2
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="pb-12 text-center text-4xl font-bold sm:text-3xl"
                >
                    <span className="mr-2 text-target">{'//'}</span>
                    {titleWords.length > 1 ? (
                        <>
                            {titleWords[0]}{" "}
                            <span className="text-target">{titleWords.slice(1).join(" ")}</span>
                        </>
                    ) : (
                        title
                    )}
                </MotionH2>
                {children}
            </div>
        </section>
    );
};
import Image from "next/image";

function DotGrid() {
    return (
        <div className="absolute -bottom-1 right-3 grid grid-cols-11 grid-rows-3 gap-[1.3rem]">
            {Array.from({ length: 33 }, (_, i) => (
                <span key={i} className="bg-primary h-1 w-1" />
            ))}
        </div>
    );
}

export default function About() {
    return (
        <div id="about" className="h-auto md:h-svh w-svw p-8 pt-20 flex flex-col gap-10">

            <h1 className="
                bg-[linear-gradient(0deg,#000_11%,#fff_57%)]
                bg-clip-text [-webkit-background-clip:text]
                text-transparent [-webkit-text-fill-color:transparent]
                text-4xl text-center tracking-normal leading-normal whitespace-nowrap">
                About me.
            </h1>

            <div className="flex flex-col md:flex-row justify-center items-center gap-10">
                <section className="relative w-[280px] h-[345px] lg:w-[380px] lg:h-[473px] md:h-auto">
                    <Image
                        src='/assets/About me.png'
                        width={375}
                        height={473}
                        alt="Photo of Sanyam Rathore"
                        className="relative z-1"
                        loading="lazy"
                    />
                    <DotGrid />
                </section>

                <section className="flex flex-col sm:[300px] lg:w-[810px] md:w-[500px] max-w-full gap-6">

                    <h2 className="font-normal text-secondary text-base tracking-[0.03px]">
                        <span className="pb-2">Hi, I&apos;m{" "}</span>
                        <span className="font-mont-sign text-[64px]/[48px] tracking-[0.08px] pl-1">
                            Sanyam Rathore.
                        </span>
                    </h2>

                    <div className="font-normal text-sm tracking-[0.03px] leading-6 text-tertiary">
                        <p className="mb-5">
                            For me,{" "}
                            <span className="text-secondary">engineering is not playing with tools</span>
                            {" "}— its like giving thoughts an{" "}
                            <span className="text-secondary">ART</span>{" "}
                            <span className="text-secondary">form</span>
                            . I care about how things look because, I care about how things{" "}
                            <em className="text-secondary italic">feel{" "}</em>
                            {" "}to use.
                        </p>

                        <p className="mb-5">
                            <span className="text-secondary">+4 years </span> in, I&apos;ve shipped systems that move data between enterprise
                            platforms at scale, handle real-time events reliably, and give teams back
                            hours they used to lose, to manual work. My stack lives mostly in React,
                            TypeScript, Node.js, and cloud infrastructure — but the{" "}
                            <span className="text-secondary">
                                tools matter less to me than the problem being solved
                            </span>
                            .
                        </p>

                        <p className="mb-5">
                            I&apos;m drawn to systems that hold up and interfaces that feel{" "}
                            <span className="text-secondary">inevitable</span>
                            {" "}— the kind of work where nothing is wasted and nothing is half-done.
                        </p>

                        <blockquote className=" border-l-2 border-l-toggle italic text-secondary content-center">
                            <p className="pl-4">
                                Faith keeps me grounded. Curiosity keeps me moving. The two don&apos;t
                                fight — they push each other.
                            </p>
                        </blockquote>

                    </div>

                    {/* <div className="flex flex-col gap-4 justify-center text-center items-center"> */}
                    <svg width="100%" height="6" viewBox="0 0 434 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M-3.26633e-05 2.88678L2.88672 5.77353L5.77347 2.88678L2.88672 2.83718e-05L-3.26633e-05 2.88678ZM433.773 2.88678L430.887 2.83718e-05L428 2.88678L430.887 5.77353L433.773 2.88678ZM2.88672 2.88678V3.38678H430.887V2.88678V2.38678H2.88672V2.88678Z" fill="white" />
                    </svg>

                    <div className="grid grid-flow-row md:grid-flow-col gap-2 item-center mt-[0.55rem]">
                        <div className="italic text-#e1e1e1-500 w-max">Personality at a glance: </div>

                        <div className="flex flex-row gap-1.5 flex-wrap justify-start">
                            {["☘️ Charming", "⚡️ Completion-oriented", "✨ Aesthetics-aware", "🚀 Quick learner", "🧑🏻‍🎨 Sketch artist", "Backend depth", "Frontend calm",].map((spec, index) => (
                                <div
                                    aria-label="Decorative glass"
                                    className="w-max py-1 px-3 italic text-sm-200 h-[28px] rounded-xl smooth-corners text-secondary backdrop-blur-[1.5px] backdrop-brightness-100 backdrop-saturate-100 [-webkit-backdrop-filter:blur(1.5px)_brightness(100.0%)_saturate(100.0%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(102,102,102,0.2)_100%),linear-gradient(0deg,rgba(44,44,44,0.2)_0%,rgba(44,44,44,0.2)_100%)]"
                                    key={index + spec}
                                >
                                    {spec}
                                </div>
                            ))}
                            {/* </div> */}
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
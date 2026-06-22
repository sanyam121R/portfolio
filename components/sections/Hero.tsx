import Image from "next/image";

export default function Hero() {
  return (
    <div className="h-svh w-svw flex justify-center text-center">
      <section className="flex w-svw flex-col gap-6 md:gap-8 justify-end p-6 mb-70 md:mb-48">
        <div className="flex flex-col justify-center text-center">
          <h1 className="font-weird-word text-4xl md:text-7xl">Full-Stack</h1>
          <h2 className="font-thin italic text-2xl/2 md:text-4xl/2">Software Developer</h2>
        </div>

        <div className="text-secondary text-[10px] md:text-[14px]">
          <p>Systems that scale, Interfaces that don't ask users to think.</p>
          <p>Building event-driven architecture and the interfaces that sit on top of them.</p>
          <p className="font-extrabold italic mt-3 md:mt-4">— you call it, I design it.</p>
        </div>
      </section>
    </div>
  );
}

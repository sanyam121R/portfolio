import Image from "next/image";

export default function Experience() {
  return (
    <div id="experience" className="h-svh w-svw flex justify-center text-center">
      <Image
        src={'/assets/experience.png'}
        alt="experience"
        width={1881}
        height={1004}
        className="overflow-x-auto"
        />
    </div>
  );
}

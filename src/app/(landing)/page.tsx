import { Button } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { landingImages, landingImgSize } from "@/constants/images";
import Image from "next/image";

export default async function Landing() {

  return (
    <main className="flex flex-col flex-1 items-center justify-center gap-[120px] font-display">
      <div className="flex flex-col items-center px-[20px] gap-[40px]">
        <h1 className="text-[24px] md:text-[32px] tracking-wider text-center">
          Write Ideas That Last.
        </h1>
        <h2 className="text-base md:text-[20px] text-center leading-5">
          Velune is a modern publishing platform for creators who want clean writing, thoughtful design, and a space that feels entirely their own.
        </h2>
      </div>
      <Link href="/register" className="z-2">
        <Button
          className="px-[24px] md:px-[32px] py-[12px] md:py-[16px] bg-secondary rounded-full font-display text-base md:text-[20px] font-normal normal-case hover:-translate-y-1 hover:scale-110"
        >
          Start Writing
        </Button>
      </Link>
      <div className="fixed">
        {landingImages.map((img, index) => (
          <Image
            key={img.src}
            src={img.src} alt={img.alt}
            width={landingImgSize.mobile.width}
            height={landingImgSize.mobile.height}
            className={`
              md:w-[400px] h-auto rounded-[50px] md:rounded-[75px] fixed top-[55%] left-1/2
              ${index === 0 ? "-translate-x-[120%] -rotate-25 translate-y-[2.5%] md:translate-y-[5%]" : index === 1 ? "-translate-x-1/2 z-1" : "translate-x-[20%] rotate-25 translate-y-[2.5%] md:translate-y-[5%]"}
            `}
            sizes={`(min-width: 768px) 400px, 800px`}
            loading="eager"
          />
        ))}
      </div>
    </main>
  );
}

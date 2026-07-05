"use client"

import { Button } from "@/components/ui/button";
import { landingImages, landingImgSize } from "@/constants/images";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();
  return (
    <main className="flex flex-col flex-1 items-center justify-center gap-[80px] font-display">
      <div className="flex flex-col items-center px-[20px] gap-[20px]">
        <h1 className="text-[24px] tracking-wider text-center">
          Write Ideas That Last.
        </h1>
        <h2 className="text-base text-center leading-5">
          Velune is a modern publishing platform for creators who want clean writing, thoughtful design, and a space that feels entirely their own.
        </h2>
      </div>
      <Button
        onClick={() => router.push("/register")}
        className="px-[24px] py-[12px] bg-secondary rounded-full font-display text-base font-normal normal-case z-2"
      >
        Start Writing
      </Button>
      <div className="fixed">
        {landingImages.map((img, index) => (
          <Image
            key={img.src}
            src={img.src} alt={img.alt}
            width={landingImgSize.mobile.width}
            height={landingImgSize.mobile.height}
            className={`
              md:w-[${landingImgSize.desktop.width}px] h-auto rounded-[50px] fixed top-[55%] left-1/2
              ${index === 0 ? "-translate-x-[120%] -rotate-25 translate-y-[2.5%]" : index === 1 ? "-translate-x-1/2 z-1" : "translate-x-[20%] rotate-25 translate-y-[2.5%]"}
            `}
            sizes={`(min-width: 768px) ${landingImgSize.desktop.height}px, ${landingImgSize.desktop.width}px`}
          />
        ))}
      </div>
    </main>
  );
}

import { WideLogo } from "@/components/ui/icons";
import { footerNavigation } from "@/constants/navigation";
import Link from "@/components/ui/link";

export default function Footer() {
  return (
    <footer className="bg-dark">
      <div className="py-[64px] md:py-[96px] flex justify-center items-center">
        <Link href="/">
          <WideLogo className="w-auto h-[72px] md:h-[108px] text-complementary" />
        </Link>
      </div>
      <div className="bg-complementary rounded-t-[32px] md:rounded-t-[64px] pt-[48px] md:pt-[96px] pb-[32px] md:pb-[64px] px-[20px] md:px-[80px] flex flex-col gap-[32px] md:gap-[64px]">
        <div className="grid grid-cols-2 gap-y-[32px] md:flex md:justify-between">
          {footerNavigation.map(section => (
            <div key={section.sectionTitle} className="flex flex-col gap-[8px] md:gap-[12px] font-sans">
              <h2 className="text-base md:text-lg font-bold tracking-wider leading-5">{section.sectionTitle}</h2>
              <ul className="flex flex-col md:gap-[4px]">
                {section.sectionLinks.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="md:text-lg tracking-wider leading-5 active:underline hover:underline underline-offset-2">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-base md:text-lg tracking-wider self-center">© Velune 2026</p>
      </div>
    </footer>
  )
}

import { WideLogo } from "@/components/ui/icons";
import { footerNavigation } from "@/constants/navigation";
import Link from "@/components/ui/link";

export default function Footer() {
  return (
    <footer className="bg-dark">
      <div className="py-[64px] flex justify-center items-center">
        <Link href="/">
          <WideLogo className="w-auto h-[72px] text-complementary" />
        </Link>
      </div>
      <div className="bg-complementary rounded-t-[32px] pt-[48px] pb-[32px] px-[20px] flex flex-col gap-[32px]">
        <div className="grid grid-cols-2 gap-y-[32px]">
          {footerNavigation.map(section => (
            <div key={section.sectionTitle} className="flex flex-col gap-[8px] font-sans">
              <h2 className="text-base font-bold tracking-wider leading-5">{section.sectionTitle}</h2>
              <ul className="flex flex-col">
                {section.sectionLinks.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-base tracking-wider leading-5 active:underline">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-base tracking-wider self-center">© Velune 2026</p>
      </div>
    </footer>
  )
}

import { ctaNavigation } from "@/constants/navigation";
import Link from "../ui/link";

export default function NavbarCTAButtons() {
  return (
    <div className="hidden md:flex items-center">
      {ctaNavigation.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`
            font-display px-[16px] py-[8px]
            ${link.href === "/register" ? "border-1 border-foreground" : ""}
          `}
        >
          <p className="text-[14px]">{link.title}</p>
        </Link>
      ))}
    </div>
  )
}

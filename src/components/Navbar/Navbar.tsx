import { VeluneLogo } from "@/components/ui/icons";
import { navigation } from "@/constants/navigation";
import NavbarLink from "./NavbarLink";
import NavbarIcon from "./NavbarIcon";
import Divider from "../ui/divider";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="px-[20px] py-[8px] border-b border-solid border-foreground/50 flex justify-between items-stretch">
        <div className="flex items-center justify-center">
          <VeluneLogo className="text-foreground w-[48px] h-[48px]" />
        </div>
        <div className="flex gap-[12px]">
          <div className="flex">
            {navigation.map((item) => {
              return (
                <NavbarLink href={item.href} key={item.href}>
                  <NavbarIcon Icon={item.icon} />
                </NavbarLink>
              )
            })}
          </div>
          <Divider width={2} />
        </div>
      </nav>
    </header>
  )
}

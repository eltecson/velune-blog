import { VeluneLogo } from "@/components/ui/icons";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="px-[56px_80px] py-[8px] border-b border-solid border-txt-home/50">
        <VeluneLogo className="text-accent-home w-[48px] h-[48px]" />
        <div className="">
          
        </div>
      </nav>
    </header>
  )
}
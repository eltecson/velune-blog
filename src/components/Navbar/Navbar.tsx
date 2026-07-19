"use client"

import { VeluneLogo } from "@/components/ui/icons";
import { navigation } from "@/constants/navigation";
import NavbarLink from "./NavbarLink";
import NavbarIcon from "./NavbarIcon";
import Divider from "@/components/ui/divider";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RiCloseLine, RiSearchLine } from "@remixicon/react";
import { AnimatePresence, motion } from "motion/react";
import NavbarCTAButtons from "./NavbarCTAButtons";
import { cn } from "@/lib/utils";
import Link from "../ui/link";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const footerRef = useRef<HTMLElement | null>(null)

  const [stopped, setStopped] = useState(false)
  const [top, setTop] = useState(0)

  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setAuthLoading(false);
    };

    getUser();
  }, [supabase]);

  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(query)
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    footerRef.current = document.querySelector("footer")
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (!headerRef.current || !footerRef.current) return

      const headerHeight = headerRef.current.offsetHeight
      const footerTop = footerRef.current.offsetTop
      const scrollY = window.scrollY

      const stopPoint = footerTop - headerHeight

      if (scrollY >= stopPoint) {
        setStopped(true)
        setTop(stopPoint)
      } else {
        setStopped(false)
      }
    }

    window.addEventListener("scroll", onScroll)
    onScroll()

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      ref={headerRef}
      className={cn(
        "left-0 w-full z-50",
        stopped ? "absolute" : "fixed"
      )}
      style={
        stopped
          ? { top }
          : { top: 0 }
      }
    >
      <nav className={cn(
        "px-[20px] lg:pl-[56px] lg:pr-[80px] py-[8px] border-b border-solid border-foreground/50 flex justify-between items-stretch md:gap-[10px] lg:gap-[20px]",
        scrolled && "bg-background/80 backdrop-blur-md"
      )}>
        <div className="flex flex-1 items-center gap-[8px]">
          <Link href="/">
            <VeluneLogo className="text-foreground w-[48px] h-[48px] shrink-0" />
          </Link>
          <AnimatePresence mode="wait" initial={false}>
            {searchOpen ? (
              <motion.form
                key="search"
                onSubmit={handleSearch}
                initial={{ opacity: 0, x: 24, width: 0 }}
                animate={{ opacity: 1, x: 0, width: "100%" }}
                exit={{ opacity: 0, x: 24, width: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-complementary border border-dark text-dark flex items-center pl-2 w-full overflow-hidden"
              >
                <Input
                  autoFocus
                  placeholder="Search articles, people, and topics"
                  id="search"
                  name="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="text-dark"
                />

                <Button
                  type="button"
                  size="icon-sm"
                  onClick={() => setSearchOpen(false)}
                >
                  <RiCloseLine className="size-8 text-dark" />
                </Button>
              </motion.form>
            ) : (
              <motion.div
                key="search-button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  className="h-auto w-auto p-0"
                  onClick={() => setSearchOpen(true)}
                >
                  <div className="flex items-center justify-center md:gap-[10px] md:pl-[16px] md:pr-[128px] md:py-[8px] md:border-1 border-foreground md:rounded-full">
                    <RiSearchLine className="size-8 md:size-4" />
                    <p className="hidden md:block font-display normal-case font-normal text-[12px]">Search</p>
                  </div>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className={`
          flex gap-[8px] md:gap-[20px]
          ${searchOpen ? "hidden md:flex": ""}
        `}>
          <div className="flex">
            {navigation.map((item) => {
              return (
                <NavbarLink href={item.href} title={item.title} key={item.href}>
                  <NavbarIcon Icon={item.icon} />
                </NavbarLink>
              )
            })}
          </div>
          {!authLoading && !user && (
            <>
              <Divider width={2} />
              <Sidebar />
              <NavbarCTAButtons />
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

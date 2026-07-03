"use client"

import { VeluneLogo } from "@/components/ui/icons";
import { navigation } from "@/constants/navigation";
import NavbarLink from "./NavbarLink";
import NavbarIcon from "./NavbarIcon";
import Divider from "@/components/ui/divider";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RiCloseLine, RiSearchLine } from "@remixicon/react";
import { AnimatePresence, motion } from "motion/react";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(query)
  }
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="px-[20px] py-[8px] border-b border-solid border-foreground/50 flex justify-between items-stretch">
        <div className="relative flex items-center gap-[8px]">
          <VeluneLogo className="text-foreground w-[48px] h-[48px] shrink-0" />
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
                  size="icon-sm"
                  onClick={() => setSearchOpen(true)}
                >
                  <RiSearchLine className="size-8" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {searchOpen ? (
            <div />
          ) : (
            <div className="flex gap-[8px]">
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
              <Sidebar />
            </div>
          )
        }
      </nav>
    </header>
  )
}

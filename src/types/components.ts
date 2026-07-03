import { StandardProps } from "./helpers";
import { LinkProps as NextLinkProps } from "next/link"
import { ComponentType, ReactNode } from "react"

interface IconProps extends Omit<StandardProps, "children"> {}

interface DividerProps extends Omit<StandardProps, "children"> {
  width: number | string;
}

interface NavbarIconProps extends Omit<StandardProps, "children"> {
  Icon: ComponentType<Omit<StandardProps, "children">>;
}

interface LinkProps extends NextLinkProps {
  children: ReactNode
  className?: string
  [key: string]: any
}

interface SidebarLinkProps extends LinkProps {
  key: string;
}

export type {
  IconProps,
  DividerProps,
  NavbarIconProps,
  LinkProps,
  SidebarLinkProps,
}

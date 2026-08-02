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
  title: string;
}

interface AccountDropdownProps extends StandardProps {
  account: {
    avatarSrc: string,
  }
}

type SaveStatus =
  | "Unsaved"
  | "Autosaving"
  | "Autosaved"
  | "Saving"
  | "Saved"
  | "Error";

type PostStatus =
  | "draft"
  | "published"
  | "scheduled"

interface PostProps {
  title: string;
  content: Record<string, any>;
  excerpt: string;
  cover_image: string;
  status: PostStatus;
}

export type {
  IconProps,
  DividerProps,
  NavbarIconProps,
  LinkProps,
  SidebarLinkProps,
  AccountDropdownProps,
  SaveStatus,
  PostProps,
}

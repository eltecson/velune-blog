import { RiHome4Line, RiListUnordered, RiHashtag } from "@remixicon/react";

export const navigation = [
  {
    title: "Home",
    href: "/",
    icon: RiHome4Line,
  },
  {
    title: "Posts",
    href: "/posts",
    icon: RiListUnordered,
  },
  {
    title: "Topics",
    href: "/topics",
    icon: RiHashtag,
  },
]

export const ctaNavigation = [
  {
    title: "Sign in",
    href: "/login",
  },
  {
    title: "Get Started",
    href: "/register",
  },
]

export const footerNavigation = [
  {
    sectionTitle: "Explore",
    sectionLinks: [
      {
        title: "Home",
        href: "/",
      },
      {
        title: "Posts",
        href: "/posts",
      },
      {
        title: "Topics",
        href: "/topics",
      },
      {
        title: "Trending",
        href: "/posts#trending",
      },
      {
        title: "Latest",
        href: "/posts#latest",
      },
    ]
  },
  {
    sectionTitle: "Platform",
    sectionLinks: [
      {
        title: "About",
        href: "/about",
      },
      {
        title: "Changelog",
        href: "/changelog",
      },
      {
        title: "Roadmap",
        href: "/roadmap",
      },
      {
        title: "Status",
        href: "/status",
      },
    ]
  },
  {
    sectionTitle: "Legal",
    sectionLinks: [
      {
        title: "Terms",
        href: "/terms",
      },
      {
        title: "Privacy Policy",
        href: "/privacy-policy",
      },
      {
        title: "Content Guidelines",
        href: "/content-guidelines",
      },
    ]
  },
  {
    sectionTitle: "Resources",
    sectionLinks: [
      {
        title: "Contribute",
        href: "https://github.com/eltecson/velune-blog",
      },
      {
        title: "Documentation",
        href: "https://github.com/eltecson/velune-blog/blob/main/README.md",
      },
    ]
  },
]

export const protectedRoutes = ["/dashboard"];

export const guestOnlyRoutes = ["/", "/login", "/register"];

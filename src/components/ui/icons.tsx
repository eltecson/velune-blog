"use client"

import RawVeluneLogo from "@/assets/logo.svg"
import RawHomeIcon from "@/assets/home.svg"
import RawPostsIcon from "@/assets/posts.svg"
import RawTopicsIcon from "@/assets/topics.svg"
import { IconProps } from "@/types/components"

export function VeluneLogo({
  className,
  ...props
}: IconProps) {
  return (
    <RawVeluneLogo className={className} {...props}/>
  )
}

export function HomeIcon({
  className,
  ...props
}: IconProps) {
  return (
    <RawHomeIcon className={className} {...props}/>
  )
}

export function PostsIcon({
  className,
  ...props
}: IconProps) {
  return (
    <RawPostsIcon className={className} {...props}/>
  )
}

export function TopicsIcon({
  className,
  ...props
}: IconProps) {
  return (
    <RawTopicsIcon className={className} {...props}/>
  )
}

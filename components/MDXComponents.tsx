import React from 'react'
import Link from 'next/link'
import Image, { ImageProps } from 'next/image'

const CustomLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{props.children}</a>
      </Link>
    )
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props: ImageProps) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />
}

export const MDXComponents = {
  Image: RoundedImage,
  a: CustomLink
}

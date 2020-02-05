import React from 'react'
import './style.less'

enum TagTypes {
  red,
  blue,
  grey,
  green,
  orange,
}

interface Props {
  className?: string;
  type: keyof typeof TagTypes;
  children: React.ReactNode;
  title?: string;
}

export default function colorTag (props: Props) {
  const { children, type, title, className } = props
  return (
    <span className={`color-tag ${className} ${type}`} title={title}>
      {children}
    </span>
  )
}

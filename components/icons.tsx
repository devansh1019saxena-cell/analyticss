import * as React from "react"
import { Loader2, ChevronDown, File } from "lucide-react"

type IconProps = React.HTMLAttributes<SVGElement> & {
  className?: string
}

export const Icons = {
  spinner: (props: IconProps) => (
    <Loader2 {...props} className={`animate-spin ${props.className || ''}`} />
  ),
  chevronDown: (props: IconProps) => (
    <ChevronDown {...props} />
  ),
  file: (props: IconProps) => (
    <File {...props} />
  ),
}

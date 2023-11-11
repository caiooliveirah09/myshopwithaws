export default function Text ({children, align, color, className }: {children: string, align?: string, color?: string, className?: string}) {
  return (<p className={`text-${align} break-all text-${color || 'white'} ${className}`}>{ children }</p>)
}


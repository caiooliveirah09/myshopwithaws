export default function SmallLink({ text, href, align }: { text: string, href: string, align: string}) {
  return (
    <a className={`p-2 text-sm hover:underline text-${align} w-full block  hover:text-teal-800 text-shadow-link text-white hover:text-shadow-none transition-all`} href={href}>{text}</a>
  )
}
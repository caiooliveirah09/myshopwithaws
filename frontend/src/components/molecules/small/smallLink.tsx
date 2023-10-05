export default function SmallLink({ text, href, align }: { text: string, href: string, align: string}) {
  return (
    <a className={`p-2 text-sm text-black hover:underline text-${align} w-full block`} href={href}>{text}</a>
  )
}
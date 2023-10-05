export default function H1 ({ text, align }: { text: string, align: string}) {
  return (
    <h1 className={`text-3xl font-bold w-full text-${align} p-2`}>{text}</h1>
  )
}
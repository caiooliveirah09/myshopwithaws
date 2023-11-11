import { textCyberpunkStyleEffect } from "@/style/styleEffects";

export default function H3 ({ text, align, className }: { text: string, align: string, className?: string}) {
  return (
    <h1 className={`text-xl font-bold w-full text-${align} p-2 tracking text-white ${className}`}>{text}</h1>
  )
}

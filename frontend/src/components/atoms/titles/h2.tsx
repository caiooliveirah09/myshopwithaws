import { textCyberpunkStyleEffect } from "@/style/styleEffects";

export default function H2 ({ text, align }: { text: string, align: string}) {
  return (
    <h1 className={`text-2xl font-bold w-full text-${align} p-2 tracking`} style={textCyberpunkStyleEffect}>{text}</h1>
  )
}

import { textCyberpunkStyleEffectWithoutAnimation } from "@/style/styleEffects";

export default function H1 ({ text, align, className }: { text: string, align: string, className?: string}) {
  return (
    <h1 className={`text-2xl font-bold w-full text-${align} p-2 tracking ${className}`} style={textCyberpunkStyleEffectWithoutAnimation}>{text}</h1>
  )
}

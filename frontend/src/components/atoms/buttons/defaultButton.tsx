export default function DefaultButton({ text, onClick, className, paddingOutside = true }: { text: string, onClick?: () => void, className?: string, paddingOutside?: boolean }) {
  return (
    <div className={`${paddingOutside ? 'p-2' : ''} w-full`}>
    <button className={`bg-black text-white rounded-sm p-3 w-full hover:text-black hover:bg-cyan-200 font-semibold hover:shadow-button text-shadow-button transition-all ${className}`} onClick={onClick} type="submit">
      {text}
    </button>
    </div>
  )
}
export default function DefaultButton({ text, onClick, className }: { text: string, onClick?: () => void, className?: string }) {
  return (
    <div className="p-2 w-full">
    <button className={`bg-black text-white rounded-sm p-3 ${className} w-full hover:text-black hover:bg-cyan-200 font-semibold hover:shadow-button text-shadow-button transition-all`} onClick={onClick} type="submit">
      {text}
    </button>
    </div>
  )
}
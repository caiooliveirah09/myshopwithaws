export default function DefaultButton({ text, onClick, className }: { text: string, onClick?: () => void, className?: string }) {
  return (
    <div className="p-2 w-ful">
    <button className={`bg-black text-white rounded-sm p-2 ${className} w-full hover:text-black hover:bg-white border border-black border-black`} onClick={onClick} type="submit">
      {text}
    </button>
    </div>
  )
}
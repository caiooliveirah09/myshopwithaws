export default function TextInput({ placeholder } : { placeholder: string  }) {
  return (
    <input className="w-full border border-black outline-none px-2 rounded-sm py-3"
    placeholder={placeholder}/>
  )
}
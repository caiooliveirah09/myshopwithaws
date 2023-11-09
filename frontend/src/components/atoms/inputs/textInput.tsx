import SmallError from "../small/smallError";

export default function TextInput({ placeholder, value, onChange, error, type } : { placeholder: string, value: string, onChange: (event: any) => void, error?: string, type?: string}) {
  return (
    <div>
        <input className={`w-full border-gray-700 outline-none 
        px-2 rounded-sm py-3 placeholder-gray-300/25
        text-white border shadow-glow bg-gray-800 focus-within:shadow-input transition-all`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
      />
      {error && <SmallError>{ error }</SmallError>}
    </div>
  )
}
import TextInput from "@/components/atoms/inputs/textInput";
import SmallError from "@/components/atoms/small/smallError";

export default function TextInputWithLabel({ label, placeholder, value, onChange, error, type }: { label: string, placeholder: string, value: string, onChange: (event: any) => void, error?: string, type?: string }) {
  return (
    <div className="group w-full p-2 ">
      <label className="text-sm font-medium w-fit px-1 uppercase  text-shadow-label text-white">{label}</label>
      <TextInput placeholder={placeholder} value={value} onChange={onChange} error={error} type={type}/>
    </div>
  );
}
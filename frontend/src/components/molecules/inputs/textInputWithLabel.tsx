import TextInput from "@/components/atoms/inputs/textInput";

export default function TextInputWithLabel({ label, placeholder }: { label: string, placeholder: string }) {
  return (
    <div className="w-full p-2 relative">
      <label className="text-sm font-medium absolute -top-1 bg-white w-fit left-3">{label}</label>
      <TextInput placeholder={placeholder}/>
    </div>
  );
}
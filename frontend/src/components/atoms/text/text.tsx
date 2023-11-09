export default function Text ({children, align }: {children: string, align: string}) {
  return (<p className={`text-${align} break-all`}>{ children }</p>)
}

// p with breakline at end 

// Path: frontend/src/components/atoms/text/textWithBreakline.tsx
// Compare this snippet from frontend/src/app/register/confirmRegistration.tsx:
// import Text from "@/components/atoms/text/text";
  
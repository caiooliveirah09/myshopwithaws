export default function SmallError({ children }: { children: string}) {
  return (<p className="text-red-500 text-xs">{ children }</p>)
}
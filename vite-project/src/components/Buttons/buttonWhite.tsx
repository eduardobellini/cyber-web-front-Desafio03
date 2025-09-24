export interface nameButton{
    name: string;
}

export default function ButtonWhite(props: nameButton) {
  return (
    <button className="rounded-[6px] border border-white px-10 py-3 text-sm font-medium transition-colors text-white duration-200 hover:bg-zinc-300">
        {props.name}
    </button>
  )
}

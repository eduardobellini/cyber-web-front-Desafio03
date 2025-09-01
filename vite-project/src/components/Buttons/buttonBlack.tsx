export interface nameButton{
    name: string;
}

export default function buttonBlack(props: nameButton) {
  return (
    <button className="rounded-[6px] border border-zinc-700 px-10 py-3 text-sm font-medium transition-colors text-zinc-700 duration-200 hover:bg-zinc-300">
        {props.name}
    </button>
  )
}

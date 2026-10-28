export const contactContainer =
  "mx-auto w-[calc(100%-2.5rem)] max-w-[1280px] sm:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)]";
export const contactAction =
  "group inline-flex min-h-12 items-center justify-between gap-6 rounded-full bg-[#6250a6] px-6 py-3.5 text-xs font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#493681]";
export default function ContactLabel({ number, children, light = false }) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-[9px] font-medium tracking-[.12em] ${light ? "text-[#d8cef4]" : "text-[#5d4798]"}`}
    >
      <span className="grid size-7 shrink-0 place-items-center rounded-full border border-current text-[9px] tracking-normal">
        {number || "+"}
      </span>
      {children}
    </p>
  );
}

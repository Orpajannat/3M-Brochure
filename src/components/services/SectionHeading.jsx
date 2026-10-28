export const container =
  "mx-auto w-[calc(100%-2.5rem)] max-w-[1280px] sm:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)]";
export const action =
  "group inline-flex min-h-12 items-center justify-between gap-6 rounded-full bg-[#c43d2c] px-6 py-3.5 text-xs font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#a52d21]";
export default function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  number,
}) {
  return (
    <div data-sv-reveal="rise">
      <p
        className={`flex items-center gap-3 font-mono text-[10px] font-medium tracking-[.12em] ${light ? "text-[#f2b6a7]" : "text-[#a52d21]"}`}
      >
        <span className="grid size-7 shrink-0 place-items-center rounded-full border border-current text-[9px] tracking-normal">
          {number || "+"}
        </span>
        {eyebrow}
      </p>
      <h2
        className={`mt-5 text-[clamp(2rem,4.4vw,4rem)] leading-[1.07] font-medium tracking-[-.055em] ${light ? "text-[#f6f4ef]" : "text-[#252722]"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-6 max-w-xl text-sm leading-[1.9] ${light ? "text-[#c3c9bc]" : "text-[#64695e]"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

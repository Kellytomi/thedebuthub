'use client';

export default function ActionButton({
  children,
  onClick,
  ariaLabel,
  ...props
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
        <div
          className="w-full h-full flex cursor-pointer items-center bg-gradient-to-b from-[#006DFF] to-[#004199] px-7 py-3 justify-center text-white transition-colors rounded-md"
        >
          {children}
        </div>
    </button>
  );
}
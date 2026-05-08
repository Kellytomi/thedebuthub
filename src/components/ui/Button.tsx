'use client';

import Link from 'next/link';

type ActionButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  [key: string]: any;
};

export default function ActionButton({
  children,
  onClick,
  ariaLabel,
  href,
  ...props
}: ActionButtonProps) {
  const classes =
    "soft-shimmer w-full h-full flex cursor-pointer items-center bg-gradient-to-b from-[#006DFF] to-[#004199] px-7 py-3 justify-center text-white transition-all duration-300 rounded-md shadow-[0_10px_32px_rgba(0,109,255,0.18)] hover:-translate-y-0.5 hover:from-[#1D7BFF] hover:to-[#0051BF] hover:shadow-[0_18px_46px_rgba(0,109,255,0.28)] active:translate-y-0";

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className="inline-flex" {...props}>
        <div className={classes}>
          {children}
        </div>
      </Link>
    );
  }

  return (
    <button onClick={onClick} aria-label={ariaLabel} className="inline-flex" {...props}>
      <div className={classes}>
        {children}
      </div>
    </button>
  );
}

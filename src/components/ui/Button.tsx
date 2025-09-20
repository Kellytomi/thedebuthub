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
    "w-full h-full flex cursor-pointer items-center bg-gradient-to-b from-[#006DFF] to-[#004199] px-7 py-3 justify-center text-white transition-colors rounded-md";

  // ✅ If `href` is provided → render as a link
  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} {...props}>
        <div className={classes}>
          {children}
        </div>
      </Link>
    );
  }

  // ✅ Otherwise → render as a button
  return (
    <button onClick={onClick} aria-label={ariaLabel} {...props}>
      <div className={classes}>
        {children}
      </div>
    </button>
  );
}
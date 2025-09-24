'use client';

import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/config';

// Custom components for rendering Sanity blocks with dark theme
const components = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset) return null;
      
      return (
        <div className="my-8 max-w-4xl mx-auto">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || 'Article image'}
            width={1200}
            height={800}
            className="w-full h-auto rounded-[20px]"
            priority={false}
          />
        </div>
          {value.caption && (
            <p className="text-white text-center text-[14px] max-w-4xl mx-auto mt-4">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    code: ({ value }: { value: any }) => {
      return (
        <div className="my-8">
          <pre className="bg-[#171717] text-white p-6 rounded-[20px] overflow-x-auto border border-[#FFDDB2]/20">
            <code className={`language-${value.language}`}>
              {value.code}
            </code>
          </pre>
        </div>
      );
    },
  },
  block: {
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-white text-2xl md:text-3xl font-bold mt-10 mb-6 text-center max-w-4xl mx-auto">
        {children}
      </h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-white text-xl md:text-2xl font-semibold mt-8 mb-4 text-center max-w-4xl mx-auto">
        {children}
      </h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 className="text-white text-lg md:text-xl font-medium mt-6 mb-3 text-center max-w-4xl mx-auto">
        {children}
      </h4>
    ),
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="text-white text-center text-[16px] md:text-[18px] max-w-4xl mx-auto mb-6 leading-relaxed">
        {children}
      </p>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-[#FFDDB2] pl-6 my-8 italic text-white/80 max-w-4xl mx-auto">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-semibold text-[#FFDDB2]">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: { children: React.ReactNode }) => (
      <code className="bg-[#171717] text-[#FFDDB2] px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }: { children: React.ReactNode; value: any }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#006DFF] hover:text-[#0056cc] underline transition-colors duration-300"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc list-inside mb-6 space-y-3 text-white max-w-4xl mx-auto">{children}</ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside mb-6 space-y-3 text-white max-w-4xl mx-auto">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <li className="text-white text-[16px] md:text-[18px] leading-relaxed">{children}</li>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <li className="text-white text-[16px] md:text-[18px] leading-relaxed">{children}</li>
    ),
  },
};

interface SanityContentProps {
  content: any[];
  className?: string;
}

export default function SanityContent({ content, className = '' }: SanityContentProps) {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  return (
    <div className={`max-w-none ${className}`}>
      <PortableText value={content} components={components} />
    </div>
  );
}


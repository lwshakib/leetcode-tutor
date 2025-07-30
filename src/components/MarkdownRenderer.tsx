"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

function CodeBlock({ children, ...props }: any) {
  const [copied, setCopied] = useState(false);
  const code = String(children).replace(/\n$/, "");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      setCopied(false);
    }
  };

  return (
    <div className="relative group bg-gray-900 rounded-lg border border-gray-800 shadow-sm my-4 overflow-auto">
      <pre
        {...props}
        className="text-xs sm:text-sm font-mono font-normal text-gray-100 mb-0 break-words pr-14 bg-transparent rounded-lg border-none p-4 overflow-x-auto"
      >
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-700 text-gray-100 rounded border border-gray-600 hover:bg-gray-600 transition-opacity opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
        type="button"
        aria-label="Copy code"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

const markdownComponents = {
  h1: ({ node, ...props }: any) => (
    <h1
      {...props}
      className="text-2xl sm:text-3xl font-bold mb-2 break-words"
    />
  ),
  h2: ({ node, ...props }: any) => (
    <h2 {...props} className="text-xl sm:text-2xl font-bold mb-2 break-words" />
  ),
  h3: ({ node, ...props }: any) => (
    <h3 {...props} className="text-lg sm:text-xl font-bold mb-2 break-words" />
  ),
  h4: ({ node, ...props }: any) => (
    <h4 {...props} className="text-md sm:text-lg font-bold mb-2 break-words" />
  ),
  h5: ({ node, ...props }: any) => (
    <h5 {...props} className="text-sm sm:text-md font-bold mb-2 break-words" />
  ),
  h6: ({ node, ...props }: any) => (
    <h6 {...props} className="text-xs sm:text-sm font-bold mb-2 break-words" />
  ),
  p: ({ node, ...props }: any) => (
    <p {...props} className="text-sm sm:text-base mb-2 break-words" />
  ),
  a: ({ node, ...props }: any) => (
    <a {...props} className="text-primary font-semibold underline" />
  ),
  code: ({ node, inline, className, children, ...props }: any) => {
    if (!node.properties?.className) {
      return (
        <code
          {...props}
          className={
            "text-xs sm:text-sm font-bold mb-2 break-words border-amber-600 bg-amber-500/30 px-2 py-1 rounded-md" +
            (className || "")
          }
        >
          {children}
        </code>
      );
    }
    return <CodeBlock {...props}>{children}</CodeBlock>;
  },
  pre: ({ node, ...props }: any) => (
    <pre {...props} className="text-xs sm:text-sm font-bold mb-2 break-words" />
  ),
  blockquote: ({ node, ...props }: any) => (
    <blockquote
      {...props}
      className="text-xs sm:text-sm font-bold mb-2 break-words border-l-2 pl-4"
    />
  ),
  li: ({ node, ...props }: any) => <li {...props} className="mb-1" />,
  ul: ({ node, ...props }: any) => (
    <ul {...props} className="list-disc pl-6 text-base mb-2" />
  ),
  ol: ({ node, ...props }: any) => (
    <ol {...props} className="list-decimal pl-6 text-base mb-2" />
  ),
  hr: ({ node, ...props }: any) => (
    <hr {...props} className="text-xs sm:text-sm font-bold mb-2 break-words" />
  ),
  table: ({ node, ...props }: any) => (
    <table
      {...props}
      className="text-xs sm:text-sm font-bold mb-2 break-words"
    />
  ),
  thead: ({ node, ...props }: any) => (
    <thead
      {...props}
      className="text-xs sm:text-sm font-bold mb-2 break-words"
    />
  ),
  tbody: ({ node, ...props }: any) => (
    <tbody
      {...props}
      className="text-xs sm:text-sm font-bold mb-2 break-words"
    />
  ),
  tr: ({ node, ...props }: any) => (
    <tr {...props} className="text-xs sm:text-sm font-bold mb-2 break-words" />
  ),
  td: ({ node, ...props }: any) => (
    <td {...props} className="text-xs sm:text-sm font-bold mb-2 break-words" />
  ),
  th: ({ node, ...props }: any) => (
    <th {...props} className="text-xs sm:text-sm font-bold mb-2 break-words" />
  ),
  img: ({ node, ...props }: any) => (
    <img {...props} className="text-xs sm:text-sm font-bold mb-2 break-words" />
  ),
  video: ({ node, ...props }: any) => (
    <video
      {...props}
      className="text-xs sm:text-sm font-bold mb-2 break-words"
    />
  ),
  audio: ({ node, ...props }: any) => (
    <audio
      {...props}
      className="text-xs sm:text-sm font-bold mb-2 break-words"
    />
  ),
  iframe: ({ node, ...props }: any) => (
    <iframe
      {...props}
      className="text-xs sm:text-sm font-bold mb-2 break-words"
    />
  ),
  svg: ({ node, ...props }: any) => (
    <svg {...props} className="text-xs sm:text-sm font-bold mb-2 break-words" />
  ),
  sup: ({ node, ...props }: any) => (
    <sup {...props} className="text-xs font-bold" />
  ),
  sub: ({ node, ...props }: any) => (
    <sub {...props} className="text-xs font-bold" />
  ),
};

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
  );
}

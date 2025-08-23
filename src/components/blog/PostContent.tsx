"use client";

interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  return (
    <div
      className="prose prose-base max-w-none prose-p:leading-3 prose-h2:mt-12 prose-h2:border-b prose-h2:pb-4 prose-h3:mt-10 prose-a:text-blue-600 hover:prose-a:underline"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

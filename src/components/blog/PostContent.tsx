import { MDXRemote } from 'next-mdx-remote/rsc'

interface PostContentProps {
  content: string;
  isMdx?: boolean;
}

export function PostContent({ content, isMdx = false }: PostContentProps) {
  if (isMdx) {
    return (
      <div className="prose prose-base max-w-none prose-p:leading-relaxed prose-h1:mb-6 prose-h2:mt-12 prose-h2:border-b prose-h2:pb-4 prose-h3:mt-10 prose-a:text-blue-600 hover:prose-a:underline">
        <MDXRemote source={content} />
      </div>
    );
  }

  return (
    <div
      className="prose prose-base max-w-none prose-p:leading-relaxed prose-h1:mb-6 prose-h2:mt-12 prose-h2:border-b prose-h2:pb-4 prose-h3:mt-10 prose-a:text-blue-600 hover:prose-a:underline"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

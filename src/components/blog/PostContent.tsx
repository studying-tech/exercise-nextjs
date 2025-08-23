import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'

interface PostContentProps {
  content: string;
  isMdx?: boolean;
}

export function PostContent({ content, isMdx = false }: PostContentProps) {
  if (isMdx) {
    return (
      <div className="prose prose-base max-w-none prose-h1:mb-6 prose-h2:mt-12 prose-h2:border-b prose-h2:pb-4 prose-h3:mt-10 prose-a:text-blue-600 hover:prose-a:underline prose-pre:p-0 prose-pre:bg-transparent prose-pre:text-current prose-code:before:content-none prose-code:after:content-none prose-p:hidden">
        <MDXRemote 
          source={content} 
          options={{
            mdxOptions: {
              rehypePlugins: [
                rehypeSlug,
                rehypeHighlight
              ],
            },
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="prose prose-base max-w-none prose-h1:mb-6 prose-h2:mt-12 prose-h2:border-b prose-h2:pb-4 prose-h3:mt-10 prose-a:text-blue-600 hover:prose-a:underline prose-pre:p-0 prose-pre:bg-transparent prose-pre:text-current prose-code:before:content-none prose-code:after:content-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

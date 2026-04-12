import { articleSchema } from '@/lib/schema';
import { blogPosts } from '@/data/blogPosts';

type Props = {
  slug: string;
};

export default function ArticleSchema({ slug }: Props) {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return null;

  const schema = articleSchema({
    title: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: `https://farhand.live/blog/${post.slug}`,
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

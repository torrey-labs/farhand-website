import { articleSchema, breadcrumbSchema } from '@/lib/schema';
import { blogPosts } from '@/data/blogPosts';

type Props = {
  slug: string;
};

export default function ArticleSchema({ slug }: Props) {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return null;

  const url = `https://farhand.ai/blog/${post.slug}`;

  const article = articleSchema({
    title: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url,
  });

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://farhand.ai/' },
    { name: 'Blog', url: 'https://farhand.ai/blog' },
    { name: post.title, url },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </>
  );
}

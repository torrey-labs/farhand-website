import { renderBlogOg, blogOgSize, blogOgContentType, blogOgAlt } from '@/lib/blog-og';

export const runtime = 'edge';
export const alt = blogOgAlt('plc-troubleshooting-remote-diagnostics');
export const size = blogOgSize;
export const contentType = blogOgContentType;

export default function Image() {
  return renderBlogOg('plc-troubleshooting-remote-diagnostics');
}

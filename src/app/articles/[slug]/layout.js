import { getArticleMetadata } from '@/lib/sanity/api'
import { urlFor } from '@/lib/sanity/config'

const SITE_URL = 'https://thedebuthub.com'
const FALLBACK_IMAGE = '/images/The Debut Hub-black.png'
const OG_WIDTH = 1200
const OG_HEIGHT = 630

// The article route itself is a client component, so it cannot export metadata.
// This layout does it instead, which keeps the social/SEO tags in the server-rendered HTML.
export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = await getArticleMetadata(slug)

  if (!article) {
    return {
      title: 'Article Not Found - The Debut Hub',
      description: 'The requested article could not be found.',
    }
  }

  const title = article.seo?.metaTitle || `${article.title} - The Debut Hub`
  const description =
    article.seo?.metaDescription ||
    article.excerpt ||
    `Read ${article.title} on The Debut Hub - Nigerian music discovery.`
  const articleUrl = `${SITE_URL}/articles/${slug}`

  // Use the article's cover image, cropped to the 1.91:1 ratio social platforms expect.
  // `fit('crop')` guarantees the output is exactly 1200x630 (without it Sanity can
  // return a max-fit size such as 634x630). Cropping follows the editor's hotspot.
  // Serving it as JPEG keeps the payload small - the same cover is ~1MB as PNG but
  // ~100KB at q80, and social crawlers are quick to give up on heavy images.
  const image = article.mainImage
    ? urlFor(article.mainImage)
        .width(OG_WIDTH)
        .height(OG_HEIGHT)
        .fit('crop')
        .format('jpg')
        .quality(80)
        .url()
    : FALLBACK_IMAGE

  return {
    title,
    description,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title,
      description,
      url: articleUrl,
      siteName: 'The Debut Hub',
      type: 'article',
      publishedTime: article.publishedAt
        ? new Date(article.publishedAt).toISOString()
        : undefined,
      authors: article.author ? [article.author] : undefined,
      section: article.category || undefined,
      tags: article.tags?.length ? article.tags : undefined,
      images: [
        {
          url: image,
          width: OG_WIDTH,
          height: OG_HEIGHT,
          alt: article.mainImage?.alt || article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@thedebuthub',
      creator: '@thedebuthub',
      title,
      description,
      images: [image],
    },
  }
}

export default function ArticleSlugLayout({ children }) {
  return children
}

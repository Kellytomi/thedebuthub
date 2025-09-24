import { client, queries, urlFor } from './config'
import { SanityArticle } from '@/types'

// Transform Sanity article to match your existing Article interface
export function transformSanityArticle(sanityArticle: SanityArticle) {
  return {
    id: sanityArticle._id,
    title: sanityArticle.title,
    excerpt: sanityArticle.excerpt,
    content: sanityArticle.body, // Keep as Sanity blocks for rich content
    image: sanityArticle.mainImage ? urlFor(sanityArticle.mainImage).width(800).height(600).url() : '/images/default-article.jpg',
    date: new Date(sanityArticle.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    category: sanityArticle.category,
    author: sanityArticle.author,
    slug: sanityArticle.slug.current,
    featured: sanityArticle.featured || false,
    tags: sanityArticle.tags || [],
    estimatedReadingTime: sanityArticle.estimatedReadingTime || 5,
    seo: sanityArticle.seo
  }
}

// Get all articles
export async function getAllArticles() {
  try {
    const articles = await client.fetch(queries.getAllArticles)
    return articles.map(transformSanityArticle)
  } catch (error) {
    return []
  }
}

// Get article by slug
export async function getArticleBySlug(slug: string) {
  try {
    const article = await client.fetch(queries.getArticleBySlug, { slug })
    return article ? transformSanityArticle(article) : null
  } catch (error) {
    return null
  }
}

// Get related articles
export async function getRelatedArticles(category: string, currentId: string) {
  try {
    const articles = await client.fetch(queries.getRelatedArticles, { 
      category, 
      currentId 
    })
    return articles.map(transformSanityArticle)
  } catch (error) {
    return []
  }
}

// Get articles by category
export async function getArticlesByCategory(category: string) {
  try {
    const articles = await client.fetch(queries.getArticlesByCategory, { category })
    return articles.map(transformSanityArticle)
  } catch (error) {
    return []
  }
}

// Get featured articles
export async function getFeaturedArticles() {
  try {
    const articles = await client.fetch(queries.getFeaturedArticles)
    return articles.map(transformSanityArticle)
  } catch (error) {
    return []
  }
}

// Get raw Sanity article (for rich content rendering)
export async function getRawArticleBySlug(slug: string) {
  try {
    return await client.fetch(queries.getArticleBySlug, { slug })
  } catch (error) {
    return null
  }
}


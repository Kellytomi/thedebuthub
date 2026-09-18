import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kc23wdnh'
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const sanityApiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const client = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: sanityApiVersion,
  token: process.env.SANITY_API_TOKEN, // Only needed for write operations
})

// Get a pre-configured url-builder from your sanity client
const builder = createImageUrlBuilder(client)

// Helper function to generate image URLs
export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ queries for articles
export const queries = {
  // Get all articles with basic info
  getAllArticles: `*[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    category,
    author,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200)
  }`,
  
  // Get single article by slug
  getArticleBySlug: `*[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    mainImage,
    publishedAt,
    category,
    author,
    tags,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200)
  }`,

  // Slim projection for page metadata (Open Graph / Twitter cards).
  // Deliberately excludes `body` so metadata requests stay cheap.
  getArticleMetadata: `*[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    category,
    author,
    tags,
    seo
  }`,
  
  // Get related articles (same category, excluding current article)
  getRelatedArticles: `*[_type == "article" && category == $category && _id != $currentId] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    category,
    author
  }`,
  
  // Get articles by category
  getArticlesByCategory: `*[_type == "article" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    category,
    author
  }`,
  
  // Get featured articles
  getFeaturedArticles: `*[_type == "article" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    category,
    author
  }`,
  
  // Search articles by title, excerpt or tags
  searchArticles: `*[_type == "article" && (
    title match $query || 
    excerpt match $query || 
    tags match $query ||
    category match $query
  )] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    category,
    author,
    tags
  }`
}

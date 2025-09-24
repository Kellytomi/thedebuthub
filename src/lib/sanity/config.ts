import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Only needed for write operations
})

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)

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
  }`
}


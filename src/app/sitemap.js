import { getAllArticles } from '@/lib/sanity/api';

export default async function sitemap() {
  const baseUrl = 'https://thedebuthub.com';
  const now = new Date();
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'hourly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // Dynamic article pages
  let articlePages = [];
  
  try {
    const articles = await getAllArticles();
    articlePages = articles
      .filter(article => article.slug && article.slug.current) // Only articles with valid slugs
      .map(article => ({
        url: `${baseUrl}/articles/${article.slug.current}`,
        lastModified: new Date(article._updatedAt || article._createdAt || now),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
  } catch (error) {
    console.error('Error generating sitemap for articles:', error);
    // Continue without article pages if there's an error
  }

  return [...staticPages, ...articlePages];
}

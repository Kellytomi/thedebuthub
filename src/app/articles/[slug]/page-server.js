import { notFound } from 'next/navigation';
import { getArticleBySlug, getRelatedArticles } from '@/lib/sanity/api';
import ArticlePageClient from './page-client';

// Generate metadata for individual articles
export async function generateMetadata({ params }) {
  try {
    const article = await getArticleBySlug(params.slug);
    
    if (!article) {
      return {
        title: 'Article Not Found - The Debut Hub',
        description: 'The requested article could not be found.',
      };
    }

    // Create article-specific metadata
    const title = `${article.title} - The Debut Hub`;
    const description = article.excerpt || article.description || `Read about ${article.title} on The Debut Hub - your premier destination for Nigerian music discovery.`;
    const publishedDate = new Date(article.publishedAt || article._createdAt);
    const modifiedDate = new Date(article._updatedAt || article._createdAt);
    const articleUrl = `https://thedebuthub.com/articles/${params.slug}`;
    
    return {
      title,
      description,
      keywords: [
        ...(article.categories || []).map(cat => cat.title),
        article.author || 'Nigerian Music',
        'Afrobeats',
        'The Debut Hub',
        'Music Discovery',
        'Nigerian Artists',
      ],
      
      // Open Graph
      openGraph: {
        title,
        description,
        url: articleUrl,
        siteName: 'The Debut Hub',
        type: 'article',
        publishedTime: publishedDate.toISOString(),
        modifiedTime: modifiedDate.toISOString(),
        authors: [article.author || 'The Debut Hub'],
        section: 'Music',
        tags: (article.categories || []).map(cat => cat.title),
        images: [
          {
            url: article.image || '/images/The Debut Hub-black.png',
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
      },
      
      // Twitter Card
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [article.image || '/images/The Debut Hub-black.png'],
        creator: '@thedebuthub',
      },
      
      // Article-specific metadata
      alternates: {
        canonical: articleUrl,
      },
      
      // Structured Data will be added in the component
      other: {
        'article:author': article.author || 'The Debut Hub',
        'article:published_time': publishedDate.toISOString(),
        'article:modified_time': modifiedDate.toISOString(),
        'article:section': 'Music',
        'article:tag': (article.categories || []).map(cat => cat.title).join(', '),
      },
    };
  } catch (error) {
    console.error('Error generating metadata for article:', error);
    return {
      title: 'Article - The Debut Hub',
      description: 'Discover the latest in Nigerian music on The Debut Hub.',
    };
  }
}

// Server-side page component
export default async function ArticlePage({ params }) {
  let article = null;
  let relatedArticles = [];
  
  try {
    // Fetch article and related articles on the server
    article = await getArticleBySlug(params.slug);
    
    if (!article) {
      notFound();
    }
    
    // Fetch related articles
    relatedArticles = await getRelatedArticles(params.slug) || [];
  } catch (error) {
    console.error('Error fetching article:', error);
    notFound();
  }

  // Pass data to client component
  return (
    <ArticlePageClient 
      initialArticle={article}
      initialRelatedArticles={relatedArticles}
      slug={params.slug}
    />
  );
}

// Generate static params for static generation (optional)
export async function generateStaticParams() {
  try {
    const { getAllArticles } = await import('@/lib/sanity/api');
    const articles = await getAllArticles();
    
    return articles
      .filter(article => article.slug?.current)
      .map((article) => ({
        slug: article.slug.current,
      }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
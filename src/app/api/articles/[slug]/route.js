import { NextResponse } from "next/server";
import { getArticleBySlug, getRelatedArticles, getRawArticleBySlug } from "@/lib/sanity/api";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const isRaw = searchParams.get('raw') === 'true';
    
    if (isRaw) {
      // Fetch raw article from Sanity for rich content
      const rawArticle = await getRawArticleBySlug(slug);
      
      if (!rawArticle) {
        return NextResponse.json(
          {
            success: false,
            error: 'Article not found'
          },
          { status: 404 }
        );
      }

      const response = NextResponse.json({
        success: true,
        article: rawArticle,
        timestamp: Date.now()
      });
      
      response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');
      
      return response;
    }
    
    // Fetch transformed article from Sanity
    const article = await getArticleBySlug(slug);
    
    if (!article) {
      return NextResponse.json(
        {
          success: false,
          error: 'Article not found'
        },
        { status: 404 }
      );
    }

    // Get related articles
    const relatedArticles = await getRelatedArticles(article.category, article.id);

    // Add cache-busting headers
    const response = NextResponse.json({
      success: true,
      article,
      relatedArticles,
      timestamp: Date.now()
    });
    
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;

  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch article from CMS'
      },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import {
  getAllArticles,
  getArticlesByCategory,
  getFeaturedArticles,
} from "@/lib/sanity/api";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const isFeatured = searchParams.get("featured") === "true";
    const sort = searchParams.get("sort");
    const limit = parseInt(searchParams.get("limit") || "15");
    const offset = parseInt(searchParams.get("offset") || "0");

    let articles;

    // Fetch articles from Sanity based on query params
    if (isFeatured) {
      articles = await getFeaturedArticles();
    } else if (category) {
      articles = await getArticlesByCategory(category);
    } else {
      articles = await getAllArticles();
    }

    // Sort articles if requested
    if (sort === "latest" && articles.length > 0) {
      articles = articles.sort((a, b) => {
        const dateA = new Date(a.publishedAt || a._createdAt);
        const dateB = new Date(b.publishedAt || b._createdAt);
        return dateB - dateA; // Latest first
      });
    }

    // Apply limit and offset for pagination
    const paginatedArticles = articles.slice(offset, offset + limit);
    const totalCount = articles.length;

    const response = NextResponse.json({
      success: true,
      articles: paginatedArticles,
      total: totalCount,
      count: paginatedArticles.length,
      pagination: {
        limit,
        offset,
        total: totalCount,
        hasMore: offset + limit < totalCount,
      },
      timestamp: Date.now(),
      version: "2.1.0", // Updated version for Sanity integration
    });

    // Comprehensive cache control headers
    response.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate, max-age=0"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Last-Modified", new Date().toUTCString());
    response.headers.set("ETag", `"${Date.now()}"`);

    return response;
  } catch (error) {
    console.error("Error fetching articles:", error);

    // Fallback to empty array if Sanity is unavailable
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch articles from CMS",
        articles: [],
        count: 0,
        fallback: true,
      },
      { status: 500 }
    );
  }
}
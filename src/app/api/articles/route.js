import { NextResponse } from "next/server";

// Sample articles data - in a real app, this would come from a database
const articlesData = [
  {
    id: 1,
    title: "Bringing star Tems arrives busily with her new single, 'Not It Yet'",
    excerpt: "Grammy-winning Nigerian artist Tems returns with a powerful new track that showcases her evolution as an artist and her commitment to authentic storytelling.",
    image: "/images/david-image.png",
    date: "November 15, 2024",
    category: "New Release",
    author: "The Debut Hub",
    slug: "tems-not-it-yet-new-single",
    content: "Grammy-winning Nigerian artist Tems has once again demonstrated her artistic prowess with the release of 'Not It Yet', a powerful new single that showcases her continued evolution as one of Africa's most compelling voices."
  },
  {
    id: 2,
    title: "Astonious Akindele Rising Star Redefining Nollywood's Youth Narrative",
    excerpt: "The young actor and musician is making waves across entertainment industries, bringing fresh perspectives to both film and music.",
    image: "/images/david-image.png",
    date: "November 14, 2024", 
    category: "Interview",
    author: "The Debut Hub",
    slug: "astonious-akindele-rising-star"
  },
  {
    id: 3,
    title: "What Teni Chisefu and the East Wing At Their Wedding",
    excerpt: "An exclusive look at the lavish celebration that brought together Nigeria's biggest music stars for an unforgettable night.",
    image: "/images/david-image.png",
    date: "November 13, 2024",
    category: "Celebrity",
    author: "The Debut Hub",
    slug: "teni-chisefu-east-wing-wedding"
  },
  {
    id: 4,
    title: "The Rise of Afrobeats: How Nigerian Artists Are Conquering Global Charts",
    excerpt: "From local sounds to international acclaim, explore how Afrobeats has become a dominant force in global music.",
    image: "/images/david-image.png",
    date: "November 12, 2024",
    category: "Music Industry",
    author: "The Debut Hub",
    slug: "afrobeats-global-domination"
  },
  {
    id: 5,
    title: "Behind the Scenes: Recording with Burna Boy in His Lagos Studio",
    excerpt: "An intimate look at the Grammy winner's creative process and the state-of-the-art facility where magic happens.",
    image: "/images/david-image.png",
    date: "November 11, 2024",
    category: "Studio Session",
    author: "The Debut Hub",
    slug: "burna-boy-studio-recording-session"
  },
  {
    id: 6,
    title: "Wizkid's Made in Lagos Anniversary: Reflecting on a Masterpiece",
    excerpt: "Three years later, we look back at how this album redefined Afrobeats and elevated Nigerian music on the world stage.",
    image: "/images/david-image.png",
    date: "November 10, 2024",
    category: "Album Review",
    author: "The Debut Hub",
    slug: "wizkid-made-in-lagos-anniversary"
  },
  {
    id: 7,
    title: "Rema's Rave & Roses World Tour: A Global Phenomenon",
    excerpt: "The Mavin Records star continues to break barriers with sold-out shows across multiple continents.",
    image: "/images/david-image.png",
    date: "November 9, 2024",
    category: "Tour",
    author: "The Debut Hub",
    slug: "rema-rave-roses-world-tour"
  },
  {
    id: 8,
    title: "Davido's Timeless Album: Breaking Streaming Records",
    excerpt: "The OBO's latest project shatters multiple streaming milestones within its first week of release.",
    image: "/images/david-image.png",
    date: "November 8, 2024",
    category: "Album Review",
    author: "The Debut Hub",
    slug: "davido-timeless-streaming-records"
  },
  {
    id: 9,
    title: "Ayra Starr: The New Voice of Afrobeats",
    excerpt: "Mavin's rising star discusses her journey, influences, and what's next for her groundbreaking career.",
    image: "/images/david-image.png",
    date: "November 7, 2024",
    category: "Interview",
    author: "The Debut Hub",
    slug: "ayra-starr-new-voice-afrobeats"
  },
  {
    id: 10,
    title: "Fireboy DML's Evolution: From Laughter, Tears & Goosebumps to Apollo",
    excerpt: "Tracing the artistic growth of one of Nigeria's most consistent hitmakers across his discography.",
    image: "/images/david-image.png",
    date: "November 6, 2024",
    category: "Artist Profile",
    author: "The Debut Hub",
    slug: "fireboy-dml-artistic-evolution"
  },
  {
    id: 11,
    title: "Omah Lay's Boy Alone Tour: Vulnerability and Artistry",
    excerpt: "The Port Harcourt native brings raw emotion and stellar production to stages worldwide.",
    image: "/images/david-image.png",
    date: "November 5, 2024",
    category: "Tour",
    author: "The Debut Hub",
    slug: "omah-lay-boy-alone-tour"
  },
  {
    id: 12,
    title: "The Producer's Corner: Spotlight on Telz and His Hit-Making Formula",
    excerpt: "An exclusive interview with the producer behind some of Afrobeats' biggest anthems.",
    image: "/images/david-image.png",
    date: "November 4, 2024",
    category: "Producer Spotlight",
    author: "The Debut Hub",
    slug: "telz-producer-spotlight"
  },
  {
    id: 13,
    title: "Asake's Mr. Money With The Vibe: Redefining Afrofusion",
    excerpt: "How the YBNL signee is blending traditional Yoruba sounds with contemporary Afrobeats.",
    image: "/images/david-image.png",
    date: "November 3, 2024",
    category: "Album Review",
    author: "The Debut Hub",
    slug: "asake-mr-money-afrofusion"
  },
  {
    id: 14,
    title: "Women in Afrobeats: Celebrating Female Pioneers and Rising Stars",
    excerpt: "From Tiwa Savage to Tems, exploring the powerful women shaping the genre's future.",
    image: "/images/david-image.png",
    date: "November 2, 2024",
    category: "Music Industry",
    author: "The Debut Hub",
    slug: "women-in-afrobeats-pioneers"
  },
  {
    id: 15,
    title: "The Global Impact of Nigerian Music: From Lagos to the World",
    excerpt: "How Nigerian artists are influencing global music trends and collaborating with international superstars.",
    image: "/images/david-image.png",
    date: "November 1, 2024",
    category: "Music Industry",
    author: "The Debut Hub",
    slug: "nigerian-music-global-impact"
  }
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || articlesData.length;
    const offset = parseInt(searchParams.get('offset')) || 0;

    // Simulate database query with limit and offset
    const articles = articlesData.slice(offset, offset + limit);

    // Add comprehensive cache-busting headers
    const response = NextResponse.json({
      success: true,
      articles,
      total: articlesData.length,
      count: articles.length,
      timestamp: Date.now(), // Force cache invalidation
      version: '1.0.0' // API version for cache busting
    });
    
    // Comprehensive cache control headers
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Last-Modified', new Date().toUTCString());
    response.headers.set('ETag', `"${Date.now()}"`);
    
    return response;

  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch articles',
        articles: []
      },
      { status: 500 }
    );
  }
}
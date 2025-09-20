import { NextResponse } from "next/server";

// Import the articles data from the main articles route
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
    content: "Grammy-winning Nigerian artist Tems has once again demonstrated her artistic prowess with the release of 'Not It Yet', a powerful new single that showcases her continued evolution as one of Africa's most compelling voices. The track represents a bold step forward in her musical journey, blending her signature ethereal vocals with innovative production that pushes the boundaries of contemporary Afrobeats."
  },
  {
    id: 2,
    title: "Astonious Akindele Rising Star Redefining Nollywood's Youth Narrative",
    excerpt: "The young actor and musician is making waves across entertainment industries, bringing fresh perspectives to both film and music.",
    image: "/images/david-image.png",
    date: "November 14, 2024", 
    category: "Interview",
    author: "The Debut Hub",
    slug: "astonious-akindele-rising-star",
    content: "Astonious Akindele represents a new generation of multi-talented entertainers who refuse to be confined to a single medium. With breakthrough performances in both Nollywood films and the Nigerian music scene, Akindele is redefining what it means to be a young artist in today's entertainment landscape."
  },
  {
    id: 3,
    title: "What Teni Chisefu and the East Wing At Their Wedding",
    excerpt: "An exclusive look at the lavish celebration that brought together Nigeria's biggest music stars for an unforgettable night.",
    image: "/images/david-image.png",
    date: "November 13, 2024",
    category: "Celebrity",
    author: "The Debut Hub",
    slug: "teni-chisefu-east-wing-wedding",
    content: "The wedding of Teni Chisefu was nothing short of spectacular, bringing together the biggest names in Nigerian entertainment for a celebration that will be remembered for years to come. The star-studded event showcased the tight-knit community within Nigeria's music industry."
  },
  {
    id: 4,
    title: "The Rise of Afrobeats: How Nigerian Artists Are Conquering Global Charts",
    excerpt: "From local sounds to international acclaim, explore how Afrobeats has become a dominant force in global music.",
    image: "/images/david-image.png",
    date: "November 12, 2024",
    category: "Music Industry",
    author: "The Debut Hub",
    slug: "afrobeats-global-domination",
    content: "The global ascension of Afrobeats represents one of the most significant cultural shifts in modern music history. From the streets of Lagos to the stages of Madison Square Garden, Nigerian artists have systematically conquered international markets through a combination of authentic artistry and strategic global positioning."
  },
  {
    id: 5,
    title: "Behind the Scenes: Recording with Burna Boy in His Lagos Studio",
    excerpt: "An intimate look at the Grammy winner's creative process and the state-of-the-art facility where magic happens.",
    image: "/images/david-image.png",
    date: "November 11, 2024",
    category: "Studio Session",
    author: "The Debut Hub",
    slug: "burna-boy-studio-recording-session",
    content: "Inside Burna Boy's Lagos recording studio, creativity flows as freely as the artist's genre-defying musical vision. The Grammy winner's approach to music creation is both methodical and spontaneous, combining cutting-edge technology with traditional African musical elements."
  },
  {
    id: 6,
    title: "Wizkid's Made in Lagos Anniversary: Reflecting on a Masterpiece",
    excerpt: "Three years later, we look back at how this album redefined Afrobeats and elevated Nigerian music on the world stage.",
    image: "/images/david-image.png",
    date: "November 10, 2024",
    category: "Album Review",
    author: "The Debut Hub",
    slug: "wizkid-made-in-lagos-anniversary",
    content: "Three years after its release, 'Made in Lagos' continues to resonate as a defining moment in Afrobeats history. Wizkid's masterful curation of sounds, collaborators, and cultural references created an album that transcended geographical boundaries."
  },
  {
    id: 7,
    title: "Rema's Rave & Roses World Tour: A Global Phenomenon",
    excerpt: "The Mavin Records star continues to break barriers with sold-out shows across multiple continents.",
    image: "/images/david-image.png",
    date: "November 9, 2024",
    category: "Tour",
    author: "The Debut Hub",
    slug: "rema-rave-roses-world-tour",
    content: "Rema's Rave & Roses World Tour has established the young artist as a global superstar, with sold-out venues from London to Los Angeles proving that Afrobeats has truly become a worldwide phenomenon."
  },
  {
    id: 8,
    title: "Davido's Timeless Album: Breaking Streaming Records",
    excerpt: "The OBO's latest project shatters multiple streaming milestones within its first week of release.",
    image: "/images/david-image.png",
    date: "November 8, 2024",
    category: "Album Review",
    author: "The Debut Hub",
    slug: "davido-timeless-streaming-records",
    content: "Davido's 'Timeless' album has shattered streaming records across multiple platforms, demonstrating the increasing global appetite for authentic Afrobeats music and cementing the artist's position as one of Africa's most influential musicians."
  },
  {
    id: 9,
    title: "Ayra Starr: The New Voice of Afrobeats",
    excerpt: "Mavin's rising star discusses her journey, influences, and what's next for her groundbreaking career.",
    image: "/images/david-image.png",
    date: "November 7, 2024",
    category: "Interview",
    author: "The Debut Hub",
    slug: "ayra-starr-new-voice-afrobeats",
    content: "Ayra Starr represents the new generation of Afrobeats artists who are pushing creative boundaries while honoring the genre's rich traditions. Her unique voice and fearless approach to music-making have quickly established her as one of the most exciting talents in contemporary African music."
  },
  {
    id: 10,
    title: "Fireboy DML's Evolution: From Laughter, Tears & Goosebumps to Apollo",
    excerpt: "Tracing the artistic growth of one of Nigeria's most consistent hitmakers across his discography.",
    image: "/images/david-image.png",
    date: "November 6, 2024",
    category: "Artist Profile",
    author: "The Debut Hub",
    slug: "fireboy-dml-artistic-evolution",
    content: "Fireboy DML's artistic journey from 'Laughter, Tears & Goosebumps' to 'Apollo' showcases remarkable growth and maturity. His evolution as a songwriter and performer reflects the broader development of Afrobeats as a sophisticated musical genre."
  },
  {
    id: 11,
    title: "Omah Lay's Boy Alone Tour: Vulnerability and Artistry",
    excerpt: "The Port Harcourt native brings raw emotion and stellar production to stages worldwide.",
    image: "/images/david-image.png",
    date: "November 5, 2024",
    category: "Tour",
    author: "The Debut Hub",
    slug: "omah-lay-boy-alone-tour",
    content: "Omah Lay's Boy Alone Tour represents a masterclass in emotional vulnerability translated through music. The Port Harcourt native's ability to connect with audiences across different cultures speaks to the universal language of authentic artistry."
  },
  {
    id: 12,
    title: "The Producer's Corner: Spotlight on Telz and His Hit-Making Formula",
    excerpt: "An exclusive interview with the producer behind some of Afrobeats' biggest anthems.",
    image: "/images/david-image.png",
    date: "November 4, 2024",
    category: "Producer Spotlight",
    author: "The Debut Hub",
    slug: "telz-producer-spotlight",
    content: "Producer Telz has quietly become one of the most sought-after beat makers in Afrobeats, crafting sonic landscapes that have defined countless hits. His approach to production combines traditional African rhythms with contemporary global sounds."
  },
  {
    id: 13,
    title: "Asake's Mr. Money With The Vibe: Redefining Afrofusion",
    excerpt: "How the YBNL signee is blending traditional Yoruba sounds with contemporary Afrobeats.",
    image: "/images/david-image.png",
    date: "November 3, 2024",
    category: "Album Review",
    author: "The Debut Hub",
    slug: "asake-mr-money-afrofusion",
    content: "Asake's 'Mr. Money With The Vibe' represents a bold fusion of traditional Yoruba musical elements with contemporary Afrobeats production. The YBNL signee has carved out a unique sonic space that honors his cultural roots while appealing to global audiences."
  },
  {
    id: 14,
    title: "Women in Afrobeats: Celebrating Female Pioneers and Rising Stars",
    excerpt: "From Tiwa Savage to Tems, exploring the powerful women shaping the genre's future.",
    image: "/images/david-image.png",
    date: "November 2, 2024",
    category: "Music Industry",
    author: "The Debut Hub",
    slug: "women-in-afrobeats-pioneers",
    content: "The women of Afrobeats have been instrumental in shaping the genre's global appeal and artistic direction. From pioneers like Tiwa Savage to new voices like Tems and Ayra Starr, female artists continue to push creative boundaries and challenge industry norms."
  },
  {
    id: 15,
    title: "The Global Impact of Nigerian Music: From Lagos to the World",
    excerpt: "How Nigerian artists are influencing global music trends and collaborating with international superstars.",
    image: "/images/david-image.png",
    date: "November 1, 2024",
    category: "Music Industry",
    author: "The Debut Hub",
    slug: "nigerian-music-global-impact",
    content: "Nigerian music's global impact extends far beyond chart positions and streaming numbers. The cultural influence of Afrobeats has reshaped how the world perceives African creativity, leading to meaningful collaborations and cross-cultural musical exchanges."
  }
];

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    
    // Find article by slug
    const article = articlesData.find(article => article.slug === slug);
    
    if (!article) {
      return NextResponse.json(
        {
          success: false,
          error: 'Article not found'
        },
        { status: 404 }
      );
    }

    // Add cache-busting headers
    const response = NextResponse.json({
      success: true,
      article,
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
        error: 'Failed to fetch article'
      },
      { status: 500 }
    );
  }
}
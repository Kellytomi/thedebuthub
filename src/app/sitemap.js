export default function sitemap() {
  const baseUrl = 'https://thedebuthub.com';
  const now = new Date();
  
  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/api/spotify/albums/most-streamed`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/api/spotify/tracks`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];
} 
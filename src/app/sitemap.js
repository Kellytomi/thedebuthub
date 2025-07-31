export default function sitemap() {
  const baseUrl = 'https://thedebuthub.com';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];
} 
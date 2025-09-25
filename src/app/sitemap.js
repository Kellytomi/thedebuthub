export default function sitemap() {
  const baseUrl = 'https://thedebuthub.com';
  const now = new Date();
  
  return [
    // Main pages
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'hourly', // Changed to hourly since we have 3-minute data refresh
      priority: 1.0,
    },
    // Articles section
    {
      url: `${baseUrl}/articles`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    // Note: Individual article pages would need to be dynamically generated
    // from your CMS/database. For now, search engines will discover them
    // through internal links from the articles index page.
    
    // Admin pages (excluded from indexing via robots meta tag)
    // Not including /admin and /studio as they should not be indexed
  ];
}

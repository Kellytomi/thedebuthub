export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        allow: ['/articles/', '/articles/*'], // Explicitly allow articles
        disallow: ['/api/', '/admin/', '/studio/', '/_next/', '/.*'],
        crawlDelay: 1, // Be nice to servers
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        allow: ['/articles/', '/articles/*'], // Explicitly allow articles for Google
        disallow: ['/api/', '/admin/', '/studio/'],
        // No crawl delay for Google - they're efficient
      },
    ],
    sitemap: 'https://thedebuthub.com/sitemap.xml',
    host: 'https://thedebuthub.com',
  };
}

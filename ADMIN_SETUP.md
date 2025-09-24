# Sanity Admin Setup

## Overview
The Sanity Studio is now accessible at two routes:
- `/admin` - Primary admin route (configured as basePath)
- `/studio` - Alternative studio route (legacy support)

## Access the Admin Panel
1. Make sure your development server is running: `npm run dev`
2. Navigate to `http://localhost:3000/admin`
3. Sign in with your Sanity account credentials

## Configuration Files

### sanity.config.ts
- Main configuration file for Sanity Studio
- Defines the project ID, dataset, and plugins
- Sets the basePath to `/admin` for the default config

### Admin Route Structure
```
src/app/admin/
├── layout.tsx          # Admin layout (ensures proper styling)
└── [[...tool]]/       # Catch-all route for Sanity Studio tools
    └── page.tsx       # Main admin page component
```

## Environment Variables
Ensure these are set in your `.env.local` file:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
```

## Features Available
- **Structure Tool**: Manage your content structure
- **Vision Tool**: Query your data with GROQ
- **Code Input**: Add code blocks to your content

## Schema Types
Currently configured with:
- **Article**: Blog/news articles with full content management

## Notes
- The admin panel requires authentication with Sanity
- Both `/admin` and `/studio` routes serve the same Sanity Studio interface
- Each route has its own basePath configured to prevent routing conflicts
- The studio is configured to work with Next.js 15 and the App Router

## Troubleshooting

### "Tool not found" Error
If you see a "Tool not found: admin" error, ensure that:
1. The basePath is correctly set in each route's page component
2. The development server has been restarted after changes
3. Clear your browser cache and try again

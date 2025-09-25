# 🎯 Sanity CMS Setup Guide for The Debut Hub

This guide will help you set up Sanity CMS for managing articles in your The Debut Hub project.

## 🚀 Quick Setup

### 1. **Create Sanity Project**

1. Go to [sanity.io](https://sanity.io) and sign up/login
2. Click "Create new project"
3. Choose "Blog" template or start from scratch
4. Note down your **Project ID** and **Dataset** name

### 2. **Configure Environment Variables**

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your Sanity credentials:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token_here
   ```

### 3. **Get API Token (Optional)**

For write operations (if you plan to create articles programmatically):

1. Go to your Sanity project dashboard
2. Navigate to **API** → **Tokens**
3. Create a new token with **Editor** permissions
4. Add it to your `.env.local` file

### 4. **Run Sanity Studio**

Start the Sanity Studio for content management:

```bash
npm run studio
```

This will open Sanity Studio at `http://localhost:3333`

### 5. **Deploy Studio (Optional)**

Deploy your studio to Sanity's hosting:

```bash
npm run deploy-studio
```

## 📝 Creating Your First Article

1. Open Sanity Studio (`npm run studio`)
2. Click "Create" → "Article"
3. Fill in the required fields:
   - **Title**: Your article title
   - **Slug**: Auto-generated from title (or customize)
   - **Excerpt**: Brief description
   - **Body**: Rich content with text, images, code blocks
   - **Main Image**: Featured image
   - **Category**: Select from dropdown
   - **Author**: Author name
   - **Published At**: Publication date
   - **Featured**: Mark as featured article
   - **Tags**: Add relevant tags

## 🎨 Rich Content Features

Your Sanity articles support:

- **Rich Text**: Headers, paragraphs, lists, quotes
- **Images**: With alt text and captions
- **Code Blocks**: Syntax highlighting
- **Links**: External links with proper attributes
- **SEO**: Meta titles and descriptions

## 🔧 API Integration

The project automatically fetches articles from Sanity via:

- `GET /api/articles` - All articles
- `GET /api/articles/[slug]` - Single article
- `GET /api/articles?category=Category` - Filtered by category

## 🛠️ Development Commands

```bash
# Start Next.js development server
npm run dev

# Start Sanity Studio
npm run studio

# Build for production
npm run build

# Deploy Sanity Studio
npm run deploy-studio
```

## 📁 File Structure

```
src/
├── lib/sanity/
│   ├── config.ts          # Sanity client configuration
│   └── api.ts             # API functions
├── components/features/articles/
│   └── SanityContent.tsx  # Rich content renderer
├── app/
│   ├── api/articles/      # API routes
│   └── studio/            # Sanity Studio
└── types/
    └── index.ts           # TypeScript definitions

sanity/
├── schemas/
│   ├── article.ts         # Article schema
│   └── index.ts           # Schema exports
└── sanity.config.ts       # Sanity configuration
```

## 🎯 Next Steps

1. **Create Content**: Add your first articles in Sanity Studio
2. **Customize Schema**: Modify `sanity/schemas/article.ts` for your needs
3. **Style Content**: Update `SanityContent.tsx` for custom styling
4. **Add Features**: Implement search, filtering, or pagination

## 🆘 Troubleshooting

### Common Issues:

1. **"Project not found"**: Check your Project ID in `.env.local`
2. **"Dataset not found"**: Verify dataset name (usually "production")
3. **Images not loading**: Ensure image URLs are properly generated
4. **Studio not loading**: Check if port 3333 is available

### Getting Help:

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs-app-router-live-preview)
- [Portable Text Guide](https://www.sanity.io/docs/presenting-block-text)

## 🎉 You're All Set!

Your Sanity CMS is now integrated with The Debut Hub. Start creating amazing articles! 🚀

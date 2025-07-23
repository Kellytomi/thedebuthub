# The Debut Hub 🎵

**The Debut Hub** is a modern music discovery platform built with Next.js, showcasing the latest Nigerian music through real-time Spotify Web API integration. Discover top Nigerian albums, trending songs, and immerse yourself in the vibrant Nigerian music scene.

![The Debut Hub](public/images/The%20Debut%20Hub.png)

## 🌟 Features

### 🎵 **Dynamic Music Discovery**
- **Top 3 Nigerian Albums**: Real-time fetching from Spotify Web API
- **Top Songs This Week**: Popular Nigerian tracks with diversity algorithm
- **Smart Diversity**: Ensures one album/track per artist for varied representation
- **Popularity-Based Ranking**: Tracks ranked by Spotify's popularity scores

### 🎨 **Modern UI/UX**
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Hover Effects**: Smooth animations and transitions
- **Loading States**: Elegant skeleton loaders during data fetching
- **Error Handling**: Graceful fallbacks when APIs are unavailable
- **WCAG Compliant**: Accessible design with proper ARIA labels

### 🔄 **Real-time Integration**
- **Spotify Web API**: Live data from the world's largest music platform
- **Auto-updating Content**: Fresh music data on every page load
- **High-Quality Images**: Optimized album covers from Spotify's CDN
- **Direct Spotify Links**: One-click access to full tracks and albums

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 14+** - React framework with App Router
- **React 18** - Component-based UI library
- **Tailwind CSS** - Utility-first CSS framework
- **next/image** - Optimized image loading

### **Backend**
- **Next.js API Routes** - Serverless API endpoints
- **Spotify Web API** - Music data and metadata
- **Client Credentials Flow** - Secure API authentication

### **Development**
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **npm** - Package management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Spotify Developer Account (for live data)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/thedebuthub.git
cd thedebuthub
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Setup Spotify API (Required)

To display real Nigerian albums and tracks, you need Spotify Web API credentials:

1. **Create Spotify App**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Log in with your Spotify account
   - Click **"Create app"**

2. **Configure App Settings**
   - **App name**: "The Debut Hub" (or your preferred name)
   - **App description**: "Music discovery platform"
   - **Website**: `http://localhost:3000` (for development)
   - **Redirect URI**: `http://localhost:3000`
   - **APIs**: Select "Web API"

3. **Get Credentials**
   - Copy the **Client ID** and **Client Secret** from your app dashboard

4. **Create Environment File**
   ```bash
   # Create .env.local in project root
   touch .env.local
   ```

5. **Add Credentials**
   ```env
   SPOTIFY_CLIENT_ID=your_client_id_here
   SPOTIFY_CLIENT_SECRET=your_client_secret_here
   ```

### 4. Run Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
thedebuthub/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API Routes
│   │   │   └── spotify/              # Spotify API endpoints
│   │   │       ├── albums/           # Nigerian albums endpoint
│   │   │       └── tracks/           # Nigerian tracks endpoint
│   │   ├── components/               # React Components
│   │   │   ├── AlbumCard.js          # Album/track display card
│   │   │   ├── TopAlbumsSection.js   # Top 3 Nigerian albums
│   │   │   ├── OurStorySection.js    # Top songs this week
│   │   │   ├── HeroSection.js        # Landing hero section
│   │   │   ├── MusicPulseSection.js  # Music pulse animation
│   │   │   └── ...                   # Other UI components
│   │   ├── globals.css               # Global styles
│   │   ├── layout.js                 # Root layout
│   │   └── page.js                   # Home page
│   ├── components/ui/                # Reusable UI components
│   └── lib/                          # Utility libraries
│       ├── spotify.js                # Spotify API integration
│       ├── constants.js              # App constants
│       └── utils.ts                  # Helper utilities
├── public/                           # Static assets
│   └── images/                       # Album covers and assets
├── next.config.mjs                   # Next.js configuration
├── tailwind.config.js                # Tailwind CSS config
└── package.json                      # Dependencies
```

## 🔌 API Documentation

### Spotify Integration

#### **GET** `/api/spotify/albums`
Fetches top 3 Nigerian albums with artist diversity.

**Query Parameters:**
- `limit` (optional): Number of albums to return (default: 3)

**Response:**
```json
{
  "success": true,
  "albums": [
    {
      "id": "album_id",
      "name": "Album Name",
      "artist": "Artist Name", 
      "image": "https://i.scdn.co/image/...",
      "total_tracks": 12,
      "release_date": "2024-01-01",
      "external_urls": {
        "spotify": "https://open.spotify.com/album/..."
      }
    }
  ],
  "count": 3
}
```

#### **GET** `/api/spotify/tracks`
Fetches top Nigerian tracks sorted by popularity.

**Query Parameters:**
- `limit` (optional): Number of tracks to return (default: 3)

**Response:**
```json
{
  "success": true,
  "tracks": [
    {
      "id": "track_id",
      "name": "Track Name",
      "artist": "Artist Name",
      "image": "https://i.scdn.co/image/...",
      "duration": "3:45",
      "popularity": 81,
      "preview_url": "https://...",
      "external_urls": {
        "spotify": "https://open.spotify.com/track/..."
      },
      "album": "Album Name"
    }
  ],
  "count": 3
}
```

### Algorithm Features

#### **Diversity Algorithm**
- Ensures one album/track per artist
- Uses `Map` and `Set` data structures for deduplication
- Prioritizes popular content while maintaining variety

#### **Multi-Strategy Search**
1. **Artist-Specific**: Search major Nigerian artists individually
2. **Genre-Based**: Search Afrobeats and related genres
3. **Market-Specific**: Filter for Nigerian market (NG)

#### **Popularity Ranking**
- Sorts by Spotify's popularity score (0-100)
- Higher scores indicate more popular tracks
- Considers plays, saves, and engagement metrics

## 🎨 Styling Guide

### **Design System**
- **Color Scheme**: Dark theme with accent colors
- **Typography**: Dancing Script for headings, system fonts for body
- **Spacing**: Consistent Tailwind spacing scale
- **Responsive**: Mobile-first breakpoints

### **Component Patterns**
- **Loading States**: Skeleton loaders with pulse animation
- **Hover Effects**: Scale transforms and opacity transitions
- **Error States**: User-friendly error messages with fallback data
- **Image Optimization**: Next.js Image component with fallback handling

### **Accessibility**
- **ARIA Labels**: Descriptive labels for screen readers
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Keyboard Navigation**: Full keyboard accessibility
- **Semantic HTML**: Proper heading hierarchy and landmarks

## 🚀 Deployment

### **Vercel (Recommended)**
1. **Connect Repository**
   ```bash
   # Push to GitHub/GitLab
   git push origin main
   ```

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables in Vercel dashboard:
     - `SPOTIFY_CLIENT_ID`
     - `SPOTIFY_CLIENT_SECRET`

3. **Configure Domains**
   - Set up custom domain if desired
   - Update Spotify app settings with production URLs

### **Other Platforms**
- **Netlify**: Similar process with environment variables
- **Railway**: Direct Git deployment
- **DigitalOcean**: Static site hosting

## 🛠️ Development

### **Code Standards**
- **ESLint**: Enforced code formatting and best practices
- **Component Structure**: Functional components with hooks
- **File Naming**: PascalCase for components, kebab-case for utilities
- **Import Organization**: External imports first, then internal

### **Performance Optimizations**
- **Image Optimization**: Next.js Image component with remote patterns
- **Code Splitting**: Automatic with Next.js App Router
- **Caching**: Spotify API token caching for reduced requests
- **Loading States**: Prevent layout shifts with skeleton loaders

### **Error Handling**
- **API Failures**: Graceful fallback to static data
- **Image Errors**: Automatic fallback to local images
- **Network Issues**: User-friendly error messages
- **Development**: Detailed error logging for debugging

## 🔧 Environment Variables

Create a `.env.local` file in the project root:

```env
# Spotify Web API (Required)
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# Optional: Custom API endpoints
# CUSTOM_API_URL=https://your-api.com
```

## 📊 Features in Detail

### **Top Nigerian Albums Section**
- Fetches latest albums from major Nigerian artists
- Displays album cover, name, and artist
- Direct links to Spotify for full listening experience
- White border styling matching design system
- Hover effects with smooth transitions

### **Top Songs This Week Section**
- Shows most popular Nigerian tracks by Spotify metrics
- Popularity-based ranking (81, 75, 74 scores)
- Artist diversity ensuring different musicians
- Album metadata and track duration
- Clickable cards linking to Spotify

### **Loading & Error States**
- Skeleton loaders during API calls
- Fallback data when Spotify API unavailable
- Error messages with helpful context
- Consistent styling between loading and loaded states

## 🤝 Contributing

### **Development Workflow**
1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Make changes**: Follow code standards and patterns
4. **Test locally**: Ensure all features work properly
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open Pull Request**: Describe changes and add screenshots

### **Code Guidelines**
- Follow existing component patterns
- Add proper PropTypes or TypeScript types
- Include loading and error states for new features
- Test on mobile and desktop breakpoints
- Update documentation for new APIs or features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Spotify Web API** for providing comprehensive music data
- **Next.js Team** for the excellent React framework
- **Tailwind CSS** for the utility-first CSS framework
- **Nigerian Music Industry** for the incredible music that powers this platform

## 📞 Support

If you encounter any issues or have questions:

1. **Check the documentation** above for common solutions
2. **Search existing issues** in the GitHub repository
3. **Create a new issue** with detailed description and steps to reproduce
4. **Contact the maintainers** for urgent issues

---

**Built with ❤️ for the Nigerian music community**

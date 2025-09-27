# The Debut Hub 🎵

**The Debut Hub** is a modern music discovery platform built with Next.js, showcasing the latest Nigerian music through real-time Spotify Web API integration. Discover top Nigerian albums, trending songs, and immerse yourself in the vibrant Nigerian music scene.

![The Debut Hub](public/images/The%20Debut%20Hub-black.png)

## 🌟 Features

### 🎵 **Dynamic Music Discovery**
- **Top Albums of the Week**: Real-time Nigerian chart-toppers from Spotify
- **Top Nigerian Tracks**: Current week's trending songs with chart positions
- **#1 Artist Spotlight**: Featured artist with actual Spotify profile image
- **Smart Album Ranking**: Albums ranked by chart presence (multiple hit tracks)
- **Auto-Refresh**: All sections update every 3 minutes with fresh data

### 🎨 **Modern UI/UX**
- **Responsive Design**: Mobile-first approach with Tailwind CSS v4
- **Chart Position Badges**: Visual #1, #2, #3 rankings on albums and tracks
- **Interactive Hover Effects**: Smooth animations with Framer Motion
- **Loading States**: Elegant skeleton loaders during data fetching
- **Error Handling**: Graceful fallbacks when APIs are unavailable
- **WCAG Compliant**: Accessible design with proper ARIA labels

### 🔄 **Real-time Integration**
- **Spotify Web API**: Live data from Nigeria's Top 100 playlist
- **3-Minute Cache Strategy**: Auto-refresh for current charts
- **Artist Profile Images**: Actual artist photos from Spotify profiles
- **High-Quality Images**: Optimized covers and artist images from Spotify CDN
- **Direct Spotify Links**: One-click access to full tracks and albums
- **tRPC Integration**: Type-safe API calls with React Query

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15.4** - React framework with App Router
- **React 19** - Latest React with improved performance
- **Tailwind CSS v4** - Modern utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **tRPC + React Query** - Type-safe API with caching
- **next/image** - Optimized image loading

### **Backend**
- **Next.js API Routes** - Serverless API endpoints
- **tRPC Router** - Type-safe API layer
- **Spotify Web API** - Music data with Nigerian market focus
- **Client Credentials Flow** - Secure API authentication
- **Intelligent Caching** - 3-minute stale time for fresh data

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
│   │   │   ├── trpc/                 # tRPC endpoint
│   │   │   └── articles/             # Articles API
│   │   ├── layout.js                 # Root layout
│   │   ├── page.js                   # Home page
│   │   └── sitemap.js                # SEO sitemap
│   ├── components/
│   │   ├── sections/                 # Page sections
│   │   │   ├── TopAlbumsSection.tsx  # Top albums with chart positions
│   │   │   ├── TopTrackSection.tsx   # Top tracks with rankings
│   │   │   ├── CoverStorySection.tsx # #1 Artist spotlight
│   │   │   ├── HeroSection.tsx       # Landing hero with artist carousel
│   │   │   └── ...                   # Other sections
│   │   └── ui/                       # Reusable UI components
│   ├── lib/
│   │   ├── api/
│   │   │   └── spotify.ts            # Spotify API integration
│   │   ├── routers/
│   │   │   └── spotify.js            # tRPC router for Spotify
│   │   ├── trpc.js                   # tRPC configuration
│   │   └── trpc-client.ts            # tRPC client setup
│   └── types/                        # TypeScript types
├── docs/                             # Documentation
├── scripts/                          # Build and test scripts
├── public/                           # Static assets
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

#### **Smart Album Ranking**
- Albums ranked by chart presence (tracks in top 100)
- More charting tracks = higher album rank
- Frequency-based sorting for accurate weekly charts

#### **Artist Profile Fetching**
- Fetches actual artist profile images from Spotify
- Separate API call to get artist data (not album art)
- Fallback to album image if profile unavailable

#### **Auto-Refresh Strategy**
- 3-minute cache duration (staleTime)
- Automatic background refetch
- Seamless data updates without page reload

#### **Playlist Sources**
- Primary: Top 100 Nigeria (`6nvDix6ABiGTqZghg4qaHs`)
- Fallback: Multiple Nigerian playlists
- Smart playlist discovery algorithm

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

### **Top Albums of the Week Section**
- Displays top 3 albums from current Nigerian charts
- Chart position badges (#1, #2, #3)
- Albums ranked by number of tracks charting
- Real-time data from Nigeria's Top 100 playlist
- Auto-refreshes every 3 minutes
- Direct Spotify links for each album

### **Top Nigerian Tracks Section**
- Current week's top 3 tracks from charts
- Visual chart position indicators
- Track duration and album information
- Play button overlay on hover
- Auto-updates every 3 minutes
- Direct Spotify links for streaming

### **#1 Artist Spotlight (Cover Story)**
- Features the current #1 artist from charts
- Displays actual Spotify profile image (not album art)
- Dynamic story generation about the artist
- Chart position and follower count display
- Auto-refreshes with latest chart data

### **Loading & Error States**
- Skeleton loaders during API calls
- Graceful fallback data when Spotify API unavailable
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

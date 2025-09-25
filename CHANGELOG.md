# Changelog

All notable changes to The Debut Hub project will be documented in this file.

## [Unreleased] - 2025-09-25

### 🎯 Major Features
- **Top Albums of the Week**: Transformed album section to show current weekly chart-toppers
- **#1 Artist Profile Images**: Now displays actual Spotify profile pictures instead of album artwork
- **Auto-Refresh System**: All music sections update every 3 minutes with fresh chart data
- **Chart Position Badges**: Added visual #1, #2, #3 rankings to albums and tracks

### ✨ Enhancements
- **Smart Album Ranking**: Albums now ranked by number of tracks in the Top 100 chart
- **Real Artist Images**: Added `getTopChartArtist` function to fetch actual artist profile photos
- **Improved Cache Strategy**: Reduced cache time from 5 to 3 minutes for fresher data
- **Removed Popularity Scores**: Cleaner UI by removing numerical popularity displays

### 🛠 Technical Improvements
- **tRPC Integration**: Type-safe API calls with React Query v5
- **Spotify API Enhancements**:
  - Added artist profile fetching capability
  - Improved playlist discovery algorithm
  - Better fallback strategies for API failures
- **Code Organization**:
  - Moved test scripts to `scripts/tests/`
  - Organized documentation in `docs/` folder
  - Cleaned up root directory structure

### 🐛 Bug Fixes
- Fixed React Query v5 compatibility issues (removed unsupported `onSuccess` callbacks)
- Corrected TypeScript errors in TopAlbumsSection and TopTrackSection
- Fixed duplicate chart data fetching

### 📦 Dependencies
- Using Next.js 15.4 with React 19
- Tailwind CSS v4 for styling
- Framer Motion for animations
- tRPC with React Query for data fetching

### 🔄 Data Sources
- Primary: Nigeria's Top 100 playlist (`6nvDix6ABiGTqZghg4qaHs`)
- Smart fallback to alternative Nigerian playlists
- Real-time updates from Spotify Web API

## [1.0.0] - 2024-07-01

### Initial Release
- Basic album and track display from Spotify
- Static data fallbacks
- Responsive design with Tailwind CSS
- Next.js 14 App Router implementation
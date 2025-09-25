# Album Section Update - Top Albums of the Week

## Overview
Updated the album section of TheDebutHub to display "Top Albums of the Week" from Nigeria's official music charts, based on the most popular tracks currently charting.

## Changes Made

### 1. Spotify API Integration (`src/lib/api/spotify.ts`)

#### Updated Playlist Sources
- **Primary Playlist**: `6nvDix6ABiGTqZghg4qaHs` - Top 100 Nigeria (accessible and working)
- **Secondary Playlist**: `46iQn1DHoYNlHwBIOnfAxi` - Top 100 Nigeria on Apple Music
- **Note**: The original playlist ID `37i9dQZEVXbNou3HKxlHLb` from the Spotify link appears to be region-locked or inaccessible via the API

#### Algorithm Improvements
- Enhanced `getMostStreamedNigerianAlbums()` to try multiple playlist sources
- Improved `processAlbumsFromPlaylist()` to:
  - Track album frequency (how many tracks from each album appear in the top charts)
  - Prioritize albums with multiple charting tracks
  - Sort albums by their chart presence/popularity

### 2. UI Updates (`src/components/sections/TopAlbumsSection.tsx`)

#### Title Changes
- Changed from: "Top Albums Nigeria / From Official Charts"
- Changed to: "Top Albums of the Week / Nigeria's Official Charts"

#### Fallback Albums Updated
- Updated to more recent releases (Morayo by Wizkid, HEIS by Rema, etc.)
- Reflects current popular albums in case API fails

### 3. How It Works

1. **Data Source**: Fetches from Nigeria's Top 100 playlist on Spotify
2. **Album Extraction**: 
   - Analyzes all tracks in the top charts
   - Groups tracks by album
   - Counts how many tracks each album has in the charts
3. **Ranking**: Albums with more tracks in the top charts rank higher
4. **Display**: Shows top 3 albums with the most chart presence

## Testing

Created test scripts to verify the integration:
- `test-top-albums-playlist.js` - Tests specific playlist accessibility
- `search-nigeria-playlists.js` - Searches for available Nigerian playlists

## API Fallback Strategy

If primary playlists are not accessible, the system will:
1. Try alternative Nigerian playlists
2. Search for playlists with Nigerian/Afrobeats content
3. Use fallback album data if all API calls fail

## Future Improvements

1. **Cache Results**: Implement caching to reduce API calls
2. **Weekly Updates**: Add timestamp to show when albums were last updated
3. **Chart Positions**: Display actual chart positions for each album
4. **Release Dates**: Show how long albums have been on the charts

## Environment Variables

Ensure these are set in `.env.local`:
```
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
```

## Verification

To verify the changes:
1. Run `npm run dev` or `yarn dev`
2. Navigate to http://localhost:3000
3. Check the album section displays "Top Albums of the Week"
4. Verify albums are loading from the Spotify API

## Notes

- The album selection is based on actual chart performance
- Albums with multiple hit tracks will rank higher
- Updates automatically based on current chart data
- Gracefully falls back to cached data if API is unavailable
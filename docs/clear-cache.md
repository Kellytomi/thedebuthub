# Cache Clearing Instructions

The image loading errors you're experiencing are due to browser caching of old image references. Here's how to fix them:

## Quick Fix (Recommended)
1. **Hard Refresh**: Press `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows/Linux)
2. **Clear Browser Cache**: Go to Developer Tools → Application → Clear Storage → Clear All

## Alternative Methods
- **Chrome**: Right-click → Inspect → Network tab → Check "Disable cache" → Refresh
- **Firefox**: `Cmd/Ctrl + Shift + Delete` → Clear Everything
- **Safari**: Develop menu → Empty Caches

## What We Fixed
- ✅ Removed all `.jpg` image references from the codebase
- ✅ All articles now use `/images/david-image.png` exclusively
- ✅ Added aggressive cache-busting to the API
- ✅ Improved error handling to prevent console noise
- ✅ Cleared Next.js build cache (`.next` folder)
- ✅ Restarted development server on port 3003

## Verification
After clearing your browser cache, visit: http://localhost:3003/articles
- All images should load correctly
- No console errors should appear
- All articles should display the same placeholder image

## Technical Details
The errors were happening because:
1. Browser cached old image paths (`article-1.jpg`, `article-2.jpg`, etc.)
2. These images never existed in the `/public/images/` directory
3. The Image component's `onError` handler was trying to log errors

Now all articles use a single, existing image file that loads reliably.
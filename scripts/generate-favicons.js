const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  const inputPath = path.join(__dirname, '..', 'public', 'images', 'The Debut Hub-black.png');
  const outputDir = path.join(__dirname, '..', 'public');

  console.log('🎨 Generating favicons from The Debut Hub black logo...');

  try {
    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
      throw new Error('The Debut Hub-black.png not found in public/images folder');
    }

    // Create different favicon sizes
    const sizes = [
      { size: 16, name: 'favicon-16x16.png' },
      { size: 32, name: 'favicon-32x32.png' },
      { size: 48, name: 'favicon-48x48.png' },
      { size: 96, name: 'favicon-96x96.png' },
      { size: 192, name: 'android-chrome-192x192.png' },
      { size: 512, name: 'android-chrome-512x512.png' },
      { size: 180, name: 'apple-touch-icon.png' },
    ];

    // Generate PNG favicons
    for (const { size, name } of sizes) {
      await sharp(inputPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 1 } // Black background for better visibility
        })
        .png()
        .toFile(path.join(outputDir, name));
      
      console.log(`✅ Generated ${name} (${size}x${size})`);
    }

    // Generate ICO file (traditional favicon)
    await sharp(inputPath)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 1 } // Black background for better visibility
      })
      .png()
      .toFile(path.join(outputDir, 'favicon-temp.png'));

    // Convert PNG to ICO format
    await sharp(path.join(outputDir, 'favicon-temp.png'))
      .toFormat('png')
      .toFile(path.join(outputDir, 'favicon.ico'));

    // Clean up temporary file
    fs.unlinkSync(path.join(outputDir, 'favicon-temp.png'));

    console.log('✅ Generated favicon.ico');

    // Generate site.webmanifest
    const manifest = {
      name: "The Debut Hub",
      short_name: "TDH",
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ],
      theme_color: "#006dff",
      background_color: "#040507",
      display: "standalone"
    };

    fs.writeFileSync(
      path.join(outputDir, 'site.webmanifest'),
      JSON.stringify(manifest, null, 2)
    );

    console.log('✅ Generated site.webmanifest');
    console.log('🎉 All favicons generated successfully!');
    console.log('\n📁 Generated files:');
    console.log('   • favicon.ico');
    console.log('   • favicon-16x16.png');
    console.log('   • favicon-32x32.png');
    console.log('   • apple-touch-icon.png');
    console.log('   • android-chrome-192x192.png');
    console.log('   • android-chrome-512x512.png');
    console.log('   • site.webmanifest');

  } catch (error) {
    console.error('❌ Error generating favicons:', error.message);
    process.exit(1);
  }
}

generateFavicons(); 
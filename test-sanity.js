// Quick test script to verify Sanity integration
import { client } from './src/lib/sanity/config.js';

async function testSanity() {
  try {
    console.log('🔍 Testing Sanity connection...');
    
    // Test basic connection
    const result = await client.fetch('*[_type == "article"][0...3]');
    console.log('✅ Sanity connection successful!');
    console.log(`📄 Found ${result.length} articles`);
    
    if (result.length > 0) {
      console.log('📝 Sample article:', result[0].title);
    } else {
      console.log('ℹ️  No articles found yet. Create one in Sanity Studio!');
    }
    
  } catch (error) {
    console.error('❌ Sanity connection failed:', error.message);
  }
}

testSanity();

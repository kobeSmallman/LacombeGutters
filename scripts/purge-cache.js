#!/usr/bin/env node

/**
 * Cache Purge Script for Vercel Deployment
 * Run this after deployment to ensure all pages are refreshed
 */

const https = require('https');

const CRITICAL_URLS = [
  'https://www.lacombeguttersltd.com/',
  'https://www.lacombeguttersltd.com/services',
  'https://www.lacombeguttersltd.com/service-areas',
  'https://www.lacombeguttersltd.com/service-areas/beaumont',
  'https://www.lacombeguttersltd.com/service-areas/stony-plain',
  'https://www.lacombeguttersltd.com/service-areas/morinville',
  'https://www.lacombeguttersltd.com/sitemap.xml',
  'https://www.lacombeguttersltd.com/robots.txt',
];

console.log('🔄 Starting cache purge for critical URLs...\n');

async function purgeUrl(url) {
  return new Promise((resolve) => {
    console.log(`Purging: ${url}`);
    
    https.get(url, { 
      headers: { 
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    }, (res) => {
      console.log(`✅ ${url} - Status: ${res.statusCode}`);
      resolve();
    }).on('error', (err) => {
      console.error(`❌ Failed to purge ${url}: ${err.message}`);
      resolve();
    });
  });
}

async function purgeAll() {
  for (const url of CRITICAL_URLS) {
    await purgeUrl(url);
    // Wait 500ms between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n✨ Cache purge complete!');
  console.log('📝 Next steps:');
  console.log('1. Go to Google Search Console');
  console.log('2. Use URL Inspection tool on the URLs above');
  console.log('3. Click "Request indexing" for each');
}

purgeAll();
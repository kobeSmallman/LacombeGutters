#!/usr/bin/env node

/**
 * SEO Verification Script
 * Checks if pages have correct robots meta tags after deployment
 */

const https = require('https');

const PAGES_TO_CHECK = [
  // P2 cities that SHOULD be indexed
  { url: 'https://www.lacombeguttersltd.com/service-areas/beaumont', shouldIndex: true },
  { url: 'https://www.lacombeguttersltd.com/service-areas/stony-plain', shouldIndex: true },
  { url: 'https://www.lacombeguttersltd.com/service-areas/morinville', shouldIndex: true },
  
  // P3 cities that should NOT be indexed
  { url: 'https://www.lacombeguttersltd.com/service-areas/cochrane', shouldIndex: false },
  { url: 'https://www.lacombeguttersltd.com/service-areas/millet', shouldIndex: false },
  
  // Main pages that MUST be indexed
  { url: 'https://www.lacombeguttersltd.com/', shouldIndex: true },
  { url: 'https://www.lacombeguttersltd.com/services', shouldIndex: true },
];

function checkPage(pageInfo) {
  return new Promise((resolve) => {
    https.get(pageInfo.url, (res) => {
      let html = '';
      
      res.on('data', (chunk) => {
        html += chunk;
      });
      
      res.on('end', () => {
        const hasNoindex = html.includes('noindex');
        const cacheAge = res.headers['age'] || '0';
        const cacheStatus = res.headers['x-vercel-cache'] || 'MISS';
        
        const isCorrect = pageInfo.shouldIndex ? !hasNoindex : hasNoindex;
        const status = isCorrect ? '✅' : '❌';
        
        console.log(`${status} ${pageInfo.url.replace('https://www.lacombeguttersltd.com', '')}`);
        console.log(`   Should index: ${pageInfo.shouldIndex} | Has noindex: ${hasNoindex}`);
        console.log(`   Cache: ${cacheStatus} | Age: ${Math.round(cacheAge/3600)} hours`);
        
        if (!isCorrect) {
          console.log(`   ⚠️  PROBLEM: Page ${pageInfo.shouldIndex ? 'should be indexed but has noindex!' : 'should not be indexed but is missing noindex!'}`);
        }
        console.log('');
        
        resolve({ url: pageInfo.url, isCorrect, hasNoindex });
      });
    }).on('error', (err) => {
      console.error(`❌ Failed to check ${pageInfo.url}: ${err.message}`);
      resolve({ url: pageInfo.url, isCorrect: false, error: err.message });
    });
  });
}

async function verifyAll() {
  console.log('🔍 SEO Verification Report\n');
  console.log('=' .repeat(60));
  console.log('');
  
  let allCorrect = true;
  
  for (const page of PAGES_TO_CHECK) {
    const result = await checkPage(page);
    if (!result.isCorrect) allCorrect = false;
    
    // Wait between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('=' .repeat(60));
  
  if (allCorrect) {
    console.log('✅ All pages have correct indexing settings!');
  } else {
    console.log('❌ Some pages have incorrect settings.');
    console.log('\n📝 Next steps:');
    console.log('1. Check if deployment is complete');
    console.log('2. Clear Vercel cache in dashboard');
    console.log('3. Run: node scripts/purge-cache.js');
    console.log('4. Wait 5 minutes and run this script again');
  }
}

verifyAll();
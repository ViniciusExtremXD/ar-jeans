/**
 * Extracts base64-encoded JPEG images from the original HTML catalog file
 * and saves them as individual files in public/assets/products/calca-flare/
 *
 * Usage: node scripts/extract-images.cjs
 */

const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, '..', '..', 'catalogo_flare_v3 (5).html');
const outDir = path.resolve(__dirname, '..', 'public', 'assets', 'products', 'calca-flare');

console.log('Reading HTML file:', htmlPath);

if (!fs.existsSync(htmlPath)) {
  console.error('ERROR: HTML file not found at', htmlPath);
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');
console.log(`File size: ${(html.length / 1024).toFixed(0)} KB`);

// Extract all base64 JPEG data URIs by finding start markers and reading until terminator
const marker = 'data:image/jpeg;base64,';
const uniqueImages = [];
const seen = new Set();
let searchFrom = 0;

while (true) {
  const idx = html.indexOf(marker, searchFrom);
  if (idx === -1) break;

  const dataStart = idx + marker.length;
  // Find the end of the base64 string (terminated by " or ' or , followed by space/newline)
  let dataEnd = dataStart;
  while (dataEnd < html.length && /[A-Za-z0-9+\/=]/.test(html[dataEnd])) {
    dataEnd++;
  }

  const b64 = html.substring(dataStart, dataEnd);
  searchFrom = dataEnd;

  if (b64.length < 100) continue; // skip tiny fragments

  // Use middle section as fingerprint (beginning is identical ICC header across all JPEGs)
  const mid = Math.floor(b64.length / 2);
  const fingerprint = b64.length + ':' + b64.substring(mid, mid + 300);
  if (!seen.has(fingerprint)) {
    seen.add(fingerprint);
    uniqueImages.push(b64);
  }
}

console.log(`Found ${uniqueImages.length} unique images`);

// Create output directory
fs.mkdirSync(outDir, { recursive: true });

// Expected order based on HTML structure:
// First appearance: mainPhoto src and thumbnails (azul, deduped to first unique)
// Then colorData.azul.photos[0-5] (some may match thumbs, deduped)
// Then colorData.black.photos[0-5]
// After full dedup we expect ~12 unique images (6 azul + 6 black)
const labels = [
  'azul-frente',
  'azul-pose',
  'azul-lateral',
  'azul-detalhe',
  'azul-detalhe2',
  'azul-costas',
  'black-frente',
  'black-pose',
  'black-lateral',
  'black-detalhe',
  'black-detalhe2',
  'black-costas',
];

uniqueImages.forEach((b64, i) => {
  const name = labels[i] || `image-${i}`;
  const filePath = path.join(outDir, `${name}.jpg`);
  const buffer = Buffer.from(b64, 'base64');
  fs.writeFileSync(filePath, buffer);
  console.log(`  Saved: ${name}.jpg (${(buffer.length / 1024).toFixed(1)} KB)`);
});

// Create placeholder for inactive products
const placeholderDir = path.resolve(__dirname, '..', 'public', 'assets', 'products');
const placeholderPath = path.join(placeholderDir, 'placeholder.jpg');
if (!fs.existsSync(placeholderPath)) {
  // Create a tiny 1x1 gray JPEG as placeholder
  const tinyJpeg = Buffer.from(
    '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEB' +
    'AQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEB' +
    'AQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEB' +
    'AQH/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAwIEBQYHAQgJ' +
    'Cv/EABYQAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8ApsA//9k=',
    'base64'
  );
  fs.writeFileSync(placeholderPath, tinyJpeg);
  console.log('\n  Created: placeholder.jpg');
}

console.log(`\nDone! Images saved to: ${outDir}`);

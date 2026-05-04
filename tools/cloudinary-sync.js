#!/usr/bin/env node
// Maps data.js image paths to their Cloudinary public_ids by querying the
// Admin API and matching on original_filename (basename without extension).
//
// Usage:
//   CLOUDINARY_CLOUD_NAME=dqbtlzcft \
//   CLOUDINARY_API_KEY=xxx \
//   CLOUDINARY_API_SECRET=yyy \
//   node tools/cloudinary-sync.js
//
// Get API key/secret at: https://console.cloudinary.com → Settings → API Keys

const fs = require('fs');
const path = require('path');

const ENV_FILE = path.join(__dirname, '..', '.env');
if (fs.existsSync(ENV_FILE)) {
  for (const line of fs.readFileSync(ENV_FILE, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const CLOUD = process.env.CLOUDINARY_CLOUD_NAME;
const KEY = process.env.CLOUDINARY_API_KEY;
const SECRET = process.env.CLOUDINARY_API_SECRET;
const DATA_JS = path.join(__dirname, '..', 'data.js');

if (!CLOUD || !KEY || !SECRET) {
  console.error('Missing env vars: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
  process.exit(1);
}

const auth = 'Basic ' + Buffer.from(`${KEY}:${SECRET}`).toString('base64');

async function fetchAllAssets() {
  const all = [];
  let cursor = null;
  do {
    const url = new URL(`https://api.cloudinary.com/v1_1/${CLOUD}/resources/image`);
    url.searchParams.set('max_results', '500');
    if (cursor) url.searchParams.set('next_cursor', cursor);
    const res = await fetch(url, { headers: { Authorization: auth } });
    if (!res.ok) throw new Error(`Cloudinary API ${res.status}: ${await res.text()}`);
    const json = await res.json();
    all.push(...json.resources);
    cursor = json.next_cursor || null;
  } while (cursor);
  return all;
}

function basenameNoExt(p) {
  const decoded = decodeURIComponent(p);
  const last = decoded.split('/').pop();
  return last.replace(/\.[^.]+$/, '');
}

function buildIndex(assets) {
  const byOriginal = new Map();
  const byNumericPrefix = new Map();
  for (const a of assets) {
    const ref = `${a.public_id}.${a.format}`;
    if (a.original_filename) {
      const k = a.original_filename.toLowerCase();
      if (!byOriginal.has(k)) byOriginal.set(k, []);
      byOriginal.get(k).push(ref);
    }
    const num = (a.public_id.match(/^\d{4,}/) || [])[0];
    if (num) {
      if (!byNumericPrefix.has(num)) byNumericPrefix.set(num, []);
      byNumericPrefix.get(num).push(ref);
    }
  }
  return { byOriginal, byNumericPrefix };
}

function findMatch(srcPath, index) {
  const base = basenameNoExt(srcPath);
  const lower = base.toLowerCase();
  if (index.byOriginal.has(lower)) {
    const hits = index.byOriginal.get(lower);
    return { ref: hits[0], ambiguous: hits.length > 1, strategy: 'original_filename' };
  }
  const num = (base.match(/^\d{4,}/) || [])[0];
  if (num && index.byNumericPrefix.has(num)) {
    const hits = index.byNumericPrefix.get(num);
    if (hits.length === 1) return { ref: hits[0], ambiguous: false, strategy: 'numeric-prefix' };
    const baseLower = lower.replace(/[^a-z0-9]/g, '');
    const scored = hits.map(ref => {
      const idLower = ref.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]/g, '');
      let score = 0;
      for (let i = 0; i < Math.min(baseLower.length, idLower.length); i++) {
        if (baseLower[i] === idLower[i]) score++;
        else break;
      }
      return { ref, score };
    }).sort((a, b) => b.score - a.score);
    return { ref: scored[0].ref, ambiguous: true, strategy: 'numeric-prefix-fuzzy', candidates: hits };
  }
  return null;
}

async function main() {
  console.log('Fetching Cloudinary asset list...');
  const assets = await fetchAllAssets();
  console.log(`Found ${assets.length} assets on Cloudinary.`);

  const index = buildIndex(assets);

  let dataSrc = fs.readFileSync(DATA_JS, 'utf8');
  const imgPathRe = /"((?:PRODUCT%20CATEGORIES|GENERAL)\/[^"]+\.(?:jpg|jpeg|png|webp|gif))"/gi;

  let matched = 0, missed = 0, ambiguous = 0;
  const missedPaths = [];
  const ambiguousPaths = [];

  const updated = dataSrc.replace(imgPathRe, (full, srcPath) => {
    const m = findMatch(srcPath, index);
    if (!m) {
      missed++;
      missedPaths.push(srcPath);
      return full;
    }
    matched++;
    if (m.ambiguous) {
      ambiguous++;
      ambiguousPaths.push({ srcPath, picked: m.ref, candidates: m.candidates });
    }
    return `"${m.ref}"`;
  });

  fs.writeFileSync(DATA_JS, updated);

  console.log(`\n✅ Rewrote data.js`);
  console.log(`   matched:   ${matched}`);
  console.log(`   ambiguous: ${ambiguous} (picked best guess — review below)`);
  console.log(`   missed:    ${missed}`);

  if (missedPaths.length) {
    console.log('\n❌ No Cloudinary asset matched these paths:');
    for (const p of missedPaths.slice(0, 30)) console.log('   ' + p);
    if (missedPaths.length > 30) console.log(`   …and ${missedPaths.length - 30} more`);
  }
  if (ambiguousPaths.length) {
    console.log('\n⚠️  Ambiguous matches (multiple Cloudinary assets share a numeric prefix):');
    for (const a of ambiguousPaths.slice(0, 10)) {
      console.log(`   ${a.srcPath}`);
      console.log(`     picked: ${a.picked}`);
      console.log(`     candidates: ${a.candidates.join(', ')}`);
    }
  }
}

main().catch(e => { console.error(e); process.exit(1); });

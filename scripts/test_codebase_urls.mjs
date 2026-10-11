import fs from 'fs';

// Read all files and extract all YouTube URLs
const files = [
    'src/data/danceForms.ts',
    'src/components/NavarasaSection.tsx',
    'src/components/MudraSection.tsx',
    'src/components/AbhinayaSection.tsx',
    'src/App.tsx'
];

const foundUrls = [];

for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = [...content.matchAll(/https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]+/g)];
    for (const m of matches) {
        foundUrls.push({ file, url: m[0] });
    }
}

console.log(`Found ${foundUrls.length} total YouTube link references in codebase.`);

// Deduplicate URLs
const uniqueUrls = [...new Set(foundUrls.map(f => f.url))];
console.log(`Unique URLs to verify: ${uniqueUrls.length}\n`);

const results = [];

for (const url of uniqueUrls) {
    const oembed = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    try {
        const res = await fetch(oembed, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
        if (res.ok) {
            const data = await res.json();
            console.log(`✅ [200 OK] "${data.title}" by ${data.author_name}`);
            console.log(`   ${url}\n`);
            results.push({ url, status: 200, valid: true, title: data.title, author: data.author_name });
        } else {
            console.log(`❌ [FAIL ${res.status}] ${url}\n`);
            results.push({ url, status: res.status, valid: false });
        }
    } catch (e) {
        console.log(`❌ [ERROR] ${url}: ${e.message}\n`);
        results.push({ url, valid: false, error: e.message });
    }
    await new Promise(r => setTimeout(r, 150));
}

const failed = results.filter(r => !r.valid);
if (failed.length === 0) {
    console.log(`🎉 ALL ${results.length} CODEBASE YOUTUBE URLS ARE 100% VALID AND LIVE ON YOUTUBE!`);
} else {
    console.error(`⚠️ ${failed.length} URLS FAILED VALIDATION!`);
    process.exit(1);
}

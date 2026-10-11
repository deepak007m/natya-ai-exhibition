const REMAINING_TOPICS = [
    { key: 'bhangra_trad', name: 'Bhangra', query: 'Punjabi traditional folk dance Bhangra performance DD India' },
    { key: 'lavani', name: 'Lavani', query: 'Lavani folk dance Maharashtra Sangeet Natak Akademi' },
    { key: 'mudras', name: 'Mudras', query: 'Bharatanatyam Hastha Mudras Natyarambha demonstration' },
    { key: 'navarasa', name: 'Navarasa', query: 'Navarasa expressions Bharatanatyam demonstration Sahapedia' },
    { key: 'dance', name: 'Indian Classical Dance', query: 'Glimpses of Indian Classical Dance Ministry of External Affairs' },
    { key: 'abhinaya', name: 'Abhinaya', query: 'Abhinaya Bharatanatyam Natyashastra demonstration SPIC MACAY' }
];

async function verifyOembed(videoId) {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    try {
        const res = await fetch(oembedUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        if (res.ok) {
            const data = await res.json();
            return { valid: true, url, title: data.title, author: data.author_name };
        }
    } catch (e) {
        // ignore
    }
    return { valid: false, url };
}

async function findVideoForQuery(item) {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(item.query)}`;
    try {
        const res = await fetch(searchUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9'
            }
        });
        const html = await res.text();
        const matches = [...html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)].map(m => m[1]);
        const uniqueIds = [...new Set(matches)];

        console.log(`Searching for ${item.name} (${uniqueIds.length} candidate IDs)...`);
        for (const id of uniqueIds.slice(0, 10)) {
            const check = await verifyOembed(id);
            if (check.valid) {
                console.log(`  [VERIFIED] ${item.name} => ${check.url}`);
                console.log(`             Title: "${check.title}"`);
                console.log(`             Author: ${check.author}`);
                return { ...item, ...check };
            }
        }
    } catch (e) {
        console.error(`Error searching ${item.name}:`, e.message);
    }
    return null;
}

async function main() {
    const results = [];
    for (const item of REMAINING_TOPICS) {
        const found = await findVideoForQuery(item);
        if (found) results.push(found);
        await new Promise(r => setTimeout(r, 600));
    }
    console.log('\n=== REMAINING VERIFIED SUMMARY ===');
    console.log(JSON.stringify(results, null, 2));
    const fs = await import('fs');
    fs.writeFileSync('scripts/verified_remaining.json', JSON.stringify(results, null, 2));
}

main();

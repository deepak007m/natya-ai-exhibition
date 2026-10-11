// Candidate queries to find verified, authentic, live YouTube videos
const TOPICS = [
    { key: 'bharatanatyam', name: 'Bharatanatyam', query: 'Bharatanatyam classical dance performance Alarippu' },
    { key: 'kathak', name: 'Kathak', query: 'Kathak dance performance Birju Maharaj' },
    { key: 'kathakali', name: 'Kathakali', query: 'Kathakali dance performance Kerala Tourism' },
    { key: 'kuchipudi', name: 'Kuchipudi', query: 'Kuchipudi Tarangam brass plate dance performance' },
    { key: 'odissi', name: 'Odissi', query: 'Odissi dance performance Sujata Mohapatra' },
    { key: 'manipuri', name: 'Manipuri', query: 'Manipuri Raas Leela classical dance' },
    { key: 'mohiniyattam', name: 'Mohiniyattam', query: 'Mohiniyattam dance performance Kalamandalam' },
    { key: 'sattriya', name: 'Sattriya', query: 'Sattriya dance Assam Sangeet Natak Akademi' },
    { key: 'bhangra', name: 'Bhangra', query: 'Traditional Bhangra folk dance Punjab' },
    { key: 'garba', name: 'Garba', query: 'Garba dance Gujarat UNESCO DD India' },
    { key: 'lavani', name: 'Lavani', query: 'Traditional Lavani folk dance Maharashtra' },
    { key: 'mudras', name: 'Mudras', query: 'Asamyuta Hasta Mudras Bharatanatyam demonstration' },
    { key: 'navarasa', name: 'Navarasa', query: 'Navarasa demonstration Indian classical dance' },
    { key: 'dance', name: 'Indian Classical Dance', query: 'Indian Classical Dance performance' },
    { key: 'abhinaya', name: 'Abhinaya', query: 'Abhinaya demonstration Natya Shastra' }
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

        // Find all "videoId":"XXXXXXXXXXX" patterns
        const matches = [...html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)].map(m => m[1]);
        const uniqueIds = [...new Set(matches)];

        console.log(`Searching for ${item.name} (${uniqueIds.length} candidate IDs found)...`);

        for (const id of uniqueIds.slice(0, 8)) {
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
    for (const item of TOPICS) {
        const found = await findVideoForQuery(item);
        if (found) {
            results.push(found);
        } else {
            console.log(`  [FAILED] Could not find live verified video for ${item.name}`);
        }
        await new Promise(r => setTimeout(r, 600));
    }

    console.log('\n=== FINAL VERIFIED VIDEO SUMMARY ===');
    console.log(JSON.stringify(results, null, 2));

    const fs = await import('fs');
    fs.writeFileSync('scripts/verified_videos.json', JSON.stringify(results, null, 2));
}

main();

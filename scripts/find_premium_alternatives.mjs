const CANDIDATES = [
    { key: 'bharatanatyam', query: 'Bharatanatyam performance Priyadarsini Govind Sangeet Natak Akademi' },
    { key: 'bharatanatyam2', query: 'Bharatanatyam performance Alarippu IndianRaga' },
    { key: 'dance_mea', query: 'Glimpses of Indian Classical Dance Indian Diplomacy' },
    { key: 'dance_darbar', query: 'Indian classical dance performance Darbar Festival' },
    { key: 'lavani_sna', query: 'Lavani folk dance Sangeet Natak Akademi' },
    { key: 'navarasa_master', query: 'Navarasa 9 emotions classical dance demonstration' }
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
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        const html = await res.text();
        const matches = [...html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)].map(m => m[1]);
        const uniqueIds = [...new Set(matches)];

        for (const id of uniqueIds.slice(0, 10)) {
            const check = await verifyOembed(id);
            if (check.valid) {
                console.log(`[FOUND ${item.key}] ${check.url} | "${check.title}" by ${check.author}`);
                return check;
            }
        }
    } catch (e) {
        console.error(`Error searching ${item.key}:`, e.message);
    }
    return null;
}

async function main() {
    for (const item of CANDIDATES) {
        await findVideoForQuery(item);
        await new Promise(r => setTimeout(r, 600));
    }
}

main();

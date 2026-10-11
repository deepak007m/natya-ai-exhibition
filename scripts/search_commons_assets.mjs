// Query Wikimedia Commons API for authentic Navarasa and Mudra imagery

const RASAS = [
    { id: 'shringara', query: 'Shringara Navarasa classical dance OR Kathakali' },
    { id: 'hasya', query: 'Hasya Navarasa classical dance OR Kathakali' },
    { id: 'karuna', query: 'Karuna Navarasa classical dance OR Kathakali' },
    { id: 'raudra', query: 'Raudra Navarasa classical dance OR Kathakali' },
    { id: 'veera', query: 'Veera Navarasa classical dance OR Kathakali' },
    { id: 'bhayanaka', query: 'Bhayanaka Navarasa classical dance OR Kathakali' },
    { id: 'bibhatsa', query: 'Bibhatsa Navarasa classical dance OR Kathakali' },
    { id: 'adbhuta', query: 'Adbhuta Navarasa classical dance OR Kathakali' },
    { id: 'shanta', query: 'Shanta Navarasa classical dance OR Kathakali' }
];

const MUDRAS = [
    { id: 'pataka', query: 'Pataka mudra OR hasta Bharatanatyam' },
    { id: 'tripataka', query: 'Tripataka mudra OR hasta' },
    { id: 'ardhapataka', query: 'Ardhapataka mudra OR hasta' },
    { id: 'kartarimukha', query: 'Kartarimukha mudra OR hasta' },
    { id: 'mayura', query: 'Mayura mudra OR hasta' },
    { id: 'ardhachandra', query: 'Ardhachandra mudra OR hasta' },
    { id: 'mushti', query: 'Mushti mudra OR hasta' },
    { id: 'shikhara', query: 'Shikhara mudra OR hasta' },
    { id: 'kapittha', query: 'Kapittha mudra OR hasta' },
    { id: 'alapadma', query: 'Alapadma mudra OR hasta' }
];

async function searchCommons(query) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(query)}&gsrlimit=5&prop=imageinfo&iiprop=url|size|mime|extmetadata&format=json`;
    try {
        const res = await fetch(url, { headers: { 'User-Agent': 'NatyaAI-Exhibition/1.0 (educational bot)' } });
        if (res.ok) {
            const data = await res.json();
            if (data.query && data.query.pages) {
                const results = [];
                for (const pageId in data.query.pages) {
                    const page = data.query.pages[pageId];
                    if (page.imageinfo && page.imageinfo[0]) {
                        const info = page.imageinfo[0];
                        if (info.mime && (info.mime.includes('jpeg') || info.mime.includes('png') || info.mime.includes('jpg'))) {
                            results.push({
                                title: page.title,
                                url: info.url,
                                width: info.width,
                                height: info.height,
                                mime: info.mime
                            });
                        }
                    }
                }
                return results;
            }
        }
    } catch (e) {
        console.error(`Error searching "${query}":`, e.message);
    }
    return [];
}

async function run() {
    console.log('--- SEARCHING NAVARASA ---');
    const rasaResults = {};
    for (const r of RASAS) {
        const res = await searchCommons(r.query);
        console.log(`Rasa ${r.id}: found ${res.length} images`);
        if (res[0]) {
            console.log(`  Top: ${res[0].title} -> ${res[0].url}`);
            rasaResults[r.id] = res[0];
        }
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    console.log('\n--- SEARCHING MUDRAS ---');
    const mudraResults = {};
    for (const m of MUDRAS) {
        const res = await searchCommons(m.query);
        console.log(`Mudra ${m.id}: found ${res.length} images`);
        if (res[0]) {
            console.log(`  Top: ${res[0].title} -> ${res[0].url}`);
            mudraResults[m.id] = res[0];
        }
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    const fs = await import('fs');
    fs.writeFileSync('scripts/commons_search_results.json', JSON.stringify({ rasas: rasaResults, mudras: mudraResults }, null, 2));
}

run();

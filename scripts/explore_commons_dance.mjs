import fs from 'fs';

async function getCategoryMembers(category) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtitle=${encodeURIComponent('Category:' + category)}&cmtype=file|subcat&cmlimit=100&format=json`;
    try {
        const res = await fetch(url, { headers: { 'User-Agent': 'NatyaAI-Exhibition/1.0 (cultural-education)' } });
        if (res.ok) {
            const data = await res.json();
            return data.query?.categorymembers || [];
        }
    } catch (e) {
        console.error(`Error querying ${category}:`, e.message);
    }
    return [];
}

async function searchSpecific(query) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(query)}&gsrlimit=10&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
    try {
        const res = await fetch(url, { headers: { 'User-Agent': 'NatyaAI-Exhibition/1.0 (cultural-education)' } });
        if (res.ok) {
            const data = await res.json();
            if (data.query?.pages) {
                return Object.values(data.query.pages).map(p => ({
                    title: p.title,
                    url: p.imageinfo?.[0]?.url,
                    desc: p.imageinfo?.[0]?.extmetadata?.ObjectName?.value || p.imageinfo?.[0]?.extmetadata?.ImageDescription?.value
                }));
            }
        }
    } catch (e) {
        // ignore
    }
    return [];
}

async function main() {
    const mudrasInDance = await getCategoryMembers('Mudras in dance');
    console.log('Mudras in dance files:', mudrasInDance.length);

    // Let's also search for each specific Rasa in Kathakali / Koodiyattam / Bharatanatyam:
    const rasaQueries = [
        'Shringara rasa',
        'Hasya rasa',
        'Karuna rasa',
        'Raudra rasa',
        'Veera rasa',
        'Bhayanaka rasa',
        'Bibhatsa rasa',
        'Adbhuta rasa',
        'Shanta rasa'
    ];

    const rasaResults = {};
    for (const q of rasaQueries) {
        rasaResults[q] = await searchSpecific(q);
    }

    fs.writeFileSync('scripts/dance_commons_results.json', JSON.stringify({
        mudrasInDance,
        rasaResults
    }, null, 2));
    console.log('Saved to scripts/dance_commons_results.json');
}

main();

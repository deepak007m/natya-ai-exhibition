import fs from 'fs';

async function getWikiText(title) {
    const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&prop=wikitext&format=json`;
    const res = await fetch(url, { headers: { 'User-Agent': 'NatyaAI/1.0' } });
    if (res.ok) {
        const data = await res.json();
        return data.parse?.wikitext?.['*'] || '';
    }
    return '';
}

async function searchCommons(q) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(q)}&gsrlimit=15&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
    const res = await fetch(url, { headers: { 'User-Agent': 'NatyaAI/1.0' } });
    if (res.ok) {
        const data = await res.json();
        return Object.values(data.query?.pages || {}).map(p => ({
            title: p.title,
            url: p.imageinfo?.[0]?.url,
            thumb: p.imageinfo?.[0]?.thumburl
        }));
    }
    return [];
}

async function main() {
    const wikitext = await getWikiText('List of mudras (dance)');
    const lines = wikitext.split('\n').filter(l => l.includes('Hasthamudra') || l.includes('Hasta') || l.includes('mudra'));
    console.log('List of mudras wikitext lines containing images:');
    console.log(lines.slice(0, 40).join('\n'));

    console.log('\n--- Searching for Navarasa images ---');
    const navarasaSearches = await searchCommons('"Navarasa"');
    console.log(`Found ${navarasaSearches.length} files for "Navarasa":`);
    for (const f of navarasaSearches) {
        console.log(`  ${f.title} -> ${f.url}`);
    }

    const navaRasaSearches = await searchCommons('"Nava Rasa"');
    console.log(`\nFound ${navaRasaSearches.length} files for "Nava Rasa":`);
    for (const f of navaRasaSearches) {
        console.log(`  ${f.title} -> ${f.url}`);
    }

    fs.writeFileSync('scripts/mudra_wiki_lines.txt', lines.join('\n'));
}

main();

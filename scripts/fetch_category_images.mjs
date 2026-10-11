import fs from 'fs';

async function getCategoryMembers(category) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtitle=${encodeURIComponent('Category:' + category)}&cmtype=file|subcat&cmlimit=100&format=json`;
    try {
        const res = await fetch(url, { headers: { 'User-Agent': 'NatyaAI-Exhibition/1.0 (cultural-education)' } });
        if (res.ok) {
            const data = await res.json();
            return data.query.categorymembers || [];
        }
    } catch (e) {
        console.error(`Error querying ${category}:`, e.message);
    }
    return [];
}

async function searchFiles(query) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(query)}&gsrlimit=20&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
    try {
        const res = await fetch(url, { headers: { 'User-Agent': 'NatyaAI-Exhibition/1.0 (cultural-education)' } });
        if (res.ok) {
            const data = await res.json();
            if (data.query && data.query.pages) {
                return Object.values(data.query.pages).map(p => ({
                    title: p.title,
                    url: p.imageinfo?.[0]?.url,
                    thumb: p.imageinfo?.[0]?.thumburl
                }));
            }
        }
    } catch (e) {
        console.error('Error search:', e.message);
    }
    return [];
}

async function main() {
    const navarasaMembers = await getCategoryMembers('Navarasa');
    const mudraMembers = await getCategoryMembers('Mudras');
    const bharatanatyamMudras = await getCategoryMembers('Bharatanatyam_mudras');
    const kathakaliMudras = await getCategoryMembers('Kathakali_mudras');

    const searchNavarasas = await searchFiles('Navarasa expressions classical dance');
    const searchMudras = await searchFiles('Asamyuta Hasta Bharatanatyam');

    const out = {
        navarasaMembers,
        mudraMembers,
        bharatanatyamMudras,
        kathakaliMudras,
        searchNavarasas,
        searchMudras
    };

    fs.writeFileSync('scripts/category_results.json', JSON.stringify(out, null, 2));
    console.log('Results written to scripts/category_results.json');
}

main();

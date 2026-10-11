import fs from 'fs';

async function getCategory(cat) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtitle=${encodeURIComponent('Category:' + cat)}&cmlimit=100&format=json`;
    const res = await fetch(url, { headers: { 'User-Agent': 'NatyaAI/1.0' } });
    if (res.ok) {
        const data = await res.json();
        return data.query?.categorymembers || [];
    }
    return [];
}

async function search(q) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(q)}&gsrlimit=10&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
    const res = await fetch(url, { headers: { 'User-Agent': 'NatyaAI/1.0' } });
    if (res.ok) {
        const data = await res.json();
        return Object.values(data.query?.pages || {}).map(p => ({
            title: p.title,
            url: p.imageinfo?.[0]?.url
        }));
    }
    return [];
}

async function main() {
    const mudras = await getCategory('Mudras in Indian classical dance');
    console.log('Category:Mudras in Indian classical dance items:', mudras.length);
    for (const m of mudras) {
        console.log(`  ${m.title}`);
    }

    const chakyarNavarasa = await search('Mani Madhava Chakyar Navarasa');
    console.log('\nMani Madhava Chakyar Navarasa:');
    for (const item of chakyarNavarasa) {
        console.log(`  ${item.title} -> ${item.url}`);
    }

    const kathakaliNavarasa = await search('Kathakali Navarasa');
    console.log('\nKathakali Navarasa:');
    for (const item of kathakaliNavarasa) {
        console.log(`  ${item.title} -> ${item.url}`);
    }
}

main();

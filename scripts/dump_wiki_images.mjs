import fs from 'fs';

async function getWikiImages(title) {
    const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&prop=images&format=json`;
    const res = await fetch(url, { headers: { 'User-Agent': 'NatyaAI/1.0' } });
    if (res.ok) {
        const data = await res.json();
        return data.parse?.images || [];
    }
    return [];
}

async function main() {
    const rasaImgs = await getWikiImages('Rasa (aesthetics)');
    const mudraImgs = await getWikiImages('Mudra');
    const hastasImgs = await getWikiImages('List of mudras (dance)');
    const bharatanatyamImgs = await getWikiImages('Bharatanatyam');
    const kathakaliImgs = await getWikiImages('Kathakali');

    const out = {
        rasaImgs,
        mudraImgs,
        hastasImgs,
        bharatanatyamImgs,
        kathakaliImgs
    };
    fs.writeFileSync('scripts/wiki_images.json', JSON.stringify(out, null, 2));
    console.log('Saved wiki images');
}

main();

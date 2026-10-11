import fs from 'fs';

async function getWikiImages(title) {
    const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&prop=images&format=json`;
    try {
        const res = await fetch(url, { headers: { 'User-Agent': 'NatyaAI/1.0' } });
        if (res.ok) {
            const data = await res.json();
            return data.parse?.images || [];
        }
    } catch (e) {
        console.error(`Error fetching ${title}:`, e.message);
    }
    return [];
}

async function getImageUrls(images) {
    if (!images.length) return [];
    const titles = images.map(img => 'File:' + img).slice(0, 50);
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles.join('|'))}&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
    try {
        const res = await fetch(url, { headers: { 'User-Agent': 'NatyaAI/1.0' } });
        if (res.ok) {
            const data = await res.json();
            return Object.values(data.query?.pages || {}).map(p => ({
                title: p.title,
                url: p.imageinfo?.[0]?.url,
                thumb: p.imageinfo?.[0]?.thumburl
            })).filter(x => x.url);
        }
    } catch (e) {
        // ignore
    }
    return [];
}

async function main() {
    console.log('Fetching Rasa (aesthetics) images...');
    const rasaImgs = await getWikiImages('Rasa (aesthetics)');
    console.log('Rasa images count:', rasaImgs.length);
    console.log(rasaImgs);

    console.log('\nFetching Mudra images...');
    const mudraImgs = await getWikiImages('Mudra');
    console.log('Mudra images count:', mudraImgs.length);
    console.log(mudraImgs.filter(i => i.toLowerCase().includes('hasta') || i.toLowerCase().includes('mudra') || i.toLowerCase().includes('pataka')));

    console.log('\nFetching Bharatanatyam images...');
    const bharataImgs = await getWikiImages('Bharatanatyam');
    console.log('Bharatanatyam images count:', bharataImgs.length);
    console.log(bharataImgs.filter(i => i.toLowerCase().includes('hasta') || i.toLowerCase().includes('mudra') || i.toLowerCase().includes('pose') || i.toLowerCase().includes('dance')));

    console.log('\nFetching Kathakali images...');
    const kathakaliImgs = await getWikiImages('Kathakali');
    console.log('Kathakali images count:', kathakaliImgs.length);
    console.log(kathakaliImgs.filter(i => i.toLowerCase().includes('rasa') || i.toLowerCase().includes('expression') || i.toLowerCase().includes('mudra') || i.toLowerCase().includes('navarasa')));
}

main();

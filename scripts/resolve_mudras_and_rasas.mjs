import fs from 'fs';

async function getImageInfo(titles) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles.join('|'))}&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
    const res = await fetch(url, { headers: { 'User-Agent': 'NatyaAI/1.0' } });
    if (res.ok) {
        const data = await res.json();
        return Object.values(data.query?.pages || {}).map(p => ({
            title: p.title,
            url: p.imageinfo?.[0]?.url,
            desc: p.imageinfo?.[0]?.extmetadata?.ObjectName?.value || p.imageinfo?.[0]?.extmetadata?.ImageDescription?.value
        }));
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
            url: p.imageinfo?.[0]?.url,
            desc: p.imageinfo?.[0]?.extmetadata?.ObjectName?.value || p.imageinfo?.[0]?.extmetadata?.ImageDescription?.value
        }));
    }
    return [];
}

async function main() {
    const mudraTitles = [
        'File:Hasthamudra1.JPG',
        'File:Hasthamudra2.JPG',
        'File:Hasthamudra3.JPG',
        'File:Hasthamudra4.JPG',
        'File:Hasthamudra5.JPG',
        'File:Hasthamudra6.JPG',
        'File:Hasthamudra7.JPG',
        'File:Hasthamudra8.JPG',
        'File:Hasthamudra9.JPG',
        'File:Hasthamudra10.JPG',
        'File:Hasthamudra11.JPG',
        'File:Hasthamudra12.JPG',
        'File:Hasthamudra13.JPG',
        'File:Hasthamudra14.JPG',
        'File:Hasthamudra15.JPG',
        'File:Hasthamudra16.JPG',
        'File:Hasthamudra17.JPG',
        'File:Hasthamudra18.JPG',
        'File:Hasthamudra19.JPG',
        'File:Ardhapataka-Hasta.jpg',
        'File:Mayura-Hasta.jpg',
        'File:Ardhachandra-Hasta.jpg',
        'File:Mushti-Hasta.jpg',
        'File:Kapitta-Hasta.jpg'
    ];

    const mudraInfo = await getImageInfo(mudraTitles);
    console.log(`Mudra files resolved: ${mudraInfo.length}`);
    for (const m of mudraInfo) {
        console.log(`${m.title} -> ${m.desc?.replace(/<[^>]+>/g, '').trim()} | ${m.url}`);
    }

    // Now let's search specifically for the 9 Rasas in Chakyar/Kathakali
    const rasaNames = ['Sringara', 'Hasya', 'Karuna', 'Raudra', 'Veera', 'Bhayanaka', 'Bibhatsa', 'Adbhuta', 'Shanta'];
    const rasaData = {};
    for (const r of rasaNames) {
        const results = await search(`"Mani Madhava Chakyar" ${r}`);
        rasaData[r] = results;
        console.log(`Rasa ${r}: ${results.length} found`);
        if (results[0]) console.log(`  Top: ${results[0].title} -> ${results[0].url}`);
    }

    fs.writeFileSync('scripts/resolved_assets.json', JSON.stringify({ mudraInfo, rasaData }, null, 2));
}

main();

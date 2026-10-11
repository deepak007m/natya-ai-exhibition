import fs from 'fs';

async function searchCommons(q) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(q)}&gsrlimit=6&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
    const res = await fetch(url, { headers: { 'User-Agent': 'NatyaAI/1.0' } });
    if (res.ok) {
        const data = await res.json();
        return Object.values(data.query?.pages || {}).map(p => ({
            title: p.title,
            url: p.imageinfo?.[0]?.url,
            width: p.imageinfo?.[0]?.width,
            height: p.imageinfo?.[0]?.height,
            desc: p.imageinfo?.[0]?.extmetadata?.ObjectName?.value || p.imageinfo?.[0]?.extmetadata?.ImageDescription?.value
        }));
    }
    return [];
}

async function main() {
    console.log('Searching for Angika images...');
    const angika = await searchCommons('Bharatanatyam stance posture body movement');

    console.log('Searching for Vachika images...');
    const vachika1 = await searchCommons('Nattuvanar cymbals');
    const vachika2 = await searchCommons('Chakyar Koothu performance');

    console.log('Searching for Aharya images...');
    const aharya1 = await searchCommons('Kathakali makeup green face chutti');
    const aharya2 = await searchCommons('Kathakali costume ornaments');

    console.log('Searching for Sattvika images...');
    const sattvika = await searchCommons('classical dance Abhinaya facial expression emotion');

    const results = {
        angika,
        vachika: [...vachika1, ...vachika2],
        aharya: [...aharya1, ...aharya2],
        sattvika
    };

    fs.writeFileSync('scripts/abhinaya_search_results.json', JSON.stringify(results, null, 2));
    console.log('Saved to scripts/abhinaya_search_results.json');
}

main().catch(console.error);

import fs from 'fs';

async function searchCommons(q) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(q)}&gsrlimit=10&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
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
    const sowmya = await searchCommons('Nava rasa by Sowmya');
    const navarasaKathakali = await searchCommons('Navarasam Kathakali');
    const navarasaBharatanatyam = await searchCommons('Navarasa Bharatanatyam');
    const alapadma = await searchCommons('Alapadma Hasta Bharatanatyam');

    fs.writeFileSync('scripts/navarasa_details.json', JSON.stringify({
        sowmya,
        navarasaKathakali,
        navarasaBharatanatyam,
        alapadma
    }, null, 2));
    console.log('Saved to scripts/navarasa_details.json');
}

main();

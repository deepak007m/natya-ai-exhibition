import fs from 'fs';

async function searchCommons(q, limit = 5) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(q)}&gsrlimit=${limit}&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
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
    console.log('Searching Angika...');
    const angika1 = await searchCommons('"Bharatanatyam" "Araimandi"', 4);
    const angika2 = await searchCommons('"Odissi" "Tribhangi"', 4);

    console.log('Searching Aharya...');
    const aharya1 = await searchCommons('"Kathakali" makeup artist', 4);
    const aharya2 = await searchCommons('"Kathakali costume"', 4);

    console.log('Searching Sattvika...');
    const sattvika1 = await searchCommons('"Abhinaya" "dancer"', 4);
    const sattvika2 = await searchCommons('"Kalamandalam" abhinaya', 4);

    const out = {
        angika: [...angika1, ...angika2],
        aharya: [...aharya1, ...aharya2],
        sattvika: [...sattvika1, ...sattvika2]
    };

    fs.writeFileSync('scripts/abhinaya_candidates.json', JSON.stringify(out, null, 2));
    console.log('Saved to scripts/abhinaya_candidates.json');
}

main().catch(console.error);

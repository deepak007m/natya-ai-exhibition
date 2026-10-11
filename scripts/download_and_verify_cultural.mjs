import fs from 'fs';
import path from 'path';

async function downloadFile(url, dest) {
    const res = await fetch(url, {
        headers: {
            'User-Agent': 'NatyaAI-Exhibition/1.0 (Indian Knowledge Systems educational project; mailto:contact@natyaai.org)'
        }
    });
    if (!res.ok) {
        throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`);
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buffer);
    console.log(`Downloaded ${dest} (${buffer.length} bytes)`);
}

async function getCommonsMetadata(title) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
    const res = await fetch(url, { headers: { 'User-Agent': 'NatyaAI/1.0' } });
    if (res.ok) {
        const data = await res.json();
        const page = Object.values(data.query?.pages || {})[0];
        return page?.imageinfo?.[0] || null;
    }
    return null;
}

async function main() {
    const outDir = 'src/assets/cultural';
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    // 1. Inspect and download Nava rasa by Sowmya
    console.log('Inspecting File:Nava rasa by Sowmya.jpg...');
    const sowmyaMeta = await getCommonsMetadata('File:Nava rasa by Sowmya.jpg');
    console.log('Metadata:', {
        url: sowmyaMeta?.url,
        width: sowmyaMeta?.width,
        height: sowmyaMeta?.height,
        license: sowmyaMeta?.extmetadata?.LicenseShortName?.value,
        artist: sowmyaMeta?.extmetadata?.Artist?.value,
        desc: sowmyaMeta?.extmetadata?.ImageDescription?.value
    });

    if (sowmyaMeta?.url) {
        await downloadFile(sowmyaMeta.url, path.join(outDir, 'navarasa_grid_sowmya.jpg'));
    }

    // 2. Mudras
    const MUDRA_FILES = [
        { id: 'pataka', file: 'File:Hasthamudra1.JPG' },
        { id: 'tripataka', file: 'File:Hasthamudra3.JPG' },
        { id: 'ardhapataka', file: 'File:Ardhapataka-Hasta.jpg' },
        { id: 'kartarimukha', file: 'File:Hasthamudra9.JPG' },
        { id: 'mayura', file: 'File:Mayura-Hasta.jpg' },
        { id: 'ardhachandra', file: 'File:Ardhachandra-Hasta.jpg' },
        { id: 'mushti', file: 'File:Mushti-Hasta.jpg' },
        { id: 'shikhara', file: 'File:Hasthamudra2.JPG' },
        { id: 'kapittha', file: 'File:Kapitta-Hasta.jpg' }
    ];

    for (const m of MUDRA_FILES) {
        const meta = await getCommonsMetadata(m.file);
        if (meta?.url) {
            const ext = path.extname(meta.url.split('?')[0]) || '.jpg';
            const dest = path.join(outDir, `mudra_${m.id}${ext}`);
            await downloadFile(meta.url, dest);
        }
        await new Promise(r => setTimeout(r, 200));
    }
}

main().catch(console.error);

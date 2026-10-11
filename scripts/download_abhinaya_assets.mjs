import fs from 'fs';
import path from 'path';

const ASSETS = [
    {
        name: 'abhinaya_angika.jpg',
        url: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Samyuktha_Shankar_Performing_Bharatanatyam.jpg',
        concept: 'Angika - Body & Movement'
    },
    {
        name: 'abhinaya_vachika.jpg',
        url: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Chakyar_Koothu_at_Mattannur_%281%29.jpg',
        concept: 'Vachika - Speech & Sound'
    },
    {
        name: 'abhinaya_aharya.jpg',
        url: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Kathakali_artists_in_traditional_costume_and_makeup.jpg',
        concept: 'Aharya - Costume & Appearance'
    },
    {
        name: 'abhinaya_sattvika.jpg',
        url: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Abhinaya_The_Soul_of_Dance.jpg',
        concept: 'Sattvika - Inner Emotion'
    }
];

async function download(item, destDir) {
    const dest = path.join(destDir, item.name);
    console.log(`Downloading ${item.concept} from ${item.url}...`);
    const res = await fetch(item.url, {
        headers: {
            'User-Agent': 'NatyaAI-Exhibition/1.0 (Indian Knowledge Systems educational project; mailto:contact@natyaai.org)'
        }
    });
    if (!res.ok) {
        throw new Error(`Failed to download ${item.name}: ${res.status} ${res.statusText}`);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    console.log(`Saved ${dest} (${buf.length} bytes)`);
}

async function main() {
    const destDir = 'src/assets/cultural';
    for (const item of ASSETS) {
        await download(item, destDir);
    }
    console.log('All 4 Abhinaya images successfully downloaded!');
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_DIR = path.resolve(__dirname, '../src/assets/cultural');
if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Exact Wikipedia page titles for reliable cultural image extraction
const TARGETS = [
    { name: 'bharatanatyam', page: 'Bharatanatyam' },
    { name: 'kathak', page: 'Kathak' },
    { name: 'kathakali', page: 'Kathakali' },
    { name: 'kuchipudi', page: 'Kuchipudi' },
    { name: 'odissi', page: 'Odissi' },
    { name: 'manipuri', page: 'Manipuri_dance' },
    { name: 'mohiniyattam', page: 'Mohiniyattam' },
    { name: 'sattriya', page: 'Sattriya' },
    { name: 'bhangra', page: 'Bhangra_(dance)' },
    { name: 'garba', page: 'Garba_(dance)' },
    { name: 'lavani', page: 'Lavani' },
    { name: 'mudras_learning', page: 'Mudra' },
    { name: 'navarasa_learning', page: 'Rasa_(aesthetics)' },
    { name: 'dance_learning', page: 'Indian_classical_dance' },
    { name: 'abhinaya_learning', page: 'Abhinaya' }
];

async function fetchWikipediaImage(item) {
    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(item.page)}`;
    console.log(`Fetching summary for ${item.name} (${item.page})...`);

    try {
        const res = await fetch(summaryUrl, {
            headers: {
                'User-Agent': 'NatyaAI-CulturalExhibition/1.0 (academic college project; contact: student@example.edu)',
                'Accept': 'application/json'
            }
        });

        if (!res.ok) {
            console.error(`Failed ${item.page}: status ${res.status}`);
            return false;
        }

        const data = await res.json();
        const imageUrl = data.originalimage?.source || data.thumbnail?.source;

        if (!imageUrl) {
            console.error(`No image found in summary for ${item.page}`);
            return false;
        }

        console.log(`Downloading ${item.name} from: ${imageUrl}`);
        const imgRes = await fetch(imageUrl, {
            headers: {
                'User-Agent': 'NatyaAI-CulturalExhibition/1.0 (academic college project; contact: student@example.edu)'
            }
        });

        if (!imgRes.ok) {
            console.error(`Failed to download image bytes for ${item.name}: ${imgRes.status}`);
            return false;
        }

        const buffer = Buffer.from(await imgRes.arrayBuffer());
        const destPath = path.join(TARGET_DIR, `${item.name}.jpg`);
        fs.writeFileSync(destPath, buffer);
        console.log(`SUCCESS: Saved ${item.name}.jpg (${Math.round(buffer.length / 1024)} KB)`);
        return true;
    } catch (err) {
        console.error(`Error processing ${item.name}:`, err.message);
        return false;
    }
}

async function main() {
    for (const item of TARGETS) {
        await fetchWikipediaImage(item);
        await new Promise(r => setTimeout(r, 400));
    }
    console.log('Done downloading cultural images!');
}

main();

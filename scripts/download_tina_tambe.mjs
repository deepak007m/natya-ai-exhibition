import fs from 'fs';
import path from 'path';

async function main() {
    const url = 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Facial_expressions_in_Kathak_by_Tina_Tambe.jpg';
    const dest = path.join('src/assets/cultural', 'abhinaya_sattvika.jpg');
    console.log(`Downloading ${url}...`);
    const res = await fetch(url, {
        headers: {
            'User-Agent': 'NatyaAI-Exhibition/1.0 (Indian Knowledge Systems educational project; mailto:contact@natyaai.org)'
        }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    console.log(`Saved ${dest} (${buf.length} bytes)`);
}

main().catch(console.error);

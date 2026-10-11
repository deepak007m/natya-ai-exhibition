import fs from 'fs';
import path from 'path';

async function downloadFile(url, dest) {
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

async function main() {
    const url = 'https://upload.wikimedia.org/wikipedia/commons/3/35/Hasthamudra10.JPG';
    await downloadFile(url, path.join('src/assets/cultural', 'mudra_alapadma.jpg'));
}

main();

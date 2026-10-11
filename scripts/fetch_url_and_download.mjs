import fs from 'fs';
import path from 'path';

async function main() {
    const queryUrl = 'https://commons.wikimedia.org/w/api.php?action=query&titles=File:Facial_expressions_in_Kathak_by_Tina_Tambe.jpg&prop=imageinfo&iiprop=url|size&format=json';
    const res = await fetch(queryUrl, { headers: { 'User-Agent': 'NatyaAI/1.0' } });
    const data = await res.json();
    const p = Object.values(data.query?.pages || {})[0];
    const imgUrl = p?.imageinfo?.[0]?.url;
    console.log('Resolved URL:', imgUrl);

    if (imgUrl) {
        const dest = path.join('src/assets/cultural', 'abhinaya_sattvika.jpg');
        const imgRes = await fetch(imgUrl, {
            headers: {
                'User-Agent': 'NatyaAI-Exhibition/1.0 (Indian Knowledge Systems educational project; mailto:contact@natyaai.org)'
            }
        });
        console.log('HTTP Status:', imgRes.status);
        if (imgRes.ok) {
            const buf = Buffer.from(await imgRes.arrayBuffer());
            fs.writeFileSync(dest, buf);
            console.log(`Saved ${dest} (${buf.length} bytes)`);
        }
    }
}

main().catch(console.error);

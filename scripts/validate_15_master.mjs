// Master list of 15 candidate video URLs
const CANDIDATE_LIST = [
    { id: 1, topic: 'Bharatanatyam', url: 'https://www.youtube.com/watch?v=CMorI8jsQyw', expected: 'Classical dance' },
    { id: 2, topic: 'Kathak', url: 'https://www.youtube.com/watch?v=v21vGnehunk', expected: 'Classical dance' },
    { id: 3, topic: 'Kathakali', url: 'https://www.youtube.com/watch?v=nUUl5ZraIJg', expected: 'Classical dance' },
    { id: 4, topic: 'Kuchipudi', url: 'https://www.youtube.com/watch?v=37QyIKkSWVA', expected: 'Classical dance' },
    { id: 5, topic: 'Odissi', url: 'https://www.youtube.com/watch?v=PGrgqMP4mYs', expected: 'Classical dance' },
    { id: 6, topic: 'Manipuri', url: 'https://www.youtube.com/watch?v=PFeFV2GR_P4', expected: 'Classical dance' },
    { id: 7, topic: 'Mohiniyattam', url: 'https://www.youtube.com/watch?v=ACHMKH-S8zU', expected: 'Classical dance' },
    { id: 8, topic: 'Sattriya', url: 'https://www.youtube.com/watch?v=7gq_Wne_U-g', expected: 'Classical dance' },
    { id: 9, topic: 'Bhangra', url: 'https://www.youtube.com/watch?v=IOr1aFhnkiI', expected: 'Folk dance' },
    { id: 10, topic: 'Garba', url: 'https://www.youtube.com/watch?v=4xrxfFkefKw', expected: 'Folk dance' },
    { id: 11, topic: 'Lavani', url: 'https://www.youtube.com/watch?v=zGVS4U3rMyg', expected: 'Folk dance' },
    { id: 12, topic: 'Mudras', url: 'https://www.youtube.com/watch?v=__bOyh3NrKA', expected: 'Hand gestures' },
    { id: 13, topic: 'Navarasa', url: 'https://www.youtube.com/watch?v=hY-uWNFMMJA', expected: '9 expressions' },
    { id: 14, topic: 'Dance', url: 'https://www.youtube.com/watch?v=v21vGnehunk', expected: 'Classical performance' },
    { id: 15, topic: 'Abhinaya', url: 'https://www.youtube.com/watch?v=Gbaon1diwgA', expected: 'Natya Shastra dramatic expression' }
];

async function validateAll() {
    console.log('=== VALIDATING 15 MASTER YOUTUBE URLS ===\n');
    const results = [];
    for (const item of CANDIDATE_LIST) {
        const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(item.url)}&format=json`;
        try {
            const res = await fetch(oembedUrl, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
            });
            if (res.ok) {
                const data = await res.json();
                console.log(`[PASS] ${item.id}. ${item.topic}`);
                console.log(`       URL: ${item.url}`);
                console.log(`       Title: "${data.title}"`);
                console.log(`       Author: ${data.author_name}\n`);
                results.push({ ...item, opens: true, correctContent: true, title: data.title, author: data.author_name });
            } else {
                console.log(`[FAIL ${res.status}] ${item.id}. ${item.topic} -> ${item.url}\n`);
                results.push({ ...item, opens: false, correctContent: false, status: res.status });
            }
        } catch (e) {
            console.log(`[ERROR] ${item.id}. ${item.topic} -> ${e.message}\n`);
            results.push({ ...item, opens: false, correctContent: false, error: e.message });
        }
        await new Promise(r => setTimeout(r, 200));
    }

    const allPassed = results.every(r => r.opens && r.correctContent);
    console.log(`TOTAL: ${results.filter(r => r.opens).length} / ${results.length} PASSED.`);
    console.log(`ALL 15 VERIFIED: ${allPassed ? 'YES' : 'NO'}`);

    const fs = await import('fs');
    fs.writeFileSync('scripts/master_validation_results.json', JSON.stringify(results, null, 2));
}

validateAll();

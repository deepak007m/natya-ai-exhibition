const testUrls = [
    { topic: '1. Bharatanatyam', url: 'https://www.youtube.com/watch?v=JWhA3ldZCYy' },
    { topic: '2. Kathak', url: 'https://www.youtube.com/watch?v=R9K1G3bZ7_E' },
    { topic: '3. Kathakali', url: 'https://www.youtube.com/watch?v=vqjEUYPOnWM' },
    { topic: '4. Kuchipudi', url: 'https://www.youtube.com/watch?v=eUo-dY3G3kE' },
    { topic: '5. Odissi', url: 'https://www.youtube.com/watch?v=McdOa_uGf_s' },
    { topic: '6. Manipuri', url: 'https://www.youtube.com/watch?v=R94yH34Y3b8' },
    { topic: '7. Mohiniyattam', url: 'https://www.youtube.com/watch?v=YQFEqM6T6gqXBQeAiGoVAhC-fp6mWkn4BAi-WkXN01Z9l11cZ5qpghcbBlgRdPGVXe23oagLsz4CXxYSt-ojy9Ixg7AhU4PbOhtDa097qwC18zhI8MjyLm57AsukjNEUaLze' },
    { topic: '8. Sattriya', url: 'https://www.youtube.com/watch?v=hy1e9KeiCl-' },
    { topic: '9. Bhangra', url: 'https://www.youtube.com/watch?v=q0dF3uY79jQ' },
    { topic: '10. Garba', url: 'https://www.youtube.com/watch?v=S01Z8Jz751M' },
    { topic: '11. Lavani', url: 'https://www.youtube.com/watch?v=c7y2Z104yMo' },
    { topic: '12. Mudras', url: 'https://www.youtube.com/watch?v=F3z3V0zH_rE' },
    { topic: '13. Navarasa', url: 'https://www.youtube.com/watch?v=lvd-RXwaVqM' },
    { topic: '14. Dance (Classical)', url: 'https://www.youtube.com/watch?v=JWhA3ldZCYy' },
    { topic: '15. Abhinaya', url: 'https://www.youtube.com/watch?v=eUo-dY3G3kE' }
];

async function checkUrl(item) {
    const oembed = `https://www.youtube.com/oembed?url=${encodeURIComponent(item.url)}&format=json`;
    try {
        const res = await fetch(oembed, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (res.ok) {
            const data = await res.json();
            console.log(`[PASS] ${item.topic}: "${data.title}" (${data.author_name})`);
            return true;
        } else {
            console.log(`[FAIL ${res.status}] ${item.topic} -> ${item.url}`);
            return false;
        }
    } catch (e) {
        console.log(`[ERROR] ${item.topic}: ${e.message}`);
        return false;
    }
}

async function run() {
    console.log('AUDITING CURRENT URLS:');
    for (const item of testUrls) {
        await checkUrl(item);
        await new Promise(r => setTimeout(r, 200));
    }
}

run();

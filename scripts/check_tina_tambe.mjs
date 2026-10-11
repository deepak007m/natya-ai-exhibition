async function getInfo(title) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
    const res = await fetch(url, { headers: { 'User-Agent': 'NatyaAI/1.0' } });
    if (res.ok) {
        const data = await res.json();
        const p = Object.values(data.query?.pages || {})[0];
        console.log(p?.imageinfo?.[0]);
    }
}

getInfo('File:Facial expressions in Kathak by Tina Tambe.jpg');

import fs from 'fs';
import path from 'path';

const dir = 'src/assets/cultural';
const files = fs.readdirSync(dir);
for (const file of files) {
    if (file.endsWith('.JPG')) {
        const oldPath = path.join(dir, file);
        const tempPath = path.join(dir, 'temp_' + file);
        const newPath = path.join(dir, file.replace(/\.JPG$/, '.jpg'));
        fs.renameSync(oldPath, tempPath);
        fs.renameSync(tempPath, newPath);
        console.log(`Renamed ${file} -> ${path.basename(newPath)}`);
    }
}

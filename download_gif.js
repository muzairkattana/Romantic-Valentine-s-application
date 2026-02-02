import fs from 'fs';
import https from 'https';
import path from 'path';

const url = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDN2Z2JtN3hjcG8xNmliY3Fxb3RuNncwenY1aWVpaG5wbDlobzgxZCZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/pAHAgWYYjWIE9DNLcC/giphy.gif";
const dest = path.join(process.cwd(), 'public', 'funny-valentine.gif');

// Ensure public dir exists
if (!fs.existsSync(path.join(process.cwd(), 'public'))) {
    fs.mkdirSync(path.join(process.cwd(), 'public'));
}

const file = fs.createWriteStream(dest);
https.get(url, function (response) {
    response.pipe(file);
    file.on('finish', function () {
        file.close(() => {
            console.log("Download complete: " + dest);
        });
    });
}).on('error', function (err) {
    fs.unlink(dest);
    console.error("Error downloading:", err.message);
});

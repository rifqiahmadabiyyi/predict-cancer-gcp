require('dotenv').config(); // Memuat variabel dari file .env
const fs = require('fs');

try {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);

    fs.writeFileSync('serviceAccount.json', JSON.stringify(credentials, null, 2));

    console.log('Service account JSON berhasil dibuat: serviceAccount.json');
} catch (error) {
    console.error('Gagal membuat service account JSON:', error.message);
}
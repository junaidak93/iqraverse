import fs from 'fs';

interface Translation {
  text: string;
  ayah_id: number;
  surah_id: number;
}

const data: Translation[] = JSON.parse(
  fs.readFileSync('./translations.json', 'utf8')
);

let sql = '';

for (const t of data) {
  const escaped = t.text.replace(/'/g, "''");

  sql += `
UPDATE ayahs
SET en_meaning = '${escaped}'
WHERE surah_id = ${t.surah_id}
AND ayah_id = ${t.ayah_id};
`;
}

fs.writeFileSync('./translations.sql', sql);

console.log('translations.sql generated');
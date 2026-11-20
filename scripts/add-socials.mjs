import fs from 'fs';
import path from 'path';

const dbPath = path.resolve('server/src/db.js');
let content = fs.readFileSync(dbPath, 'utf8');

if (!content.includes('tiktok:')) {
  content = content.replace(
    /github: 'https:\/\/github\.com\/0767064168',(\r?\n)/,
    "github: 'https://github.com/0767064168',$1    facebook: 'https://facebook.com/yvesyao',$1    instagram: 'https://instagram.com/yvesyao',$1    tiktok: 'https://tiktok.com/@yvesyao',$1"
  );
  fs.writeFileSync(dbPath, content, 'utf8');
  console.log('✅ server/src/db.js updated with social links (facebook, instagram, tiktok)');
} else {
  console.log('ℹ️ Social links already present');
}

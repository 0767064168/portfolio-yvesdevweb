import fs from 'fs';
import path from 'path';

const dbPath = path.resolve('server/src/db.js');
let content = fs.readFileSync(dbPath, 'utf8');

const adminEntry = `  admins: [
    {
      id: 1,
      name: 'Yves Yao',
      email: 'admin@yvesyao.dev',
      password_hash: '$2a$10$GIr4n0i4Li2hm9ICqSXbnOC9k7G3bi.5RV.Wc.g780RHwdfMZfz2C',
      role: 'admin',
      active: true,
      created_at: '2026-01-01T00:00:00.000Z'
    }
  ],`;

if (!content.includes('admin@yvesyao.dev')) {
  content = content.replace(/  admins: \[\],/, adminEntry);
  fs.writeFileSync(dbPath, content, 'utf8');
  console.log('✅ Admin user added to server/src/db.js');
} else {
  console.log('ℹ️ Admin user already exists in db.js');
}

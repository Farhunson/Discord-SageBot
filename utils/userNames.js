// utils/userNames.js
import fs from 'fs';
const filePath = './data/usernames.json';

// Ensure file exists
if (!fs.existsSync('./data')) fs.mkdirSync('./data');
if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '{}');

export function getRealName(userId, fallback = null) {
  const raw = fs.readFileSync(filePath);
  const names = JSON.parse(raw);
  return names[userId] || fallback;
}

export function setRealName(userId, name) {
  const raw = fs.readFileSync(filePath);
  const names = JSON.parse(raw);
  names[userId] = name;
  fs.writeFileSync(filePath, JSON.stringify(names, null, 2));
}

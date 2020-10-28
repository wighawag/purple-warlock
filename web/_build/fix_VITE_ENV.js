/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const assetsPath = 'dist/_assets';
const files = fs.readdirSync(assetsPath);
for (const file of files) {
  const filepath = path.join(assetsPath, file);
  const stat = fs.statSync(filepath);
  if (stat.isDirectory()) {
    continue;
  }
  const envNames = ['VITE_THE_GRAPH_HTTP', 'VITE_CHAIN_ID'];
  let content = fs.readFileSync(filepath).toString();
  for (const envName of envNames) {
    content = content.replace(
      new RegExp(`{}.${envName}`, 'g'),
      process.env[envName]
    );
  }
  fs.writeFileSync(filepath, content);
}

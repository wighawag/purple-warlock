#!/usr/bin/env node
const fs = require('fs');
function copyFromDefault(p) {
  if (!fs.existsSync(p)) {
    const defaultFile = `${p}.default`;
    if (fs.existsSync(defaultFile)) {
      fs.copyFileSync(`${p}.default`, p);
    }
  }
}

function writeIfNotExists(p, content) {
  if (!fs.existsSync(p)) {
    fs.writeFileSync(p, content);
  }
}

['jolly-roger.code-workspace', '.env', '.env.production', '.env.staging'].map(
  copyFromDefault
);

switch (process.platform) {
  case 'win32':
    writeIfNotExists(
      '.newsh.json',
      `
{
  "terminalApp": "cmd"
}    
`
    );
    break;
  case 'linux':
    writeIfNotExists(
      '.newsh.json',
      `
  {
    "terminalApp": "xterm"
  }    
  `
      );
    break;
}

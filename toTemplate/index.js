/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const {execSync} = require('child_process');
const {isBinaryFileSync} = require('isbinaryfile');
// execSync('npm install --no-save change-case@4.1.1 fs-extra@9.0.0 tar@5.0.1')

const {Transform} = require('stream');
const tar = require('tar');
const fs = require('fs-extra');
const changeCase = require('change-case');

const args = process.argv.slice(2);
const branch = args[0] || 'dev';

const variables = {
  name: 'Jolly Roger',
  contractName: 'Greetings Registry',
};

const tests = [
  'camelCase',
  'constantCase',
  'headerCase',
  'noCase',
  'paramCase',
  'pascalCase',
  'pathCase',
  'sentenceCase',
  'snakeCase',
  'capitalCase',
  'dotCase',
];

// for (const test of tests) {
//     for (const variableName of Object.keys(variables)) {
//         console.log(changeCase[test](variables[variableName]));
//     }
// }

function findAndReplace(str, term, replacement) {
  return str.split(term).join(replacement);
}

function findAndReplaceVariable(str, test, variableName) {
  return findAndReplace(
    str,
    changeCase[test](variables[variableName]),
    `{{=_.${test}(it.${variableName})}}`
  );
}

function findAndReplaceAll(str) {
  str = findAndReplace(str, '}}', '{{!"}"}}}');
  for (const variableName of Object.keys(variables)) {
    for (const test of tests) {
      str = findAndReplaceVariable(str, test, variableName);
    }
  }
  return str;
}

function transform(path, str) {
  str = findAndReplaceAll(str);
  if (path === 'README.md') {
    return str.replace(
      '<!--   -->',
      `<!-- {{% it.template }} -->
# jolly-roger

A template to build a decentralised applicaiton using ethereum, hardhat, svelte and thegraph

to make an app out of it, execute the following

\`\`\`
npx init-from wighawag/jolly-roger <your-app-folder>
\`\`\`

or if you want the name to be different than the folder or the contract name to be different too

\`\`\`
npx init-from wighawag/jolly-roger <your-app-folder> --name "<Your App Name>" --contractName "<your Contract Name>"
\`\`\`
<!-- {{%}}  -->`
    );
  }
  if (path === 'web/application.json') {
    return str
      .replace('Ronan Sandford', 'Nobody')
      .replace('https://ronan.eth.link', '')
      .replace(/^.*"ethLinkErrorRedirect": .*,\n/gm, ''); // remove ethLinkErrorRedirect
  }
  if (path.endsWith('.svelte') || path.endsWith('.html')) {
    return str.replace(
      /<!--TEMPLATE_REMOVE-->[^]*?<!--TEMPLATE_REMOVE-->/g,
      ''
    );
  }
  return str;
}

const archivePath = 'archive.tar.gz';
const dest = 'export';
fs.ensureDir(dest);
const exportGitFolder = dest + '/.git';
if (fs.existsSync(exportGitFolder)) {
  fs.moveSync(exportGitFolder, '.git.tmp');
}
fs.removeSync(archivePath);
fs.emptyDirSync(dest);
execSync(`git archive ${branch} -o ${archivePath}`);

const exclude = [
  '.gitmodules',
  'export',
  'archive.tar.gz',
  'toTemplate/',
  'contracts/deployments/staging',
  'TODO.md',
];

const contents = {};
console.log('extracting...', {archivePath, dest});
try {
  tar.x({
    cwd: dest,
    file: archivePath,
    sync: true,
    onentry(entry) {
      entry.path = transform(entry.path, entry.path);
      return entry;
    },
    filter(path) {
      console.log(path);
      for (const pathToExclude of exclude) {
        if (path === pathToExclude) {
          return false;
        }
        if (pathToExclude.endsWith('/')) {
          if (path.startsWith(pathToExclude)) {
            return false;
          }
        } else {
          if (path.startsWith(pathToExclude + '/')) {
            return false;
          }
        }
      }
      return true;
    },
    transform(entry) {
      if (fs.existsSync(entry.path) && isBinaryFileSync(entry.path)) {
        return undefined;
      }
      // console.log(entry.path);
      // console.log(entry.bufferLength);
      let chunks = {};
      let counter = 0;
      contents[entry.path] = '';
      return entry.pipe(
        new Transform({
          transform(chunk, enc, cb) {
            const str = chunk.toString();
            if (chunks[str]) {
              return cb();
            }
            chunks[str] = true; // WEIRD the function seems to be called 2 per chunk, checkin g duplicate chunk (NOT FULL PROOF)
            counter++;
            // if (counter % 2 == 0) { // WEIRD the function seems to be called 2 per chunk, so we do only once per twice
            //     return cb();
            // }
            // if (entry.path === 'contracts/package.json') {
            //     console.log('CHUNK', chunk.toString());
            // }
            contents[entry.path] += chunk;
            // TODO streaming search and replace
            // var upperChunk = chunk.toString().toUpperCase();
            // this.push(upperChunk);
            cb();
          },
          flush(cb) {
            const content = contents[entry.path];
            // if (entry.path === 'contracts/package.json') {
            //     console.log(content);
            // }
            // console.log('flushing ' + entry.path);
            this.push(transform(entry.path, content));
            delete contents[entry.path];
            cb();
          },
        })
      );
    },
  });
} finally {
  if (fs.existsSync('.git.tmp')) {
    fs.moveSync('.git.tmp', dest + '/.git');
  }
  fs.removeSync(archivePath);
}

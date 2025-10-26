const fs = require('fs');
const path = require('path');

const rootDir = './src/';
const consoleLogRegex = /(.*?(console\.log|console\.dir|console\.error)\(.*?\);?.*?\n)/g;

function removeConsoleLogs(filePath) {
  let fileContent = fs.readFileSync(filePath, 'utf8');
  fileContent = fileContent.replace(consoleLogRegex, '');
  fs.writeFileSync(filePath, fileContent, 'utf8');
}

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      processDirectory(filePath);
    } else if (filePath.endsWith('.js')) {
      removeConsoleLogs(filePath);
    }
  });
}

processDirectory(rootDir);

const { exec } = require('child_process');
const fs = require('fs');
const { startCase } = require('lodash');

const getDirectoryTitle = (dir) => {
  const spacedDir = dir.replace('-', ' ');
  return startCase(spacedDir);
};

let projectLinks = [];
fs.readdirSync('../projects').forEach((projectDirectory) => {

  if (projectDirectory === '.DS_Store') return;

  projectLinks.push({
    name: getDirectoryTitle(projectDirectory),
    path: `./${projectDirectory}`,  // corresponds to path after deployment
  });
});

// stringifying twice escapes quotes
const projectLinksJSON = JSON.stringify(JSON.stringify(projectLinks));
console.log(projectLinks, projectLinksJSON);
const projectsEnvVariable = `REACT_APP_LINKS=${projectLinksJSON}`;
const reactScriptsCommand = process.argv.includes('--build') ? 'build' : 'start';

exec(`${projectsEnvVariable} react-scripts ${reactScriptsCommand}`);



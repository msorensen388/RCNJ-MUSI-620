// Build all apps in the projects folder

const { exec } = require('child_process');
const fs = require('fs');

const buildPath = `${__dirname}/build`;
const projectsPath = `${__dirname}/projects`;
const indexPath = `${__dirname}/index`;

const buildAndCopy = (cmd, cwd, copySrc, copyDest) => {

  // Build
  exec(cmd, { cwd }, (err, stdout, stderr) => {
    if (err) {
      console.err('Could not build: ', cwd, err);
    }
    if (stderr) {
      console.log('stderr: ', stderr);
    }
    console.log(`Build successful for ${cwd}`);
  });

  // Copy
  fs.cpSync(copySrc, copyDest, {recursive: true});
};


// 1. build projects no matter what
fs.rmSync(buildPath, { recursive: true, force: true });

const projects = fs.readdirSync(projectsPath);

projects.forEach((projectDirectory) => {
  if (projectDirectory === '.DS_Store') return;

  const projectPath = `${projectsPath}/${projectDirectory}`;
  const projectBuildPath = `${buildPath}/${projectDirectory}`;

  const projectItems = fs.readdirSync(projectPath);

  if (projectItems.includes('package.json')) {
    buildAndCopy('yarn build', projectPath, `${projectPath}/public`, projectBuildPath);
  }
});

// 2. build index no matter what
buildAndCopy('yarn build', indexPath, `${indexPath}/build`, buildPath);

// 3. run a server for testing purposes maybe
if (process.argv.includes('--server')) {
  exec('http-server \'./build\'', './', (err, stdout, stderr) => {
    if (err) {
      console.err('Server could not be started: ', err);
    }
    if (stderr) {
      console.log('stderr: ', stderr);
    }
    console.log('HTTP server started at http://localhost:8080');
  });
}

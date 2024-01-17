// Build all apps in the projects folder

const { exec } = require('child_process');
const fs = require('fs');

const buildPath = `${__dirname}/build`;
const projectsPath = `${__dirname}/projects`;

fs.rmSync(buildPath, { recursive: true, force: true });

const projects = fs.readdirSync(projectsPath);

projects.forEach((projectDirectory) => {
  if (projectDirectory === '.DS_Store') return;

  const projectPath = `${projectsPath}/${projectDirectory}`;
  const projectBuildPath = `${buildPath}/${projectDirectory}`;

  const projectItems = fs.readdirSync(projectPath);

  if (projectItems.includes('package.json')) {

    // Build
    exec('yarn build', {
      cwd: projectPath,
    }, (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        console.err('Could not build project: ', projectDirectory, err);
      }
      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });

    // Copy
    fs.cpSync(`${projectPath}/public`, projectBuildPath, {recursive: true});
  }

});



const path = require('path');
const fs = require('fs');

const BUILD_FOLDER = path.join(__dirname, `../build`);
const ANDROID_ASSETS_FOLDER = path.join(
  __dirname,
  `../../android/app/src/main/assets`,
);

const IOS_ASSETS_FOLDER = path.join(__dirname, '../../assets');

function setupAssetsFolder(targetFolder) {
  if (fs.existsSync(targetFolder)) {
    fs.rmSync(targetFolder, { recursive: true, force: true });
  }

  fs.mkdirSync(targetFolder, { recursive: true });

  const files = fs.readdirSync(BUILD_FOLDER);

  files.forEach((file) => {
    const buildPath = path.join(BUILD_FOLDER, file);
    const assetsPath = path.join(targetFolder, file);

    fs.cpSync(buildPath, assetsPath, { recursive: true });
  });
}

if (fs.existsSync(BUILD_FOLDER)) {
  [ANDROID_ASSETS_FOLDER, IOS_ASSETS_FOLDER].forEach((folder) => {
    setupAssetsFolder(folder);
  });
}

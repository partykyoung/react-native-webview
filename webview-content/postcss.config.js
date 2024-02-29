const postcssPresetEnv = require('postcss-preset-env');

const config = {
  plugins: [require('autoprefixer'), require('postcss-nested')],
};

module.exports = config;

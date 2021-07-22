const { createRequire } = require("module");
const { fileURLToPath } = require("url");
const { dirname } = require("path");
module.exports = function (metaURL) {
  const require = createRequire(metaURL);
  const __filename = fileURLToPath(metaURL);
  const __dirname = dirname(__filename);
  return { require, __filename, __dirname };
};
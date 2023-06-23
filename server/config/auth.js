const crypto = require("crypto");

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

const jwtSecret = generateSecretKey();

module.exports = { jwtSecret };

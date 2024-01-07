const crypto = require("crypto");
console.log(crypto.createHash("SHA512").update(crypto.randomBytes(16)).digest("base64"));
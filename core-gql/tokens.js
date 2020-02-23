//this is a poc, obviously this needs to be jwts

module.exports.createToken = claims => {
  return Buffer.from(JSON.stringify(claims)).toString("base64");
};

module.exports.getClaims = token => {
  try {
    return JSON.parse(Buffer.from(token, "base64").toString("ascii"));
  } catch (e) {
    return null;
  }
};

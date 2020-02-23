const cookie = require("cookie");
const { createToken, getClaims } = require("./tokens");

const TOKEN = "token";
const ONE_MONTH = 2592000000;

module.exports.context = integrationContext => {
  const { req, res } = integrationContext;

  const claims = getClaimsFromCookies(req);

  return {
    claims,
    login: claims => login(res, claims),
    logout: () => logout(res)
  };
};

function getClaimsFromCookies(req) {
  if (!req.headers.cookie) {
    return null;
  }
  const { token } = cookie.parse(req.headers.cookie);
  return getClaims(token);
}

function login(res, claims) {
  res.cookie(TOKEN, createToken(claims), {
    maxAge: ONE_MONTH,
    httpOnly: true
  });
}

function logout(res) {
  res.clearCookie(TOKEN);
}

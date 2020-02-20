const fs = require('fs');
const permissions = JSON.parse(fs.readFileSync('./configs/permissions.json'));

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) next();
  else next({ status: 403, message: 'Unauthorized' });
}

function isAdmin(req, res, next) {
  if (req.user.admin) next();
  else next({ status: 403, message: 'Unauthorized Admin' });
}

function isPermitted(req, res, next) {
  let clientType;
  try {
    clientType = req.user.admin;
  } catch {
    clientType = 'public';
  }
  if (clientType == true) {
    return next();
    clientType = 'admin'; //for future use
  } else if (clientType == false) {
    clientType = 'user';
  }

  for (let i = 0; i < permissions[clientType].length; i++) {
    if ((req.originalUrl == permissions[clientType][i]) || (req.baseUrl+req.path == permissions[clientType][i])) {
      return next();
    }
  }

  return next({ status: 403, message: 'Unauthorized' });
}

module.exports = {
  isLoggedIn,
  isAdmin,
  isPermitted,
};

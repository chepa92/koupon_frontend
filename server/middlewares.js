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

// function isPermitted(req, res, next) {
//   for (var x in permissions) {
//     console.log('key:' + x + ', value:' + permissions[x]);
//     if (permissions.hasOwnProperty('key2')) {
//       //check here if user have right permission
//     }
//   }
//   if (req.user.admin) next();
//   else next({ status: 403, message: 'You have no permission to to this' });
// }

module.exports = {
  isLoggedIn,
  isAdmin,
  isPermitted,
};

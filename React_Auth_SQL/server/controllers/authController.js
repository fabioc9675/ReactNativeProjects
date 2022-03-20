module.exports.signup_get = (req, res) => {
  res.send("signup requested");
  console.log("signup");
};

module.exports.login_get = (req, res) => {
  res.send("login requested");
  console.log("login");
};

module.exports.signup_post = (req, res) => {
  res.send("new signup requested");
  console.log("new signup");
  console.log(req.body);
};

module.exports.login_post = (req, res) => {
  res.send("user login requested");
  console.log("user login");
  console.log(req.body);
};

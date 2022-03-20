module.exports.signup_get = (req, res) => {
  res.send("signup");
  console.log("signup");
};

module.exports.login_get = (req, res) => {
  res.send("login");
  console.log("login");
};

module.exports.signup_post = (req, res) => {
  res.send("new signup");
  console.log("new signup");
};

module.exports.login_post = (req, res) => {
  res.send("new login");
  console.log("new login");
};

module.exports.signup_get = (req, res) => {
  res.send("signup requested");
  console.log("signup");
};

module.exports.login_get = (req, res) => {
  res.send("login requested");
  console.log("login");
};

module.exports.signup_post = (req, res) => {
  const { username, password } = req.body; // need to have the same variable name that in the json structure from frontend

  res.send("new signup requested");
  console.log("new signup");
  console.log(username, password);
};

module.exports.login_post = (req, res) => {
  const { username, password } = req.body; // need to have the same variable name that in the json structure from frontend

  res.send("user login requested");
  console.log("user login");
  console.log(username, password);
};

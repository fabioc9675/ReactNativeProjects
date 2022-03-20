var Users = require("../models/user");

module.exports.signup_get = (req, res) => {
  res.send("signup requested");
  console.log("signup");
};

module.exports.login_get = (req, res) => {
  res.send("login requested");
  console.log("login");
};

module.exports.signup_post = async (req, res) => {
  const { USER_NAME, USER_PASS, USER_TOKEN, USER_MAIL } = req.body; // need to have the same variable name that in the json structure from frontend

  // res.send("new signup requested");
  console.log("new signup");
  console.log(USER_NAME, USER_PASS, USER_TOKEN, USER_MAIL);

  try {
    const user = await Users.create({
      USER_NAME: USER_NAME,
      USER_PASS: USER_PASS,
      USER_TOKEN: USER_TOKEN,
      USER_MAIL: USER_MAIL,
    });
    res.status(201).send(user.USER_NAME); // .send("new signup requested");
  } catch (error) {
    console.log(error);
    res.status(400).send("error, user not created");
  }
};

module.exports.login_post = (req, res) => {
  const { username, password } = req.body; // need to have the same variable name that in the json structure from frontend

  res.send("user login requested");
  console.log("user login");
  console.log(username, password);
};

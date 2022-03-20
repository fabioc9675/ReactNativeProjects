var Users = require("../models/user");

// handle errors
const handleErrors = (err) => {
  // console.log(err.message, err.code);
  let error = { USER_NAME: "", USER_PASS: "", USER_MAIL: "" };

  // validation errors
  if (err.message.includes("Validation error")) {
    Object.values(err.errors).forEach((_error) => {
      error[_error.path] = _error.message;
      // console.log(error);
    });
  }
  return error;
};

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
  const io = req.io; // load io component from server

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
    io.emit("message", "New User registered"); // emit some message from socket
    res.status(201).send(user.USER_NAME); // .send("new signup requested");
  } catch (error) {
    const errors = handleErrors(error);
    console.log(errors);
    res.status(400).json(errors);
  }
};

module.exports.login_post = (req, res) => {
  const { username, password } = req.body; // need to have the same variable name that in the json structure from frontend

  res.send("user login requested");
  console.log("user login");
  console.log(username, password);
};

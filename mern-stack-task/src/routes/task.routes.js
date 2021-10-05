const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // when client ask for '/' server response
  res.json({
    status: "API works!",
  });
});

module.exports = router;

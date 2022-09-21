const http = require("./app");
const PORT = process.env.PORT || 5000;

http.listen(PORT, () => {
  console.log("Server is listening on ", PORT);
});

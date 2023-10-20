var express = require("express"); //requiring express module
var app = express(); //creating express instance
var fs = require("fs"); //require fs(file system) module
var request = require("request"); //requiring request module

app.get("/", function (req, res) {
  //calling request function
  request(
    "https://kuula.co/share/NCv95/collection/7vyXq?",
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // writing the response to a file named data.html
        fs.writeFileSync("data.html", body);
        response.setEncoding({ message: "success" });
      }
    }
  );
});

app.listen(3000, function () {
  console.log("Node server is running..");
});

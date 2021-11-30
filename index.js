const fs = require("fs");
const http = require("http");

const file = "README.md";
var channel = "";

function getGif(show) {
  if (!show) {
    show = "the office";
  }

  let params = {
    api_key: "VDRuIOUZ1svT1HrR0uPuHvHmrfLhmIGI",
    tag: show.toLowerCase(),
    rating: "pg",
  };

  let query = Object.keys(params)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");

  var options = {
    host: "api.giphy.com",
    path: "/v1/gifs/random?" + query,
  };

  callback = function (response) {
    var str = "";

    response.on("data", function (chunk) {
      str += chunk;
    });

    response.on("end", function () {
      const data = JSON.parse(str);
      channel = data.data.images.original.url;

      const content = fs.readFileSync("template.txt", "utf8");
      const newContent = content.replace(/{{url}}/g, channel);
      fs.writeFile(file, newContent, () => {});
    });
  };
  
  http.request(options, callback).end();
}

var myArgs = process.argv.splice(2);
var searchStr = myArgs[0].replace(/-/g, " ")

getGif(searchStr);

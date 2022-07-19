const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

exports.getImage = async(req, res, next) => {
    var request = url.parse(req.url, true);

    // Path Refinements

    var filePath = 'images\\' + String.raw `${req.params.path}`;

    console.log(filePath)
        // Checking if the path exists
    fs.exists(filePath, function(exists) {

        if (!exists) {
            res.writeHead(404, {
                "Content-Type": "text/plain"
            });
            res.end("404 Not Found");
            return;
        }

        // Extracting file extension
        var ext = path.extname(filePath);

        // Setting default Content-Type
        var contentType = "text/plain";

        // Checking if the extension of
        // image is '.png'
        if (ext === ".png") {
            contentType = "image/png";
        }

        // Setting the headers
        res.writeHead(200, {
            "Content-Type": contentType
        });

        // Reading the file
        fs.readFile(filePath,
            function(err, content) {
                // Serving the image
                res.end(content);
            });
    });
};
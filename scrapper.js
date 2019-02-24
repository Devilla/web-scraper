var request = require("request");
var fs = require("fs");
var htmlToJson = require("html-to-json");



request({
    uri: process.argv[2]
}, function(error, response, body) {
    //delete file if exists
    fs.unlink('webpage.html', function(notExist) {
        if (notExist) {
            console.log("Deleting file if exists...");
        }
    });

    //create and write file asynchronously
    fs.appendFile('webpage.html', body, function(err) {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
    });

});

var content;
// First I want to read the file
fs.readFile('webpage.html', function read(err, data) {
    if (err) {
        throw err;
    }
    content =data;

    // Invoke the next step here however you like
    // console.log(data.toString());   // Put all of the code here (not the best solution)

    var promise = htmlToJson.parse(data.toString(), {
      'text': function ($doc) {
        return $doc.find('a').text();
      }
    }, function (err, result) {
      console.log(result);
    });

    promise.done(function (result) {
      //Works as well
      fs.appendFile('webpage.txt', JSON.stringify(result), function(err) {
          if (err) throw err;
          console.log('The "data to append" was appended to file!');
      });
    });
});

var request = require("request");
var fs = require("fs");
var htmlToJson = require("html-to-json");


function multipleRequest(uri){
request({
    uri: uri
}, function(error, response, body) {

    //create and write file asynchronously
    fs.appendFile('webpage.html', body, function(err) {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
    });

});
}

function scrapHtml(){

  var content;
  // First I want to read the file
  fs.readFile('webpage.html', function read(err, data) {
      if (err) {
          throw err;
      }
      content =data;


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
}

for(var i=2;i<7;i++){
  multipleRequest(process.argv[i]);
  console.log(process.argv[i]);
}
scrapHtml();

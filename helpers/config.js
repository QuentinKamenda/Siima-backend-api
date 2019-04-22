const xml2js = require('xml2js');
const fs = require('fs');
const parser = new xml2js.Parser();

module.exports.get = function(atribute){
  return new Promise(function(resolve, reject){
  let  xml_string = fs.readFileSync("./config.xml", "utf8");
  parser.parseString(xml_string, function(err, result){
        if(err){
           reject(err);
        }
        else {
           resolve(result['config'][atribute][0]);
        }
    });
  });
};

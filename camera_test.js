var fs = require('fs');
var gphoto2 = require('gphoto2');
var GPhoto = new gphoto2.GPhoto2();

function test(){

// Negative value or undefined will disable logging, levels 0-4 enable it.
GPhoto.setLogLevel(1);
GPhoto.on('log', function (level, domain, message) {
  console.log(domain, message);
});
 
// List cameras / assign list item to variable to use below options
GPhoto.list(function (list) {
  if (list.length === 0) return;
  var camera = list[0];
  console.log('Found', camera.model);
 
  // get configuration tree
  camera.getConfig(function (er, settings) {
    console.log(JSON.stringify(settings, false, 3));
  });
  
});

}

module.exports = {
  cameraTest: test
}
var fs = require('fs');
var gphoto2 = require('gphoto2');
var GPhoto = new gphoto2.GPhoto2();
 
// Negative value or undefined will disable logging, levels 0-4 enable it.
GPhoto.setLogLevel(1);
GPhoto.on('log', function (level, domain, message) {
  console.log(domain, message);
});

console.log('init three photo sequence')
 
// List cameras / assign list item to variable to use below options
GPhoto.list(function (list) {
  if (list.length === 0){
    console.log('No camera detected bailing!')
    return;
  } else {

    var camera = list[0];
    console.log('Camera: ', camera.model);
    console.log('beginning 3 photo sequence')

    console.log(camera);

    // Take picture and keep image on camera
    camera.takePicture({
      download: true,
      keep: true
    }, function (er, data) {
      fs.writeFileSync(__dirname + '/input/picture1.jpg', data);
    });

      // Take picture and keep image on camera
    camera.takePicture({
      download: true,
      keep: true
    }, function (er, data) {
      fs.writeFileSync(__dirname + '/input/picture2.jpg', data);
    });


      // Take picture and keep image on camera
    camera.takePicture({
      download: true,
      keep: true
    }, function (er, data) {
      fs.writeFileSync(__dirname + '/input/picture3.jpg', data);
    });
   
  } 

});
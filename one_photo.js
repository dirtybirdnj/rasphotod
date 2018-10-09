'use strict'

var fs = require('fs');
var gphoto2 = require('gphoto2')

var gphoto2 = new gphoto2.GPhoto2();

const timerDelay = 4000

gphoto2.list(function (list) {

  if (list.length === 0){

      console.log('no cameras found')
      process.exit()

  } else {

    console.log(list)
      
    console.log(`Camera will fire in ${(timerDelay/1000)} seconds`)

    let camera = list[0]

      setTimeout(() => { console.log('Get ready!') }, (timerDelay - 1000), camera)

      setTimeout(takePicture, timerDelay, camera)
    
  }

})

function takePicture(camera){

  console.log('Camera Firing!')

  camera.takePicture({
    download: true,
    keep: true
  }, function (er, data) {
    fs.writeFileSync(__dirname + '/input/picture1.jpg', data);
  });  

}

